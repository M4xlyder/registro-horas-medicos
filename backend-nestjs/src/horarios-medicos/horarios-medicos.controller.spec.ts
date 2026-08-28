import { Test, TestingModule } from '@nestjs/testing';
import { HorariosMedicosController } from './horarios-medicos.controller';

describe('HorariosMedicosController', () => {
  let controller: HorariosMedicosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HorariosMedicosController],
    }).compile();

    controller = module.get<HorariosMedicosController>(HorariosMedicosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
