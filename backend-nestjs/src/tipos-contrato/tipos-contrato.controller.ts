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

import { TiposContratoService } from './tipos-contrato.service.js';

@Controller('tipos-contrato')
export class TiposContratoController {
  constructor(
    private readonly tiposContratoService: TiposContratoService,
  ) {}

  // GET /api/tipos-contrato
  @Get()
  findAll() {
    return this.tiposContratoService.findAll();
  }

  // GET /api/tipos-contrato/1
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tiposContratoService.findOne(id);
  }

  // POST /api/tipos-contrato
  @Post()
  create(@Body() body: { nombre: string }) {
    return this.tiposContratoService.create(body.nombre);
  }

  // PATCH /api/tipos-contrato/1
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: {
      nombre?: string;
      activo?: boolean;
    },
  ) {
    return this.tiposContratoService.update(id, body);
  }

  // DELETE /api/tipos-contrato/1
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tiposContratoService.remove(id);
  }
}