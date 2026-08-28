import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Empleado } from '../../empleados/entities/empleado.entity';

@Entity('horarios_medicos')
export class HorarioMedico {
  // =====================================================
  // IDENTIFICADOR
  // =====================================================

  @PrimaryGeneratedColumn()
  id!: number;

  // =====================================================
  // EMPLEADO / MÉDICO
  // =====================================================

  @ManyToOne(
    () => Empleado,
    {
      nullable: false,
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn({
    name: 'empleado_id',
  })
  empleado!: Empleado;

  // =====================================================
  // FECHA
  // =====================================================

  @Column({
    type: 'date',
  })
  fecha!: string;

  // =====================================================
  // HORA DE INICIO
  // =====================================================

  @Column({
    type: 'time',
  })
  horaInicio!: string;

  // =====================================================
  // HORA DE FIN
  // =====================================================

  @Column({
    type: 'time',
  })
  horaFin!: string;

  // =====================================================
  // ESTADO
  // =====================================================

  @Column({
    type: 'boolean',
    default: true,
  })
  activo!: boolean;
}