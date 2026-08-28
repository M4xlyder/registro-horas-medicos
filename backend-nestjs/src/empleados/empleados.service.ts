import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Empleado } from './entities/empleado.entity';
import { Departamento } from '../departamentos/entities/departamento.entity';
import { Especialidad } from '../especialidades/entities/especialidad.entity';
import { TipoContrato } from '../tipos-contrato/entities/tipo-contrato.entity';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadosRepository: Repository<Empleado>,

    @InjectRepository(Departamento)
    private readonly departamentosRepository: Repository<Departamento>,

    @InjectRepository(Especialidad)
    private readonly especialidadesRepository: Repository<Especialidad>,

    @InjectRepository(TipoContrato)
    private readonly tiposContratoRepository: Repository<TipoContrato>,
  ) {}

  // =====================================================
  // LISTAR TODOS LOS EMPLEADOS
  // =====================================================

  async findAll(): Promise<Empleado[]> {
    return this.empleadosRepository.find({
      relations: {
        departamento: true,
        especialidad: true,
        tipoContrato: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  // =====================================================
  // BUSCAR EMPLEADO POR ID
  // =====================================================

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadosRepository.findOne({
      where: { id },
      relations: {
        departamento: true,
        especialidad: true,
        tipoContrato: true,
      },
    });

    if (!empleado) {
      throw new NotFoundException(
        `No se encontró el empleado con ID ${id}`,
      );
    }

    return empleado;
  }

  // =====================================================
  // CREAR EMPLEADO
  // =====================================================

  async create(data: {
    dni: string;
    nombres: string;
    apellidos: string;
    departamentoId: number;
    especialidadId: number;
    tipoContratoId: number;
    activo?: boolean;
    metaMensualHoras?: number;
  }): Promise<Empleado> {
    // ---------------------------------------------------
    // VALIDAR DNI
    // ---------------------------------------------------

    if (!data.dni || data.dni.length !== 8) {
      throw new BadRequestException(
        'El DNI debe tener exactamente 8 caracteres.',
      );
    }

    // ---------------------------------------------------
    // VALIDAR QUE EL DNI NO EXISTA
    // ---------------------------------------------------

    const empleadoExistente = await this.empleadosRepository.findOne({
      where: {
        dni: data.dni,
      },
    });

    if (empleadoExistente) {
      throw new BadRequestException(
        `El DNI ${data.dni} ya está registrado.`,
      );
    }

    // ---------------------------------------------------
    // BUSCAR DEPARTAMENTO
    // ---------------------------------------------------

    const departamento =
      await this.departamentosRepository.findOne({
        where: {
          id: data.departamentoId,
        },
      });

    if (!departamento) {
      throw new NotFoundException(
        `No se encontró el departamento con ID ${data.departamentoId}.`,
      );
    }

    // ---------------------------------------------------
    // BUSCAR ESPECIALIDAD
    // ---------------------------------------------------

    const especialidad =
      await this.especialidadesRepository.findOne({
        where: {
          id: data.especialidadId,
        },
      });

    if (!especialidad) {
      throw new NotFoundException(
        `No se encontró la especialidad con ID ${data.especialidadId}.`,
      );
    }

    // ---------------------------------------------------
    // BUSCAR TIPO DE CONTRATO
    // ---------------------------------------------------

    const tipoContrato =
      await this.tiposContratoRepository.findOne({
        where: {
          id: data.tipoContratoId,
        },
      });

    if (!tipoContrato) {
      throw new NotFoundException(
        `No se encontró el tipo de contrato con ID ${data.tipoContratoId}.`,
      );
    }

    // ---------------------------------------------------
    // CREAR EMPLEADO
    // ---------------------------------------------------

    const empleado = this.empleadosRepository.create({
      dni: data.dni,
      nombres: data.nombres,
      apellidos: data.apellidos,

      departamento,

      especialidad,

      tipoContrato,

      activo: data.activo ?? true,

      metaMensualHoras: data.metaMensualHoras ?? 150,
    });

    return this.empleadosRepository.save(empleado);
  }

  // =====================================================
  // ACTUALIZAR EMPLEADO
  // =====================================================

  async update(
    id: number,
    data: {
      dni?: string;
      nombres?: string;
      apellidos?: string;
      departamentoId?: number;
      especialidadId?: number;
      tipoContratoId?: number;
      activo?: boolean;
      metaMensualHoras?: number;
    },
  ): Promise<Empleado> {
    const empleado = await this.findOne(id);

    // ---------------------------------------------------
    // DNI
    // ---------------------------------------------------

    if (data.dni !== undefined) {
      if (data.dni.length !== 8) {
        throw new BadRequestException(
          'El DNI debe tener exactamente 8 caracteres.',
        );
      }

      const dniExistente =
        await this.empleadosRepository.findOne({
          where: {
            dni: data.dni,
          },
        });

      if (dniExistente && dniExistente.id !== id) {
        throw new BadRequestException(
          `El DNI ${data.dni} ya está registrado.`,
        );
      }

      empleado.dni = data.dni;
    }

    // ---------------------------------------------------
    // DATOS PERSONALES
    // ---------------------------------------------------

    if (data.nombres !== undefined) {
      empleado.nombres = data.nombres;
    }

    if (data.apellidos !== undefined) {
      empleado.apellidos = data.apellidos;
    }

    // ---------------------------------------------------
    // DEPARTAMENTO
    // ---------------------------------------------------

    if (data.departamentoId !== undefined) {
      const departamento =
        await this.departamentosRepository.findOne({
          where: {
            id: data.departamentoId,
          },
        });

      if (!departamento) {
        throw new NotFoundException(
          `No se encontró el departamento con ID ${data.departamentoId}.`,
        );
      }

      empleado.departamento = departamento;
    }

    // ---------------------------------------------------
    // ESPECIALIDAD
    // ---------------------------------------------------

    if (data.especialidadId !== undefined) {
      const especialidad =
        await this.especialidadesRepository.findOne({
          where: {
            id: data.especialidadId,
          },
        });

      if (!especialidad) {
        throw new NotFoundException(
          `No se encontró la especialidad con ID ${data.especialidadId}.`,
        );
      }

      empleado.especialidad = especialidad;
    }

    // ---------------------------------------------------
    // TIPO DE CONTRATO
    // ---------------------------------------------------

    if (data.tipoContratoId !== undefined) {
      const tipoContrato =
        await this.tiposContratoRepository.findOne({
          where: {
            id: data.tipoContratoId,
          },
        });

      if (!tipoContrato) {
        throw new NotFoundException(
          `No se encontró el tipo de contrato con ID ${data.tipoContratoId}.`,
        );
      }

      empleado.tipoContrato = tipoContrato;
    }

    // ---------------------------------------------------
    // ESTADO
    // ---------------------------------------------------

    if (data.activo !== undefined) {
      empleado.activo = data.activo;
    }

    // ---------------------------------------------------
    // META MENSUAL
    // ---------------------------------------------------

    if (data.metaMensualHoras !== undefined) {
      empleado.metaMensualHoras = data.metaMensualHoras;
    }

    return this.empleadosRepository.save(empleado);
  }

  // =====================================================
  // ELIMINAR EMPLEADO
  // =====================================================

  async remove(id: number): Promise<void> {
    const empleado = await this.findOne(id);

    await this.empleadosRepository.remove(empleado);
  }
}