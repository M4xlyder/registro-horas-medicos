import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { HorariosMedicosService } from './horarios-medicos.service';

@Controller('horarios-medicos')
export class HorariosMedicosController {
  constructor(
    private readonly horariosMedicosService: HorariosMedicosService,
  ) {}

  // =====================================================
  // GET /api/horarios-medicos
  // =====================================================

  @Get()
  findAll() {
    return this.horariosMedicosService.findAll();
  }

  // =====================================================
  // GET /api/horarios-medicos/empleado/:empleadoId
  // =====================================================

  @Get('empleado/:empleadoId')
  findByEmpleado(
    @Param('empleadoId', ParseIntPipe)
    empleadoId: number,
  ) {
    return this.horariosMedicosService.findByEmpleado(
      empleadoId,
    );
  }

  // =====================================================
  // GET /api/horarios-medicos/:id
  // =====================================================

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.horariosMedicosService.findOne(id);
  }

  // =====================================================
  // POST /api/horarios-medicos
  // =====================================================

  @Post()
  create(
    @Body()
    body: {
      empleadoId: number;
      fecha: string;
      horaInicio: string;
      horaFin: string;
      activo?: boolean;
    },
  ) {
    return this.horariosMedicosService.create(
      body,
    );
  }

  // =====================================================
  // POST /api/horarios-medicos/multiple
  // =====================================================

  @Post('multiple')
  createMany(
    @Body()
    body: {
      empleadoId: number;
      fechas: string[];
      horaInicio: string;
      horaFin: string;
      activo?: boolean;
    },
  ) {
    return this.horariosMedicosService.createMany(
      body,
    );
  }

  // =====================================================
  // DELETE /api/horarios-medicos/:id
  // =====================================================

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.horariosMedicosService.remove(id);
  }
}