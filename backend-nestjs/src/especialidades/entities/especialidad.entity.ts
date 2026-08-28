import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Empleado } from '../../empleados/entities/empleado.entity';


@Entity('especialidades')
export class Especialidad {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 120,
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
    (empleado) => empleado.especialidad
  )
  empleados!: Empleado[];
}