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

import { EspecialidadesService } from './especialidades.service.js';

@Controller('especialidades')
export class EspecialidadesController {
  constructor(
    private readonly especialidadesService: EspecialidadesService,
  ) {}

  // GET /api/especialidades
  @Get()
  findAll() {
    return this.especialidadesService.findAll();
  }

  // GET /api/especialidades/1
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.especialidadesService.findOne(id);
  }

  // POST /api/especialidades
  @Post()
  create(@Body() body: { nombre: string }) {
    return this.especialidadesService.create(body.nombre);
  }

  // PATCH /api/especialidades/1
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { nombre?: string; activo?: boolean },
  ) {
    return this.especialidadesService.update(id, body);
  }

  // DELETE /api/especialidades/1
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.especialidadesService.remove(id);
  }
}