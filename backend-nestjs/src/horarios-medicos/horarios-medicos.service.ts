import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HorarioMedico } from './entities/horario-medico.entity';
import { Empleado } from '../empleados/entities/empleado.entity';

@Injectable()
export class HorariosMedicosService {
  constructor(
    @InjectRepository(HorarioMedico)
    private readonly horariosRepository: Repository<HorarioMedico>,

    @InjectRepository(Empleado)
    private readonly empleadosRepository: Repository<Empleado>,
  ) {}

  // =====================================================
  // LISTAR TODOS LOS HORARIOS
  // =====================================================

  async findAll(): Promise<HorarioMedico[]> {
    return this.horariosRepository.find({
      relations: {
        empleado: true,
      },

      order: {
        fecha: 'ASC',
        horaInicio: 'ASC',
      },
    });
  }

  // =====================================================
  // BUSCAR HORARIO POR ID
  // =====================================================

  async findOne(id: number): Promise<HorarioMedico> {
    const horario = await this.horariosRepository.findOne({
      where: {
        id,
      },

      relations: {
        empleado: true,
      },
    });

    if (!horario) {
      throw new NotFoundException(
        `No se encontró el horario con ID ${id}.`,
      );
    }

    return horario;
  }

  // =====================================================
  // VALIDAR FECHA
  // =====================================================

  private validarFecha(fecha: string): void {
    const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;

    if (!formatoFecha.test(fecha)) {
      throw new BadRequestException(
        `La fecha "${fecha}" debe tener el formato YYYY-MM-DD.`,
      );
    }

    const [anio, mes, dia] = fecha
      .split('-')
      .map(Number);

    const fechaObj = new Date(
      anio,
      mes - 1,
      dia,
    );

    if (
      fechaObj.getFullYear() !== anio ||
      fechaObj.getMonth() !== mes - 1 ||
      fechaObj.getDate() !== dia
    ) {
      throw new BadRequestException(
        `La fecha "${fecha}" no es válida.`,
      );
    }
  }

  // =====================================================
  // VALIDAR HORAS
  // =====================================================

  private validarHoras(
    horaInicio: string,
    horaFin: string,
  ): void {
    const formatoHora =
      /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!formatoHora.test(horaInicio)) {
      throw new BadRequestException(
        'La hora de inicio debe tener el formato HH:mm.',
      );
    }

    if (!formatoHora.test(horaFin)) {
      throw new BadRequestException(
        'La hora de fin debe tener el formato HH:mm.',
      );
    }

    const [inicioHora, inicioMinuto] =
      horaInicio.split(':').map(Number);

    const [finHora, finMinuto] =
      horaFin.split(':').map(Number);

    const inicioTotal =
      inicioHora * 60 + inicioMinuto;

    const finTotal =
      finHora * 60 + finMinuto;

    if (finTotal <= inicioTotal) {
      throw new BadRequestException(
        'La hora de fin debe ser posterior a la hora de inicio.',
      );
    }
  }

  // =====================================================
  // BUSCAR HORARIO EXISTENTE
  // =====================================================

  private async buscarHorarioExistente(
    empleadoId: number,
    fecha: string,
  ): Promise<HorarioMedico | null> {
    return this.horariosRepository.findOne({
      where: {
        empleado: {
          id: empleadoId,
        },

        fecha,
      },
    });
  }

  // =====================================================
  // LISTAR HORARIOS DE UN EMPLEADO
  // =====================================================

  async findByEmpleado(
    empleadoId: number,
  ): Promise<HorarioMedico[]> {
    const empleado =
      await this.empleadosRepository.findOne({
        where: {
          id: empleadoId,
        },
      });

    if (!empleado) {
      throw new NotFoundException(
        `No se encontró el empleado con ID ${empleadoId}.`,
      );
    }

    return this.horariosRepository.find({
      where: {
        empleado: {
          id: empleadoId,
        },
      },

      relations: {
        empleado: true,
      },

      order: {
        fecha: 'ASC',
        horaInicio: 'ASC',
      },
    });
  }

  // =====================================================
  // CREAR UN HORARIO
  // =====================================================

  async create(data: {
    empleadoId: number;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    activo?: boolean;
  }): Promise<HorarioMedico> {
    // ---------------------------------------------------
    // VALIDAR FECHA
    // ---------------------------------------------------

    this.validarFecha(data.fecha);

    // ---------------------------------------------------
    // VALIDAR HORAS
    // ---------------------------------------------------

    this.validarHoras(
      data.horaInicio,
      data.horaFin,
    );

    // ---------------------------------------------------
    // BUSCAR EMPLEADO
    // ---------------------------------------------------

    const empleado =
      await this.empleadosRepository.findOne({
        where: {
          id: data.empleadoId,
        },
      });

    if (!empleado) {
      throw new NotFoundException(
        `No se encontró el empleado con ID ${data.empleadoId}.`,
      );
    }

    // ---------------------------------------------------
    // VERIFICAR DUPLICADO
    // ---------------------------------------------------

    const existente =
      await this.buscarHorarioExistente(
        data.empleadoId,
        data.fecha,
      );

    if (existente) {
      throw new BadRequestException(
        `El empleado ya tiene un horario registrado para la fecha ${data.fecha}.`,
      );
    }

    // ---------------------------------------------------
    // CREAR
    // ---------------------------------------------------

    const horario =
      this.horariosRepository.create({
        empleado,
        fecha: data.fecha,
        horaInicio: data.horaInicio,
        horaFin: data.horaFin,
        activo: data.activo ?? true,
      });

    return this.horariosRepository.save(
      horario,
    );
  }

  // =====================================================
  // CREAR VARIOS HORARIOS
  // =====================================================

  async createMany(data: {
    empleadoId: number;
    fechas: string[];
    horaInicio: string;
    horaFin: string;
    activo?: boolean;
  }): Promise<HorarioMedico[]> {
    // ---------------------------------------------------
    // VALIDAR ARRAY
    // ---------------------------------------------------

    if (
      !Array.isArray(data.fechas) ||
      data.fechas.length === 0
    ) {
      throw new BadRequestException(
        'Debe proporcionar al menos una fecha.',
      );
    }

    // ---------------------------------------------------
    // VALIDAR HORAS
    // ---------------------------------------------------

    this.validarHoras(
      data.horaInicio,
      data.horaFin,
    );

    // ---------------------------------------------------
    // BUSCAR EMPLEADO
    // ---------------------------------------------------

    const empleado =
      await this.empleadosRepository.findOne({
        where: {
          id: data.empleadoId,
        },
      });

    if (!empleado) {
      throw new NotFoundException(
        `No se encontró el empleado con ID ${data.empleadoId}.`,
      );
    }

    // ---------------------------------------------------
    // ELIMINAR FECHAS DUPLICADAS DEL MISMO REQUEST
    // ---------------------------------------------------

    const fechasUnicas = [
      ...new Set(data.fechas),
    ];

    // ---------------------------------------------------
    // VALIDAR TODAS LAS FECHAS
    // ---------------------------------------------------

    for (const fecha of fechasUnicas) {
      this.validarFecha(fecha);
    }

    // ---------------------------------------------------
    // BUSCAR DUPLICADOS ANTES DE GUARDAR
    // ---------------------------------------------------

    const fechasExistentes: string[] = [];

    for (const fecha of fechasUnicas) {
      const existente =
        await this.buscarHorarioExistente(
          data.empleadoId,
          fecha,
        );

      if (existente) {
        fechasExistentes.push(fecha);
      }
    }

    // ---------------------------------------------------
    // SI EXISTE ALGUNA FECHA, NO GUARDAR NADA
    // ---------------------------------------------------

    if (fechasExistentes.length > 0) {
      throw new BadRequestException(
        `No se pueden registrar los horarios porque el empleado ya tiene horario en estas fechas: ${fechasExistentes.join(', ')}.`,
      );
    }

    // ---------------------------------------------------
    // CREAR TODOS LOS HORARIOS EN MEMORIA
    // ---------------------------------------------------

    const horarios =
      fechasUnicas.map((fecha) =>
        this.horariosRepository.create({
          empleado,
          fecha,
          horaInicio: data.horaInicio,
          horaFin: data.horaFin,
          activo: data.activo ?? true,
        }),
      );

    // ---------------------------------------------------
    // GUARDAR TODOS
    // ---------------------------------------------------

    return this.horariosRepository.save(
      horarios,
    );
  }

  // =====================================================
  // ELIMINAR HORARIO
  // =====================================================

  async remove(id: number): Promise<void> {
    const horario =
      await this.findOne(id);

    await this.horariosRepository.remove(
      horario,
    );
  }
}