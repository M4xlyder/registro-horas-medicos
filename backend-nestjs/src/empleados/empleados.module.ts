import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmpleadosController } from './empleados.controller';
import { EmpleadosService } from './empleados.service';

import { Empleado } from './entities/empleado.entity';

import { Departamento } from '../departamentos/entities/departamento.entity';
import { Especialidad } from '../especialidades/entities/especialidad.entity';
import { TipoContrato } from '../tipos-contrato/entities/tipo-contrato.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Empleado,
      Departamento,
      Especialidad,
      TipoContrato,
    ]),
  ],

  controllers: [
    EmpleadosController,
  ],

  providers: [
    EmpleadosService,
  ],

  exports: [
    EmpleadosService,
  ],
})
export class EmpleadosModule {}