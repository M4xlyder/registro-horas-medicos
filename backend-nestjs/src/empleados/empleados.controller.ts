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

import { EmpleadosService } from './empleados.service';

@Controller('empleados')
export class EmpleadosController {
  constructor(
    private readonly empleadosService: EmpleadosService,
  ) {}

  // =====================================================
  // GET /api/empleados
  // =====================================================

  @Get()
  findAll() {
    return this.empleadosService.findAll();
  }

  // =====================================================
  // GET /api/empleados/:id
  // =====================================================

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.empleadosService.findOne(id);
  }

  // =====================================================
  // POST /api/empleados
  // =====================================================

  @Post()
  create(
    @Body()
    body: {
      dni: string;
      nombres: string;
      apellidos: string;
      departamentoId: number;
      especialidadId: number;
      tipoContratoId: number;
      activo?: boolean;
      metaMensualHoras?: number;
    },
  ) {
    return this.empleadosService.create(body);
  }

  // =====================================================
  // PATCH /api/empleados/:id
  // =====================================================

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      dni?: string;
      nombres?: string;
      apellidos?: string;
      departamentoId?: number;
      especialidadId?: number;
      tipoContratoId?: number;
      activo?: boolean;
      metaMensualHoras?: number;
    },
  ) {
    return this.empleadosService.update(id, body);
  }

  // =====================================================
  // DELETE /api/empleados/:id
  // =====================================================

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.empleadosService.remove(id);
  }
}