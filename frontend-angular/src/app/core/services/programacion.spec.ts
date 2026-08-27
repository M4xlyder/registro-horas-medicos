import { TestBed } from '@angular/core/testing';
import { Programacion } from './programacion';

describe('Programacion', () => {
  let service: Programacion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Programacion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
