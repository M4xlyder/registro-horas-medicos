import { Test, TestingModule } from '@nestjs/testing';
import { TiposContratoService } from './tipos-contrato.service.js';

describe('TiposContratoService', () => {
  let service: TiposContratoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposContratoService],
    }).compile();

    service = module.get<TiposContratoService>(TiposContratoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
