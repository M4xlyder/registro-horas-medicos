import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Departamento } from '../../departamentos/entities/departamento.entity';
import { Especialidad } from '../../especialidades/entities/especialidad.entity';
import { TipoContrato } from '../../tipos-contrato/entities/tipo-contrato.entity';


@Entity('empleados')
export class Empleado {

  // =====================================================
  // IDENTIFICADOR
  // =====================================================

  @PrimaryGeneratedColumn()
  id!: number;


  // =====================================================
  // DATOS PERSONALES
  // =====================================================

  @Column({
    type: 'varchar',
    length: 8,
    unique: true,
  })
  dni!: string;


  @Column({
    type: 'varchar',
    length: 100,
  })
  nombres!: string;


  @Column({
    type: 'varchar',
    length: 100,
  })
  apellidos!: string;


  // =====================================================
  // DEPARTAMENTO
  // =====================================================

  @ManyToOne(
    () => Departamento,
    (departamento) => departamento.empleados,
    {
      nullable: false,
      onDelete: 'RESTRICT',
    }
  )
  @JoinColumn({
    name: 'departamento_id',
  })
  departamento!: Departamento;


  // =====================================================
  // ESPECIALIDAD
  // =====================================================

  @ManyToOne(
    () => Especialidad,
    (especialidad) => especialidad.empleados,
    {
      nullable: false,
      onDelete: 'RESTRICT',
    }
  )
  @JoinColumn({
    name: 'especialidad_id',
  })
  especialidad!: Especialidad;


  // =====================================================
  // TIPO DE CONTRATO
  // =====================================================

  @ManyToOne(
    () => TipoContrato,
    (tipoContrato) => tipoContrato.empleados,
    {
      nullable: false,
      onDelete: 'RESTRICT',
    }
  )
  @JoinColumn({
    name: 'tipo_contrato_id',
  })
  tipoContrato!: TipoContrato;


  // =====================================================
  // ESTADO
  // =====================================================

  @Column({
    type: 'boolean',
    default: true,
  })
  activo!: boolean;


  // =====================================================
  // META MENSUAL
  // =====================================================

  @Column({
    type: 'integer',
    default: 150,
  })
  metaMensualHoras!: number;
}