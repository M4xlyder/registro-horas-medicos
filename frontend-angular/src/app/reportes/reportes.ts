import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

interface ReportePersonal {
  id: number;

  tipoContrato:
    | 'Nombrado'
    | 'CAS'
    | 'Residente'
    | 'Tercero'
    | 'Contrato a plazo fijo'
    | 'Contrato a suplencia';

  departamento: string;

  especialidad: string;

  nombre: string;

  primerApellido: string;

  meta: number;

  programadas: number;
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
  // PERIODO
  // =====================================================

  periodo = 'Agosto 2026';


  // =====================================================
  // BÚSQUEDA
  // =====================================================

  busqueda = '';


  // =====================================================
  // FILTROS
  // =====================================================

  filtroContrato = 'Todos';

  filtroDepartamento = 'Todos';

  filtroEspecialidad = 'Todas';

  filtroEstado = 'Todos';


  // =====================================================
  // TIPOS DE CONTRATO
  // =====================================================

  tiposContrato: string[] = [

    'Todos',

    'Nombrado',

    'CAS',

    'Residente',

    'Tercero',

    'Contrato a plazo fijo',

    'Contrato a suplencia'

  ];


  // =====================================================
  // DEPARTAMENTOS
  // =====================================================

  departamentos: string[] = [

    'Todos',

    'Emergencia y Cuidados Críticos',

    'Anestesiología',

    'Ginecología y Obstetricia',

    'Cirugía',

    'Pediatría',

    'Medicina'

  ];


  // =====================================================
  // ESPECIALIDADES POR DEPARTAMENTO
  // =====================================================

  especialidadesPorDepartamento:
    Record<string, string[]> = {

      'Emergencia y Cuidados Críticos': [

        'Medicina intensiva',

        'Medicina interna a plazo fijo',

        'Medicina general',

        'Emergenciólogo plazo fijo',

        'Medicina general cont. suplencia',

        'Intensivista',

        'Emergenciólogo'

      ],

      'Anestesiología': [

        'Anestesiólogos'

      ],

      'Ginecología y Obstetricia': [

        'Ginecólogos',

        'Obstetricias'

      ],

      'Cirugía': [

        'Cirujanos',

        'Traumatólogos',

        'Otorrinos',

        'Oftalmólogo',

        'Urólogos'

      ],

      'Pediatría': [

        'Pediatras'

      ],

      'Medicina': [

        'Medicina interna',

        'Neurología',

        'Psiquiatría',

        'Gastro',

        'Medicina física y rehabilitación',

        'Medicina general',

        'Gastroenterólogo',

        'Reumatólogos',

        'Oncólogos',

        'Neumólogos'

      ]

    };


  // =====================================================
  // DATOS DE PRUEBA
  // =====================================================

  reportes: ReportePersonal[] = [

    {
      id: 1,

      tipoContrato: 'Nombrado',

      departamento: 'Medicina',

      especialidad: 'Medicina interna',

      nombre: 'Marcelo',

      primerApellido: 'Pérez',

      meta: 150,

      programadas: 150
    },

    {
      id: 2,

      tipoContrato: 'CAS',

      departamento: 'Emergencia y Cuidados Críticos',

      especialidad: 'Emergenciólogo',

      nombre: 'Juan',

      primerApellido: 'García',

      meta: 150,

      programadas: 138
    },

    {
      id: 3,

      tipoContrato: 'Residente',

      departamento: 'Pediatría',

      especialidad: 'Pediatras',

      nombre: 'Carlos',

      primerApellido: 'Zafra',

      meta: 150,

      programadas: 150
    },

    {
      id: 4,

      tipoContrato: 'Contrato a plazo fijo',

      departamento: 'Ginecología y Obstetricia',

      especialidad: 'Ginecólogos',

      nombre: 'Ambar',

      primerApellido: 'Barriga',

      meta: 150,

      programadas: 142
    },

    {
      id: 5,

      tipoContrato: 'Contrato a suplencia',

      departamento: 'Emergencia y Cuidados Críticos',

      especialidad: 'Medicina general cont. suplencia',

      nombre: 'Kian',

      primerApellido: 'Okuhama',

      meta: 150,

      programadas: 130
    },

    {
      id: 6,

      tipoContrato: 'Tercero',

      departamento: 'Cirugía',

      especialidad: 'Traumatólogos',

      nombre: 'Pedro',

      primerApellido: 'Ramírez',

      meta: 150,

      programadas: 156
    },

    {
      id: 7,

      tipoContrato: 'Nombrado',

      departamento: 'Anestesiología',

      especialidad: 'Anestesiólogos',

      nombre: 'Luis',

      primerApellido: 'Torres',

      meta: 150,

      programadas: 150
    },

    {
      id: 8,

      tipoContrato: 'CAS',

      departamento: 'Medicina',

      especialidad: 'Neurología',

      nombre: 'Andrea',

      primerApellido: 'Flores',

      meta: 150,

      programadas: 145
    },

    {
      id: 9,

      tipoContrato: 'Tercero',

      departamento: 'Cirugía',

      especialidad: 'Urólogos',

      nombre: 'José',

      primerApellido: 'Castillo',

      meta: 150,

      programadas: 125
    },

    {
      id: 10,

      tipoContrato: 'Contrato a plazo fijo',

      departamento: 'Medicina',

      especialidad: 'Oncólogos',

      nombre: 'Daniel',

      primerApellido: 'Vargas',

      meta: 150,

      programadas: 150
    }

  ];


  // =====================================================
  // ESPECIALIDADES DISPONIBLES
  // =====================================================

  get especialidadesDisponibles(): string[] {

    if (
      this.filtroDepartamento === 'Todos'
    ) {

      const todas = Object.values(
        this.especialidadesPorDepartamento
      ).flat();

      return [
        'Todas',
        ...todas.filter(
          (especialidad, index) =>
            todas.indexOf(especialidad) === index
        )
      ];

    }


    return [

      'Todas',

      ...(
        this.especialidadesPorDepartamento[
          this.filtroDepartamento
        ] || []

      )

    ];

  }


  // =====================================================
  // CAMBIO DE DEPARTAMENTO
  // =====================================================

  cambioDepartamento(): void {

    this.filtroEspecialidad = 'Todas';

  }


  // =====================================================
  // NOMBRE COMPLETO
  // =====================================================

  nombreCompleto(
    reporte: ReportePersonal
  ): string {

    return `${reporte.nombre} ${reporte.primerApellido}`;

  }


  // =====================================================
  // HORAS FALTANTES
  // =====================================================

  horasFaltantes(
    reporte: ReportePersonal
  ): number {

    return Math.max(

      reporte.meta -
      reporte.programadas,

      0

    );

  }


  // =====================================================
  // CUMPLIMIENTO
  // =====================================================

  porcentajeCumplimiento(
    reporte: ReportePersonal
  ): number {

    if (
      reporte.meta === 0
    ) {

      return 0;

    }

    return Math.round(

      (
        reporte.programadas /
        reporte.meta

      ) * 100

    );

  }


  // =====================================================
  // ESTADO
  // =====================================================

  cumpleMeta(
    reporte: ReportePersonal
  ): boolean {

    return (
      reporte.programadas >=
      reporte.meta
    );

  }


  // =====================================================
  // TEXTO ESTADO
  // =====================================================

  textoEstado(
    reporte: ReportePersonal
  ): string {

    return this.cumpleMeta(reporte)
      ? 'Cumple'
      : 'Pendiente';

  }


  // =====================================================
  // REPORTES FILTRADOS
  // =====================================================

  get reportesFiltrados(): ReportePersonal[] {

    const texto =
      this.busqueda
        .trim()
        .toLowerCase();


    return this.reportes.filter(
      reporte => {

        const nombre =
          this.nombreCompleto(
            reporte
          ).toLowerCase();


        const coincideBusqueda =
          !texto ||
          nombre.includes(texto);


        const coincideContrato =
          this.filtroContrato === 'Todos' ||
          reporte.tipoContrato ===
          this.filtroContrato;


        const coincideDepartamento =
          this.filtroDepartamento === 'Todos' ||
          reporte.departamento ===
          this.filtroDepartamento;


        const coincideEspecialidad =
          this.filtroEspecialidad === 'Todas' ||
          reporte.especialidad ===
          this.filtroEspecialidad;


        const cumple =
          this.cumpleMeta(
            reporte
          );


        const coincideEstado =
          this.filtroEstado === 'Todos' ||

          (
            this.filtroEstado === 'Cumple' &&
            cumple
          ) ||

          (
            this.filtroEstado === 'Pendiente' &&
            !cumple
          );


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
  // CONTADORES
  // =====================================================

  get totalPersonal(): number {

    return this.reportes.length;

  }


  get totalCumplen(): number {

    return this.reportes.filter(
      reporte =>
        this.cumpleMeta(reporte)
    ).length;

  }


  get totalPendientes(): number {

    return this.reportes.filter(
      reporte =>
        !this.cumpleMeta(reporte)
    ).length;

  }


  // =====================================================
  // META TOTAL
  // =====================================================

  get metaTotal(): number {

    return this.reportes.reduce(

      (
        total,
        reporte
      ) =>

        total +
        reporte.meta,

      0

    );

  }


  // =====================================================
  // HORAS PROGRAMADAS TOTAL
  // =====================================================

  get horasProgramadasTotal(): number {

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
  // HORAS FALTANTES TOTAL
  // =====================================================

  get horasFaltantesTotal(): number {

    return this.reportes.reduce(

      (
        total,
        reporte
      ) =>

        total +
        this.horasFaltantes(
          reporte
        ),

      0

    );

  }


  // =====================================================
  // CUMPLIMIENTO GENERAL
  // =====================================================

  get cumplimientoGeneral(): number {

    if (
      this.metaTotal === 0
    ) {

      return 0;

    }

    return Math.min(

      Math.round(

        (
          this.horasProgramadasTotal /
          this.metaTotal

        ) * 100

      ),

      100

    );

  }


  // =====================================================
  // LIMPIAR FILTROS
  // =====================================================

  limpiarFiltros(): void {

    this.busqueda = '';

    this.filtroContrato = 'Todos';

    this.filtroDepartamento = 'Todos';

    this.filtroEspecialidad = 'Todas';

    this.filtroEstado = 'Todos';

  }


  // =====================================================
  // EXPORTAR
  // =====================================================

  exportarReporte(): void {

    alert(
      'La exportación a Excel/PDF se habilitará cuando conectemos el backend.'
    );

  }

}