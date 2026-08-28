import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Especialidad } from './entities/especialidad.entity.js';

@Injectable()
export class EspecialidadesService {
  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>,
  ) {}

  // Obtener todas las especialidades
  async findAll(): Promise<Especialidad[]> {
    return this.especialidadRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  // Obtener una especialidad por ID
  async findOne(id: number): Promise<Especialidad> {
    const especialidad = await this.especialidadRepository.findOne({
      where: { id },
    });

    if (!especialidad) {
      throw new NotFoundException(
        `No se encontró la especialidad con ID ${id}`,
      );
    }

    return especialidad;
  }

  // Crear especialidad
  async create(nombre: string): Promise<Especialidad> {
    const especialidad = this.especialidadRepository.create({
      nombre,
      activo: true,
    });

    return this.especialidadRepository.save(especialidad);
  }

  // Actualizar especialidad
  async update(
    id: number,
    data: {
      nombre?: string;
      activo?: boolean;
    },
  ): Promise<Especialidad> {
    const especialidad = await this.findOne(id);

    if (data.nombre !== undefined) {
      especialidad.nombre = data.nombre;
    }

    if (data.activo !== undefined) {
      especialidad.activo = data.activo;
    }

    return this.especialidadRepository.save(especialidad);
  }

  // Eliminar especialidad
  async remove(id: number): Promise<{ message: string }> {
    const especialidad = await this.findOne(id);

    await this.especialidadRepository.remove(especialidad);

    return {
      message: `Especialidad con ID ${id} eliminada correctamente`,
    };
  }
}