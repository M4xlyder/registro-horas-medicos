import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HorariosMedicosController } from './horarios-medicos.controller';
import { HorariosMedicosService } from './horarios-medicos.service';

import { HorarioMedico } from './entities/horario-medico.entity';
import { Empleado } from '../empleados/entities/empleado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HorarioMedico,
      Empleado,
    ]),
  ],

  controllers: [
    HorariosMedicosController,
  ],

  providers: [
    HorariosMedicosService,
  ],

  exports: [
    HorariosMedicosService,
  ],
})
export class HorariosMedicosModule {}