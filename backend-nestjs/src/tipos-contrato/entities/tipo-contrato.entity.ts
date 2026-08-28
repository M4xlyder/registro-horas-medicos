import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Empleado } from '../../empleados/entities/empleado.entity.js';

@Entity('tipos_contrato')
export class TipoContrato {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  nombre!: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  activo!: boolean;

  @OneToMany(
    () => Empleado,
    (empleado) => empleado.tipoContrato,
  )
  empleados!: Empleado[];
}