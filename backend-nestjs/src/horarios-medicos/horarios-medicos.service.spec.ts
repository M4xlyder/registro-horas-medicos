import { Test, TestingModule } from '@nestjs/testing';
import { HorariosMedicosService } from './horarios-medicos.service';

describe('HorariosMedicosService', () => {
  let service: HorariosMedicosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HorariosMedicosService],
    }).compile();

    service = module.get<HorariosMedicosService>(HorariosMedicosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
