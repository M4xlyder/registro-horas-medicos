import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  // Obtener todos
  async findAll(): Promise<Departamento[]> {
    return this.departamentoRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  // Obtener uno
  async findOne(id: number): Promise<Departamento> {
    const departamento = await this.departamentoRepository.findOne({
      where: { id },
    });

    if (!departamento) {
      throw new NotFoundException(
        `No se encontró el departamento con ID ${id}`,
      );
    }

    return departamento;
  }

  // Crear
  async create(
    data: Partial<Departamento>,
  ): Promise<Departamento> {
    const departamento =
      this.departamentoRepository.create(data);

    return this.departamentoRepository.save(departamento);
  }

  // Actualizar
  async update(
    id: number,
    data: Partial<Departamento>,
  ): Promise<Departamento> {
    const departamento = await this.findOne(id);

    Object.assign(departamento, data);

    return this.departamentoRepository.save(departamento);
  }

  // Eliminar
  async remove(id: number): Promise<void> {
    const departamento = await this.findOne(id);

    await this.departamentoRepository.remove(departamento);
  }
}