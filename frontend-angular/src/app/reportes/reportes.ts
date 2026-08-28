import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

interface ReporteEmpleado {

  id: number;

  tipoContrato: string;

  departamento: string;

  especialidad: string;

  nombre: string;

  apellido: string;

  meta: number;

  programadas: number;

  faltantes: number;

  cumplimiento: number;

  estado: 'Activo' | 'Inactivo';

}


@Component({

  selector: 'app-reportes',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './reportes.html',

  styleUrl: './reportes.css'

})


export class Reportes {


  // =====================================================
  // META MENSUAL
  // =====================================================

  readonly META_MENSUAL = 150;


  // =====================================================
  // FILTROS
  // =====================================================

  busqueda = '';

  filtroContrato = '';

  filtroDepartamento = '';

  filtroEspecialidad = '';

  filtroEstado = '';


  // =====================================================
  // DATOS
  // =====================================================

  reportes: ReporteEmpleado[] = [

    {
      id: 1,
      tipoContrato: 'Nombrado',
      departamento: 'Medicina',
      especialidad: 'Medicina interna',
      nombre: 'Marcelo',
      apellido: 'Pérez',
      meta: 150,
      programadas: 150,
      faltantes: 0,
      cumplimiento: 100,
      estado: 'Activo'
    },

    {
      id: 2,
      tipoContrato: 'CAS',
      departamento: 'Medicina',
      especialidad: 'Neurología',
      nombre: 'Juan',
      apellido: 'García',
      meta: 150,
      programadas: 138,
      faltantes: 12,
      cumplimiento: 92,
      estado: 'Activo'
    },

    {
      id: 3,
      tipoContrato: 'Contrato a plazo fijo',
      departamento: 'Cirugía',
      especialidad: 'Traumatología',
      nombre: 'Carlos',
      apellido: 'Zafra',
      meta: 150,
      programadas: 150,
      faltantes: 0,
      cumplimiento: 100,
      estado: 'Activo'
    },

    {
      id: 4,
      tipoContrato: 'Contrato a suplencia',
      departamento: 'Ginecología y Obstetricia',
      especialidad: 'Ginecología',
      nombre: 'Ambar',
      apellido: 'Barriga',
      meta: 150,
      programadas: 142,
      faltantes: 8,
      cumplimiento: 95,
      estado: 'Activo'
    },

    {
      id: 5,
      tipoContrato: 'Tercero',
      departamento: 'Medicina',
      especialidad: 'Medicina general',
      nombre: 'Kian',
      apellido: 'Okuhama',
      meta: 150,
      programadas: 130,
      faltantes: 20,
      cumplimiento: 87,
      estado: 'Activo'
    },

    {
      id: 6,
      tipoContrato: 'Nombrado',
      departamento: 'Emergencia y Cuidados Críticos',
      especialidad: 'Medicina intensiva',
      nombre: 'Luis',
      apellido: 'Ramírez',
      meta: 150,
      programadas: 150,
      faltantes: 0,
      cumplimiento: 100,
      estado: 'Activo'
    },

    {
      id: 7,
      tipoContrato: 'Contrato a plazo fijo',
      departamento: 'Emergencia y Cuidados Críticos',
      especialidad: 'Emergenciólogo plazo fijo',
      nombre: 'Andrea',
      apellido: 'Torres',
      meta: 150,
      programadas: 135,
      faltantes: 15,
      cumplimiento: 90,
      estado: 'Activo'
    },

    {
      id: 8,
      tipoContrato: 'Contrato a suplencia',
      departamento: 'Anestesiología',
      especialidad: 'Anestesiología',
      nombre: 'Daniel',
      apellido: 'Vargas',
      meta: 150,
      programadas: 150,
      faltantes: 0,
      cumplimiento: 100,
      estado: 'Activo'
    },

    {
      id: 9,
      tipoContrato: 'CAS',
      departamento: 'Pediatría',
      especialidad: 'Pediatría',
      nombre: 'Sofía',
      apellido: 'Mendoza',
      meta: 150,
      programadas: 145,
      faltantes: 5,
      cumplimiento: 97,
      estado: 'Activo'
    },

    {
      id: 10,
      tipoContrato: 'Tercero',
      departamento: 'Medicina',
      especialidad: 'Reumatología',
      nombre: 'Pedro',
      apellido: 'Salazar',
      meta: 150,
      programadas: 120,
      faltantes: 30,
      cumplimiento: 80,
      estado: 'Inactivo'
    }

  ];


  // =====================================================
  // CONTRATOS
  // =====================================================

  get tiposContrato(): string[] {

    return [
      ...new Set(
        this.reportes.map(
          reporte => reporte.tipoContrato
        )
      )
    ];

  }


  // =====================================================
  // DEPARTAMENTOS
  // =====================================================

  get departamentos(): string[] {

    return [
      ...new Set(
        this.reportes.map(
          reporte => reporte.departamento
        )
      )
    ];

  }


  // =====================================================
  // ESPECIALIDADES
  // =====================================================

  get especialidades(): string[] {

    return [
      ...new Set(
        this.reportes.map(
          reporte => reporte.especialidad
        )
      )
    ];

  }


  // =====================================================
  // REPORTES FILTRADOS
  // =====================================================

  get reportesFiltrados(): ReporteEmpleado[] {

    const texto =
      this.busqueda
        .trim()
        .toLowerCase();


    return this.reportes.filter(
      reporte => {

        const coincideBusqueda =

          !texto ||

          reporte.nombre
            .toLowerCase()
            .includes(texto) ||

          reporte.apellido
            .toLowerCase()
            .includes(texto) ||

          `${reporte.nombre} ${reporte.apellido}`
            .toLowerCase()
            .includes(texto);


        const coincideContrato =

          !this.filtroContrato ||

          reporte.tipoContrato ===
          this.filtroContrato;


        const coincideDepartamento =

          !this.filtroDepartamento ||

          reporte.departamento ===
          this.filtroDepartamento;


        const coincideEspecialidad =

          !this.filtroEspecialidad ||

          reporte.especialidad ===
          this.filtroEspecialidad;


        const coincideEstado =

          !this.filtroEstado ||

          reporte.estado ===
          this.filtroEstado;


        return (

          coincideBusqueda &&

          coincideContrato &&

          coincideDepartamento &&

          coincideEspecialidad &&

          coincideEstado

        );

      }
    );

  }


  // =====================================================
  // TOTAL PERSONAL
  // =====================================================

  get totalPersonal(): number {

    return this.reportes.length;

  }


  // =====================================================
  // TOTAL QUE CUMPLE
  // =====================================================

  get totalCumplen(): number {

    return this.reportes.filter(
      reporte =>
        reporte.programadas >= this.META_MENSUAL
    ).length;

  }


  // =====================================================
  // TOTAL PENDIENTES
  // =====================================================

  get totalPendientes(): number {

    return this.reportes.filter(
      reporte =>
        reporte.programadas <
        this.META_MENSUAL
    ).length;

  }


  // =====================================================
  // HORAS PROGRAMADAS
  // =====================================================

  get totalProgramadas(): number {

    return this.reportes.reduce(
      (
        total,
        reporte
      ) =>
        total +
        reporte.programadas,

      0
    );

  }


  // =====================================================
  // HORAS FALTANTES
  // =====================================================

  get totalFaltantes(): number {

    return this.reportes.reduce(
      (
        total,
        reporte
      ) =>
        total +
        reporte.faltantes,

      0
    );

  }


  // =====================================================
  // CUMPLIMIENTO GENERAL
  // =====================================================

  get cumplimientoGeneral(): number {

    if (!this.reportes.length) {

      return 0;

    }


    const totalMeta =
      this.reportes.length *
      this.META_MENSUAL;


    if (totalMeta === 0) {

      return 0;

    }


    const porcentaje =
      (
        this.totalProgramadas /
        totalMeta
      ) * 100;


    return Math.min(
      Math.round(porcentaje),
      100
    );

  }


  // =====================================================
  // LIMPIAR FILTROS
  // =====================================================

  limpiarFiltros(): void {

    this.busqueda = '';

    this.filtroContrato = '';

    this.filtroDepartamento = '';

    this.filtroEspecialidad = '';

    this.filtroEstado = '';

  }


  // =====================================================
  // EXPORTAR
  // =====================================================

  exportarReporte(): void {

    alert(
      'La exportación del reporte estará disponible cuando conectemos el backend.'
    );

  }


  // =====================================================
  // TRACK BY
  // =====================================================

  trackById(
    index: number,
    reporte: ReporteEmpleado
  ): number {

    return reporte.id;

  }

}
