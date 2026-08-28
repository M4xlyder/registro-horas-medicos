import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TiposContratoController } from './tipos-contrato.controller.js';
import { TiposContratoService } from './tipos-contrato.service.js';
import { TipoContrato } from './entities/tipo-contrato.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoContrato]),
  ],

  controllers: [
    TiposContratoController,
  ],

  providers: [
    TiposContratoService,
  ],

  exports: [
    TiposContratoService,
  ],
})
export class TiposContratoModule {}