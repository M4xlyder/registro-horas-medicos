import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TipoContrato } from './entities/tipo-contrato.entity.js';

@Injectable()
export class TiposContratoService {
  constructor(
    @InjectRepository(TipoContrato)
    private readonly tipoContratoRepository: Repository<TipoContrato>,
  ) {}

  // Obtener todos los tipos de contrato
  async findAll(): Promise<TipoContrato[]> {
    return this.tipoContratoRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  // Obtener un tipo de contrato por ID
  async findOne(id: number): Promise<TipoContrato> {
    const tipoContrato = await this.tipoContratoRepository.findOne({
      where: { id },
    });

    if (!tipoContrato) {
      throw new NotFoundException(
        `No se encontró el tipo de contrato con ID ${id}`,
      );
    }

    return tipoContrato;
  }

  // Crear tipo de contrato
  async create(nombre: string): Promise<TipoContrato> {
    const tipoContrato = this.tipoContratoRepository.create({
      nombre,
      activo: true,
    });

    return this.tipoContratoRepository.save(tipoContrato);
  }

  // Actualizar tipo de contrato
  async update(
    id: number,
    data: {
      nombre?: string;
      activo?: boolean;
    },
  ): Promise<TipoContrato> {
    const tipoContrato = await this.findOne(id);

    if (data.nombre !== undefined) {
      tipoContrato.nombre = data.nombre;
    }

    if (data.activo !== undefined) {
      tipoContrato.activo = data.activo;
    }

    return this.tipoContratoRepository.save(tipoContrato);
  }

  // Eliminar tipo de contrato
  async remove(id: number): Promise<{ message: string }> {
    const tipoContrato = await this.findOne(id);

    await this.tipoContratoRepository.remove(tipoContrato);

    return {
      message: `Tipo de contrato con ID ${id} eliminado correctamente`,
    };
  }
}