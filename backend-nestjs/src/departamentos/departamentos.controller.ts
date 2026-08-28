import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { DepartamentosService } from './departamentos.service';
import { Departamento } from './entities/departamento.entity';

@Controller('departamentos')
export class DepartamentosController {
  constructor(
    private readonly departamentosService: DepartamentosService,
  ) {}

  // GET /api/departamentos
  @Get()
  findAll(): Promise<Departamento[]> {
    return this.departamentosService.findAll();
  }

  // GET /api/departamentos/1
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Departamento> {
    return this.departamentosService.findOne(id);
  }

  // POST /api/departamentos
  @Post()
  create(
    @Body() departamento: Partial<Departamento>,
  ): Promise<Departamento> {
    return this.departamentosService.create(departamento);
  }

  // PATCH /api/departamentos/1
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() departamento: Partial<Departamento>,
  ): Promise<Departamento> {
    return this.departamentosService.update(id, departamento);
  }

  // DELETE /api/departamentos/1
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.departamentosService.remove(id);
  }
}