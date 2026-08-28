import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// =====================================================
// ENTIDADES
// =====================================================

import { Departamento } from './departamentos/entities/departamento.entity';
import { Empleado } from './empleados/entities/empleado.entity';
import { Especialidad } from './especialidades/entities/especialidad.entity';
import { TipoContrato } from './tipos-contrato/entities/tipo-contrato.entity';
import { HorarioMedico } from './horarios-medicos/entities/horario-medico.entity';

// =====================================================
// MÓDULOS
// =====================================================

import { DepartamentosModule } from './departamentos/departamentos.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { TiposContratoModule } from './tipos-contrato/tipos-contrato.module';
import { HorariosMedicosModule } from './horarios-medicos/horarios-medicos.module';

@Module({
  imports: [

    // =====================================================
    // CONFIGURACIÓN
    // =====================================================

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // =====================================================
    // BASE DE DATOS POSTGRESQL
    // =====================================================

    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.DB_HOST ?? 'localhost',

      port: Number(process.env.DB_PORT ?? 5432),

      username: process.env.DB_USERNAME ?? 'postgres',

      password: process.env.DB_PASSWORD ?? 'S0p0rte',

      database: process.env.DB_DATABASE ?? 'hospital_huaral',

      // ===================================================
      // ENTIDADES
      // ===================================================

      entities: [
        Departamento,
        Empleado,
        Especialidad,
        TipoContrato,
        HorarioMedico,
      ],

      // ===================================================
      // SINCRONIZACIÓN
      // ===================================================

      synchronize: true,
    }),

    // =====================================================
    // MÓDULOS
    // =====================================================

    DepartamentosModule,

    EmpleadosModule,

    EspecialidadesModule,

    TiposContratoModule,

    HorariosMedicosModule,
  ],

  // =====================================================
  // CONTROLADORES
  // =====================================================

  controllers: [
    AppController,
  ],

  // =====================================================
  // SERVICIOS
  // =====================================================

  providers: [
    AppService,
  ],
})
export class AppModule {}