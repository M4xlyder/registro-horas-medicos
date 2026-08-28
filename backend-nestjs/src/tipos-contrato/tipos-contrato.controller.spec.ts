import { Test, TestingModule } from '@nestjs/testing';
import { TiposContratoController } from './tipos-contrato.controller.js';

describe('TiposContratoController', () => {
  let controller: TiposContratoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposContratoController],
    }).compile();

    controller = module.get<TiposContratoController>(TiposContratoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
