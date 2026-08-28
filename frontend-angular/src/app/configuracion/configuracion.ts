import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, HostListener, OnInit } from '@angular/core';

interface Horario {
  id: number;
  sigla: string;
  significado: string;
  horas: number;
  activo: boolean;
}

interface Departamento {
  id: number;
  nombre: string;
  activo: boolean;
}

interface Especialidad {
  id: number;
  nombre: string;
  departamento: string;
  activo: boolean;
}

interface TipoContrato {
  id: number;
  nombre: string;
  activo: boolean;
}

interface EmpleadoConfiguracion {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  departamento: string;
  especialidad: string;
  contrato: string;
  telefono: string;
  metaHoras: number;
  activo: boolean;
}

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css'
})
export class Configuracion implements OnInit {

  // =====================================================
  // CIERRE GLOBAL DE MODALES CON ESC
  // =====================================================

  @HostListener('document:keydown.escape')
  cerrarModalConEscape(): void {

    if (this.mostrarModalEmpleado) {
      this.cerrarModalEmpleado();
      return;
    }

    if (this.mostrarModalHorario) {
      this.cerrarModalHorario();
      return;
    }

    if (this.mostrarModalDepartamento) {
      this.cerrarModalDepartamento();
      return;
    }

    if (this.mostrarModalEspecialidad) {
      this.cerrarModalEspecialidad();
      return;
    }

    if (this.mostrarModalContrato) {
      this.cerrarModalContrato();
    }

  }


  // =====================================================
  // SECCIÓN ACTIVA
  // =====================================================

  seccionActiva = 'apariencia';


  // =====================================================
  // APARIENCIA
  // =====================================================

  temaActual: 'claro' | 'gris' | 'oscuro' = 'claro';


  // =====================================================
  // MODALES
  // =====================================================

  mostrarModalEmpleado = false;
  mostrarModalHorario = false;
  mostrarModalDepartamento = false;
  mostrarModalEspecialidad = false;
  mostrarModalContrato = false;


  // =====================================================
  // MODO EDICIÓN
  // =====================================================

  modoEdicion = false;


  // =====================================================
  // DROPDOWNS - HORARIOS
  // =====================================================

  dropdownHorarioSigla = false;
  dropdownHorarioSignificado = false;
  dropdownHorarioEstado = false;


  // =====================================================
  // DROPDOWNS - DEPARTAMENTOS
  // =====================================================

  dropdownDepartamento = false;
  dropdownDepartamentoEstado = false;


  // =====================================================
  // DROPDOWNS - ESPECIALIDADES
  // =====================================================

  dropdownEspecialidad = false;
  dropdownEspecialidadDepartamento = false;
  dropdownEspecialidadEstado = false;


  // =====================================================
  // DROPDOWNS - CONTRATOS
  // =====================================================

  dropdownContrato = false;
  dropdownContratoEstado = false;


  // =====================================================
  // DROPDOWNS - EMPLEADOS
  // =====================================================

  dropdownEmpleadoDepartamento = false;
  dropdownEmpleadoEspecialidad = false;
  dropdownEmpleadoContrato = false;
  dropdownEmpleadoEstado = false;

  // DROPDOWNS BUSCABLES DEL MODAL DE EMPLEADO
  dropdownEmpleadoDepartamentoModal = false;
  dropdownEmpleadoEspecialidadModal = false;
  dropdownEmpleadoContratoModal = false;


  // =====================================================
  // BÚSQUEDAS
  // =====================================================

  busquedaHorarioSigla = '';
  busquedaHorarioSignificado = '';
  busquedaHorarioEstado = '';

  busquedaDepartamento = '';
  busquedaDepartamentoEstado = '';

  busquedaEspecialidad = '';
  busquedaEspecialidadDepartamento = '';
  busquedaEspecialidadEstado = '';

  busquedaContrato = '';
  busquedaContratoEstado = '';

  busquedaEmpleado = '';
  busquedaEmpleadoDepartamento = '';
  busquedaEmpleadoEspecialidad = '';
  busquedaEmpleadoContrato = '';
  busquedaEmpleadoEstado = '';


  // =====================================================
  // FILTROS
  // =====================================================

  filtroHorarioSigla = '';
  filtroHorarioSignificado = '';
  filtroHorarioEstado = 'Todos';

  filtroDepartamento = '';
  filtroDepartamentoEstado = 'Todos';

  filtroEspecialidad = '';
  filtroEspecialidadDepartamento = 'Todos';
  filtroEspecialidadEstado = 'Todos';

  filtroContrato = '';
  filtroContratoEstado = 'Todos';

  filtroEmpleadoDepartamento = 'Todos';
  filtroEmpleadoEspecialidad = 'Todos';
  filtroEmpleadoContrato = 'Todos';
  filtroEmpleadoEstado = 'Todos';


  // =====================================================
  // FORMULARIOS
  // =====================================================

  empleadoFormulario: EmpleadoConfiguracion =
    this.nuevoEmpleado();

  horarioFormulario: Horario =
    this.nuevoHorario();

  departamentoFormulario: Departamento =
    this.nuevoDepartamento();

  especialidadFormulario: Especialidad =
    this.nuevaEspecialidad();

  contratoFormulario: TipoContrato =
    this.nuevoContrato();


  // =====================================================
  // HORARIOS
  // =====================================================

  horarios: Horario[] = [

    {
      id: 1,
      sigla: 'GD',
      significado: 'Guardia Diurna',
      horas: 12,
      activo: true
    },

    {
      id: 2,
      sigla: 'GN',
      significado: 'Guardia Nocturna',
      horas: 12,
      activo: true
    },

    {
      id: 3,
      sigla: 'M',
      significado: 'Mañana',
      horas: 6,
      activo: true
    },

    {
      id: 4,
      sigla: 'T',
      significado: 'Tarde',
      horas: 6,
      activo: true
    },

    {
      id: 5,
      sigla: 'TD',
      significado: 'Turno Día',
      horas: 12,
      activo: true
    },

    {
      id: 6,
      sigla: 'TN',
      significado: 'Turno Noche',
      horas: 12,
      activo: true
    }

  ];


  // =====================================================
  // DEPARTAMENTOS
  // =====================================================

  departamentos: Departamento[] = [

    {
      id: 1,
      nombre: 'Emergencia y Cuidados Críticos',
      activo: true
    },

    {
      id: 2,
      nombre: 'Anestesiología',
      activo: true
    },

    {
      id: 3,
      nombre: 'Ginecología y Obstetricia',
      activo: true
    },

    {
      id: 4,
      nombre: 'Cirugía',
      activo: true
    },

    {
      id: 5,
      nombre: 'Pediatría',
      activo: true
    },

    {
      id: 6,
      nombre: 'Medicina',
      activo: true
    }

  ];


  // =====================================================
  // ESPECIALIDADES
  // =====================================================

  especialidades: Especialidad[] = [

    {
      id: 1,
      nombre: 'Medicina intensiva',
      departamento: 'Emergencia y Cuidados Críticos',
      activo: true
    },

    {
      id: 2,
      nombre: 'Medicina interna a plazo fijo',
      departamento: 'Emergencia y Cuidados Críticos',
      activo: true
    },

    {
      id: 3,
      nombre: 'Medicina general',
      departamento: 'Emergencia y Cuidados Críticos',
      activo: true
    },

    {
      id: 4,
      nombre: 'Emergenciólogo plazo fijo',
      departamento: 'Emergencia y Cuidados Críticos',
      activo: true
    },

    {
      id: 5,
      nombre: 'Medicina general cont. suplencia',
      departamento: 'Emergencia y Cuidados Críticos',
      activo: true
    },

    {
      id: 6,
      nombre: 'Intensivista',
      departamento: 'Emergencia y Cuidados Críticos',
      activo: true
    },

    {
      id: 7,
      nombre: 'Emergenciólogo',
      departamento: 'Emergencia y Cuidados Críticos',
      activo: true
    },

    {
      id: 8,
      nombre: 'Anestesiólogos',
      departamento: 'Anestesiología',
      activo: true
    },

    {
      id: 9,
      nombre: 'Ginecólogos',
      departamento: 'Ginecología y Obstetricia',
      activo: true
    },

    {
      id: 10,
      nombre: 'Obstetricias',
      departamento: 'Ginecología y Obstetricia',
      activo: true
    },

    {
      id: 11,
      nombre: 'Cirujanos',
      departamento: 'Cirugía',
      activo: true
    },

    {
      id: 12,
      nombre: 'Traumatólogos',
      departamento: 'Cirugía',
      activo: true
    },

    {
      id: 13,
      nombre: 'Otorrinos',
      departamento: 'Cirugía',
      activo: true
    },

    {
      id: 14,
      nombre: 'Oftalmólogo',
      departamento: 'Cirugía',
      activo: true
    },

    {
      id: 15,
      nombre: 'Urólogos',
      departamento: 'Cirugía',
      activo: true
    },

    {
      id: 16,
      nombre: 'Pediatras',
      departamento: 'Pediatría',
      activo: true
    },

    {
      id: 17,
      nombre: 'Medicina interna',
      departamento: 'Medicina',
      activo: true
    },

    {
      id: 18,
      nombre: 'Neurología',
      departamento: 'Medicina',
      activo: true
    },

    {
      id: 19,
      nombre: 'Psiquiatría',
      departamento: 'Medicina',
      activo: true
    },

    {
      id: 20,
      nombre: 'Gastro',
      departamento: 'Medicina',
      activo: true
    },

    {
      id: 21,
      nombre: 'Medicina física y rehabilitación',
      departamento: 'Medicina',
      activo: true
    },

    {
      id: 22,
      nombre: 'Medicina general',
      departamento: 'Medicina',
      activo: true
    },

    {
      id: 23,
      nombre: 'Gastroenterólogo',
      departamento: 'Medicina',
      activo: true
    },

    {
      id: 24,
      nombre: 'Reumatólogos',
      departamento: 'Medicina',
      activo: true
    },

    {
      id: 25,
      nombre: 'Oncólogos',
      departamento: 'Medicina',
      activo: true
    },

    {
      id: 26,
      nombre: 'Neumólogos',
      departamento: 'Medicina',
      activo: true
    }

  ];


  // =====================================================
  // TIPOS DE CONTRATO
  // =====================================================

  tiposContrato: TipoContrato[] = [

    {
      id: 1,
      nombre: 'Nombrado',
      activo: true
    },

    {
      id: 2,
      nombre: 'CAS',
      activo: true
    },

    {
      id: 3,
      nombre: 'Residente',
      activo: true
    },

    {
      id: 4,
      nombre: 'Tercero',
      activo: true
    },

    {
      id: 5,
      nombre: 'Contrato a plazo fijo',
      activo: true
    },

    {
      id: 6,
      nombre: 'Contrato a suplencia',
      activo: true
    }

  ];


  // =====================================================
  // EMPLEADOS
  // META FIJA: 150 HORAS
  // =====================================================

  empleados: EmpleadoConfiguracion[] = [

    {
      id: 1,
      dni: '70451236',
      nombres: 'Marcelo',
      apellidos: 'Pérez',
      departamento: 'Cirugía',
      especialidad: 'Cirujanos',
      contrato: 'Nombrado',
      telefono: '999999999',
      metaHoras: 150,
      activo: true
    },

    {
      id: 2,
      dni: '71562347',
      nombres: 'Juan',
      apellidos: 'García',
      departamento: 'Pediatría',
      especialidad: 'Pediatras',
      contrato: 'CAS',
      telefono: '988888888',
      metaHoras: 150,
      activo: true
    },

    {
      id: 3,
      dni: '72673458',
      nombres: 'Carlos',
      apellidos: 'Zafra',
      departamento: 'Anestesiología',
      especialidad: 'Anestesiólogos',
      contrato: 'Contrato a plazo fijo',
      telefono: '977777777',
      metaHoras: 150,
      activo: true
    },

    {
      id: 4,
      dni: '73784569',
      nombres: 'Ambar',
      apellidos: 'Barriga',
      departamento: 'Ginecología y Obstetricia',
      especialidad: 'Ginecólogos',
      contrato: 'Contrato a suplencia',
      telefono: '966666666',
      metaHoras: 150,
      activo: true
    },

    {
      id: 5,
      dni: '74895670',
      nombres: 'Kian',
      apellidos: 'Okuhama',
      departamento: 'Medicina',
      especialidad: 'Medicina interna',
      contrato: 'Tercero',
      telefono: '955555555',
      metaHoras: 150,
      activo: true
    }

  ];


  // =====================================================
  // INICIALIZACIÓN
  // =====================================================

  ngOnInit(): void {

    const temaGuardado =
      localStorage.getItem('tema-sistema');

    if (
      temaGuardado === 'claro' ||
      temaGuardado === 'gris' ||
      temaGuardado === 'oscuro'
    ) {

      this.temaActual = temaGuardado;

    }

    this.aplicarTema();

  }


  // =====================================================
  // CAMBIAR SECCIÓN
  // =====================================================

  cambiarSeccion(
    seccion: string
  ): void {

    this.cerrarTodosLosDropdowns();

    this.seccionActiva = seccion;

  }


  // =====================================================
  // TEMAS
  // =====================================================

  cambiarTema(
    tema: 'claro' | 'gris' | 'oscuro'
  ): void {

    this.temaActual = tema;

    localStorage.setItem(
      'tema-sistema',
      tema
    );

    this.aplicarTema();

  }


  aplicarTema(): void {

    document.documentElement.classList.remove(
      'dark-theme',
      'gray-theme'
    );

    document.body.classList.remove(
      'dark-theme',
      'gray-theme'
    );

    if (this.temaActual === 'oscuro') {

      document.documentElement.classList.add(
        'dark-theme'
      );

      document.body.classList.add(
        'dark-theme'
      );

    }

    if (this.temaActual === 'gris') {

      document.documentElement.classList.add(
        'gray-theme'
      );

      document.body.classList.add(
        'gray-theme'
      );

    }

  }


  restablecerTema(): void {

    this.cambiarTema('claro');

  }


  // =====================================================
  // OPCIONES DE FILTROS
  // =====================================================

  get opcionesHorarioSigla(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        ...new Set(
          this.horarios.map(
            horario => horario.sigla
          )
        )
      ],
      this.busquedaHorarioSigla
    );

  }


  get opcionesHorarioSignificado(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        ...new Set(
          this.horarios.map(
            horario => horario.significado
          )
        )
      ],
      this.busquedaHorarioSignificado
    );

  }


  get opcionesHorarioEstado(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        'Activos',
        'Inactivos'
      ],
      this.busquedaHorarioEstado
    );

  }


  get opcionesDepartamento(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        ...new Set(
          this.departamentos.map(
            departamento =>
              departamento.nombre
          )
        )
      ],
      this.busquedaDepartamento
    );

  }


  get opcionesDepartamentoEstado(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        'Activos',
        'Inactivos'
      ],
      this.busquedaDepartamentoEstado
    );

  }


  get opcionesEspecialidad(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        ...new Set(
          this.especialidades.map(
            especialidad =>
              especialidad.nombre
          )
        )
      ],
      this.busquedaEspecialidad
    );

  }


  get opcionesEspecialidadDepartamento(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        ...new Set(
          this.departamentos.map(
            departamento =>
              departamento.nombre
          )
        )
      ],
      this.busquedaEspecialidadDepartamento
    );

  }


  get opcionesEspecialidadEstado(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        'Activos',
        'Inactivos'
      ],
      this.busquedaEspecialidadEstado
    );

  }


  get opcionesContrato(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        ...new Set(
          this.tiposContrato.map(
            contrato =>
              contrato.nombre
          )
        )
      ],
      this.busquedaContrato
    );

  }


  get opcionesContratoEstado(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        'Activos',
        'Inactivos'
      ],
      this.busquedaContratoEstado
    );

  }


  get opcionesEmpleadoDepartamento(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        ...new Set(
          this.departamentos.map(
            departamento =>
              departamento.nombre
          )
        )
      ],
      this.busquedaEmpleadoDepartamento
    );

  }


  get opcionesEmpleadoEspecialidad(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        ...new Set(
          this.especialidades.map(
            especialidad =>
              especialidad.nombre
          )
        )
      ],
      this.busquedaEmpleadoEspecialidad
    );

  }


  get opcionesEmpleadoContrato(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        ...new Set(
          this.tiposContrato.map(
            contrato =>
              contrato.nombre
          )
        )
      ],
      this.busquedaEmpleadoContrato
    );

  }


  get opcionesEmpleadoEstado(): string[] {

    return this.filtrarOpciones(
      [
        'Todos',
        'Activos',
        'Inactivos'
      ],
      this.busquedaEmpleadoEstado
    );

  }


  // =====================================================
  // OPCIONES BUSCABLES - MODAL EMPLEADO
  // =====================================================

  get departamentosEmpleadoModalFiltrados(): Departamento[] {

    const texto =
      this.empleadoFormulario.departamento
        .trim()
        .toLowerCase();

    if (!texto) {
      return this.departamentos;
    }

    return this.departamentos.filter(
      departamento =>
        departamento.nombre
          .toLowerCase()
          .includes(texto)
    );

  }


  get especialidadesEmpleadoModalFiltradas(): Especialidad[] {

    const texto =
      this.empleadoFormulario.especialidad
        .trim()
        .toLowerCase();

    const departamento =
      this.empleadoFormulario.departamento
        .trim()
        .toLowerCase();

    let resultado = this.especialidades;

    if (departamento) {
      resultado = resultado.filter(
        especialidad =>
          especialidad.departamento
            .toLowerCase() === departamento
      );
    }

    if (!texto) {
      return resultado;
    }

    return resultado.filter(
      especialidad =>
        especialidad.nombre
          .toLowerCase()
          .includes(texto)
    );

  }


  get contratosEmpleadoModalFiltrados(): TipoContrato[] {

    const texto =
      this.empleadoFormulario.contrato
        .trim()
        .toLowerCase();

    if (!texto) {
      return this.tiposContrato;
    }

    return this.tiposContrato.filter(
      contrato =>
        contrato.nombre
          .toLowerCase()
          .includes(texto)
    );

  }


  private filtrarOpciones(
    opciones: string[],
    busqueda: string
  ): string[] {

    const texto =
      busqueda
        .trim()
        .toLowerCase();

    if (!texto) {

      return opciones;

    }

    return opciones.filter(
      opcion =>
        opcion
          .toLowerCase()
          .includes(texto)
    );

  }


  // =====================================================
  // FILTROS HORARIOS
  // =====================================================

  get horariosFiltrados(): Horario[] {

    const sigla =
      this.filtroHorarioSigla
        .toLowerCase();

    const significado =
      this.filtroHorarioSignificado
        .toLowerCase();

    return this.horarios.filter(
      horario => {

        const coincideSigla =
          !sigla ||
          horario.sigla
            .toLowerCase()
            .includes(sigla);

        const coincideSignificado =
          !significado ||
          horario.significado
            .toLowerCase()
            .includes(significado);

        const coincideEstado =
          this.filtroHorarioEstado === 'Todos' ||
          (
            this.filtroHorarioEstado === 'Activos' &&
            horario.activo
          ) ||
          (
            this.filtroHorarioEstado === 'Inactivos' &&
            !horario.activo
          );

        return (
          coincideSigla &&
          coincideSignificado &&
          coincideEstado
        );

      }
    );

  }


  // =====================================================
  // FILTROS DEPARTAMENTOS
  // =====================================================

  get departamentosFiltrados(): Departamento[] {

    const texto =
      this.filtroDepartamento
        .toLowerCase();

    return this.departamentos.filter(
      departamento => {

        const coincideNombre =
          !texto ||
          departamento.nombre
            .toLowerCase()
            .includes(texto);

        const coincideEstado =
          this.filtroDepartamentoEstado === 'Todos' ||
          (
            this.filtroDepartamentoEstado === 'Activos' &&
            departamento.activo
          ) ||
          (
            this.filtroDepartamentoEstado === 'Inactivos' &&
            !departamento.activo
          );

        return (
          coincideNombre &&
          coincideEstado
        );

      }
    );

  }


  // =====================================================
  // FILTROS ESPECIALIDADES
  // =====================================================

  get especialidadesFiltradas(): Especialidad[] {

    const texto =
      this.filtroEspecialidad
        .toLowerCase();

    return this.especialidades.filter(
      especialidad => {

        const coincideNombre =
          !texto ||
          especialidad.nombre
            .toLowerCase()
            .includes(texto);

        const coincideDepartamento =
          this.filtroEspecialidadDepartamento === 'Todos' ||
          especialidad.departamento ===
          this.filtroEspecialidadDepartamento;

        const coincideEstado =
          this.filtroEspecialidadEstado === 'Todos' ||
          (
            this.filtroEspecialidadEstado === 'Activos' &&
            especialidad.activo
          ) ||
          (
            this.filtroEspecialidadEstado === 'Inactivos' &&
            !especialidad.activo
          );

        return (
          coincideNombre &&
          coincideDepartamento &&
          coincideEstado
        );

      }
    );

  }


  // =====================================================
  // FILTROS CONTRATOS
  // =====================================================

  get contratosFiltrados(): TipoContrato[] {

    const texto =
      this.filtroContrato
        .toLowerCase();

    return this.tiposContrato.filter(
      contrato => {

        const coincideNombre =
          !texto ||
          contrato.nombre
            .toLowerCase()
            .includes(texto);

        const coincideEstado =
          this.filtroContratoEstado === 'Todos' ||
          (
            this.filtroContratoEstado === 'Activos' &&
            contrato.activo
          ) ||
          (
            this.filtroContratoEstado === 'Inactivos' &&
            !contrato.activo
          );

        return (
          coincideNombre &&
          coincideEstado
        );

      }
    );

  }


  // =====================================================
  // FILTROS EMPLEADOS
  // =====================================================

  get empleadosFiltrados(): EmpleadoConfiguracion[] {

    const texto =
      this.busquedaEmpleado
        .trim()
        .toLowerCase();

    return this.empleados.filter(
      empleado => {

        const coincideBusqueda =
          !texto ||
          empleado.dni
            .toLowerCase()
            .includes(texto) ||
          empleado.nombres
            .toLowerCase()
            .includes(texto) ||
          empleado.apellidos
            .toLowerCase()
            .includes(texto) ||
          `${empleado.nombres} ${empleado.apellidos}`
            .toLowerCase()
            .includes(texto);

        const coincideDepartamento =
          this.filtroEmpleadoDepartamento === 'Todos' ||
          empleado.departamento ===
          this.filtroEmpleadoDepartamento;

        const coincideEspecialidad =
          this.filtroEmpleadoEspecialidad === 'Todos' ||
          empleado.especialidad ===
          this.filtroEmpleadoEspecialidad;

        const coincideContrato =
          this.filtroEmpleadoContrato === 'Todos' ||
          empleado.contrato ===
          this.filtroEmpleadoContrato;

        const coincideEstado =
          this.filtroEmpleadoEstado === 'Todos' ||
          (
            this.filtroEmpleadoEstado === 'Activos' &&
            empleado.activo
          ) ||
          (
            this.filtroEmpleadoEstado === 'Inactivos' &&
            !empleado.activo
          );

        return (
          coincideBusqueda &&
          coincideDepartamento &&
          coincideEspecialidad &&
          coincideContrato &&
          coincideEstado
        );

      }
    );

  }


  // =====================================================
  // SELECCIÓN FILTROS
  // =====================================================

  seleccionarHorarioSigla(
    valor: string
  ): void {

    this.filtroHorarioSigla =
      valor === 'Todos'
        ? ''
        : valor;

    this.busquedaHorarioSigla =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownHorarioSigla = false;

  }


  seleccionarHorarioSignificado(
    valor: string
  ): void {

    this.filtroHorarioSignificado =
      valor === 'Todos'
        ? ''
        : valor;

    this.busquedaHorarioSignificado =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownHorarioSignificado = false;

  }


  seleccionarHorarioEstado(
    valor: string
  ): void {

    this.filtroHorarioEstado = valor;

    this.busquedaHorarioEstado =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownHorarioEstado = false;

  }


  seleccionarDepartamento(
    valor: string
  ): void {

    this.filtroDepartamento =
      valor === 'Todos'
        ? ''
        : valor;

    this.busquedaDepartamento =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownDepartamento = false;

  }


  seleccionarDepartamentoEstado(
    valor: string
  ): void {

    this.filtroDepartamentoEstado = valor;

    this.busquedaDepartamentoEstado =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownDepartamentoEstado = false;

  }


  seleccionarEspecialidad(
    valor: string
  ): void {

    this.filtroEspecialidad =
      valor === 'Todos'
        ? ''
        : valor;

    this.busquedaEspecialidad =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownEspecialidad = false;

  }


  seleccionarEspecialidadDepartamento(
    valor: string
  ): void {

    this.filtroEspecialidadDepartamento =
      valor;

    this.busquedaEspecialidadDepartamento =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownEspecialidadDepartamento =
      false;

  }


  seleccionarEspecialidadEstado(
    valor: string
  ): void {

    this.filtroEspecialidadEstado = valor;

    this.busquedaEspecialidadEstado =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownEspecialidadEstado = false;

  }


  seleccionarContrato(
    valor: string
  ): void {

    this.filtroContrato =
      valor === 'Todos'
        ? ''
        : valor;

    this.busquedaContrato =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownContrato = false;

  }


  seleccionarContratoEstado(
    valor: string
  ): void {

    this.filtroContratoEstado = valor;

    this.busquedaContratoEstado =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownContratoEstado = false;

  }


  seleccionarEmpleadoDepartamento(
    valor: string
  ): void {

    this.filtroEmpleadoDepartamento =
      valor;

    this.busquedaEmpleadoDepartamento =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownEmpleadoDepartamento =
      false;

  }


  seleccionarEmpleadoEspecialidad(
    valor: string
  ): void {

    this.filtroEmpleadoEspecialidad =
      valor;

    this.busquedaEmpleadoEspecialidad =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownEmpleadoEspecialidad =
      false;

  }


  seleccionarEmpleadoContrato(
    valor: string
  ): void {

    this.filtroEmpleadoContrato =
      valor;

    this.busquedaEmpleadoContrato =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownEmpleadoContrato =
      false;

  }


  seleccionarEmpleadoEstado(
    valor: string
  ): void {

    this.filtroEmpleadoEstado =
      valor;

    this.busquedaEmpleadoEstado =
      valor === 'Todos'
        ? ''
        : valor;

    this.dropdownEmpleadoEstado =
      false;

  }


  // =====================================================
  // SELECCIÓN DE OPCIONES - MODAL EMPLEADO
  // =====================================================

  seleccionarDepartamentoEmpleadoModal(
    valor: string
  ): void {

    this.empleadoFormulario.departamento =
      valor;

    // Al cambiar de departamento, la especialidad anterior
    // puede dejar de ser válida.
    const especialidadValida =
      this.especialidades.some(
        especialidad =>
          especialidad.nombre ===
            this.empleadoFormulario.especialidad &&
          especialidad.departamento === valor
      );

    if (!especialidadValida) {
      this.empleadoFormulario.especialidad = '';
    }

    this.dropdownEmpleadoDepartamentoModal =
      false;

    this.dropdownEmpleadoEspecialidadModal =
      false;

  }


  seleccionarEspecialidadEmpleadoModal(
    valor: string
  ): void {

    this.empleadoFormulario.especialidad =
      valor;

    this.dropdownEmpleadoEspecialidadModal =
      false;

  }


  seleccionarContratoEmpleadoModal(
    valor: string
  ): void {

    this.empleadoFormulario.contrato =
      valor;

    this.dropdownEmpleadoContratoModal =
      false;

  }


  // =====================================================
  // ESTADOS
  // =====================================================

  cambiarEstadoHorario(
    horario: Horario
  ): void {

    horario.activo =
      !horario.activo;

  }


  cambiarEstadoDepartamento(
    departamento: Departamento
  ): void {

    departamento.activo =
      !departamento.activo;

  }


  cambiarEstadoEspecialidad(
    especialidad: Especialidad
  ): void {

    especialidad.activo =
      !especialidad.activo;

  }


  cambiarEstadoContrato(
    contrato: TipoContrato
  ): void {

    contrato.activo =
      !contrato.activo;

  }


  cambiarEstadoEmpleado(
    empleado: EmpleadoConfiguracion
  ): void {

    empleado.activo =
      !empleado.activo;

  }


  // =====================================================
  // NUEVOS OBJETOS
  // =====================================================

  nuevoEmpleado(): EmpleadoConfiguracion {

    return {

      id: 0,

      dni: '',

      nombres: '',

      apellidos: '',

      departamento: '',

      especialidad: '',

      contrato: '',

      telefono: '',

      metaHoras: 150,

      activo: true

    };

  }


  nuevoHorario(): Horario {

    return {

      id: 0,

      sigla: '',

      significado: '',

      horas: 0,

      activo: true

    };

  }


  nuevoDepartamento(): Departamento {

    return {

      id: 0,

      nombre: '',

      activo: true

    };

  }


  nuevaEspecialidad(): Especialidad {

    return {

      id: 0,

      nombre: '',

      departamento: '',

      activo: true

    };

  }


  nuevoContrato(): TipoContrato {

    return {

      id: 0,

      nombre: '',

      activo: true

    };

  }


  // =====================================================
  // EMPLEADOS
  // =====================================================

  abrirAgregarEmpleado(): void {

    this.modoEdicion = false;

    this.empleadoFormulario =
      this.nuevoEmpleado();

    this.dropdownEmpleadoDepartamentoModal = false;
    this.dropdownEmpleadoEspecialidadModal = false;
    this.dropdownEmpleadoContratoModal = false;

    this.mostrarModalEmpleado = true;

  }


  editarEmpleado(
    empleado: EmpleadoConfiguracion
  ): void {

    this.modoEdicion = true;

    this.empleadoFormulario = {

      ...empleado,

      metaHoras: 150

    };

    this.dropdownEmpleadoDepartamentoModal = false;
    this.dropdownEmpleadoEspecialidadModal = false;
    this.dropdownEmpleadoContratoModal = false;

    this.mostrarModalEmpleado = true;

  }


  guardarEmpleado(): void {

    if (
      !this.empleadoFormulario.dni ||
      !this.empleadoFormulario.nombres ||
      !this.empleadoFormulario.apellidos ||
      !this.empleadoFormulario.departamento ||
      !this.empleadoFormulario.especialidad ||
      !this.empleadoFormulario.contrato
    ) {

      alert(
        'Completa los campos obligatorios del empleado.'
      );

      return;

    }

    const departamentoValido =
      this.departamentos.some(
        item =>
          item.nombre ===
          this.empleadoFormulario.departamento
      );

    const especialidadValida =
      this.especialidades.some(
        item =>
          item.nombre ===
            this.empleadoFormulario.especialidad &&
          item.departamento ===
            this.empleadoFormulario.departamento
      );

    const contratoValido =
      this.tiposContrato.some(
        item =>
          item.nombre ===
          this.empleadoFormulario.contrato
      );

    if (!departamentoValido || !especialidadValida || !contratoValido) {

      alert(
        'Selecciona una opción válida de departamento, especialidad y tipo de contrato.'
      );

      return;

    }


    if (this.modoEdicion) {

      const indice =
        this.empleados.findIndex(
          item =>
            item.id ===
            this.empleadoFormulario.id
        );

      if (indice !== -1) {

        this.empleados[indice] = {

          ...this.empleadoFormulario,

          metaHoras: 150

        };

      }

    } else {

      const nuevoId =
        this.obtenerNuevoId(
          this.empleados
        );

      this.empleados.push({

        ...this.empleadoFormulario,

        id: nuevoId,

        metaHoras: 150

      });

    }

    this.cerrarModalEmpleado();

  }


  eliminarEmpleado(
    empleado: EmpleadoConfiguracion
  ): void {

    const confirmar =
      confirm(
        `¿Deseas eliminar a ${empleado.nombres} ${empleado.apellidos}?`
      );

    if (!confirmar) {
      return;
    }

    this.empleados =
      this.empleados.filter(
        item =>
          item.id !== empleado.id
      );

  }


  cerrarModalEmpleado(): void {

    this.mostrarModalEmpleado =
      false;

    this.empleadoFormulario =
      this.nuevoEmpleado();

    this.dropdownEmpleadoDepartamentoModal = false;
    this.dropdownEmpleadoEspecialidadModal = false;
    this.dropdownEmpleadoContratoModal = false;

    this.modoEdicion = false;

  }


  // =====================================================
  // HORARIOS
  // =====================================================

  abrirAgregarHorario(): void {

    this.modoEdicion = false;

    this.horarioFormulario =
      this.nuevoHorario();

    this.mostrarModalHorario = true;

  }


  editarHorario(
    horario: Horario
  ): void {

    this.modoEdicion = true;

    this.horarioFormulario = {

      ...horario

    };

    this.mostrarModalHorario = true;

  }


  guardarHorario(): void {

    if (
      !this.horarioFormulario.sigla ||
      !this.horarioFormulario.significado ||
      this.horarioFormulario.horas <= 0
    ) {

      alert(
        'Completa los datos del horario.'
      );

      return;

    }


    if (this.modoEdicion) {

      const indice =
        this.horarios.findIndex(
          item =>
            item.id ===
            this.horarioFormulario.id
        );

      if (indice !== -1) {

        this.horarios[indice] = {

          ...this.horarioFormulario

        };

      }

    } else {

      this.horarios.push({

        ...this.horarioFormulario,

        id: this.obtenerNuevoId(
          this.horarios
        )

      });

    }

    this.cerrarModalHorario();

  }


  eliminarHorario(
    horario: Horario
  ): void {

    if (
      !confirm(
        `¿Deseas eliminar el horario "${horario.significado}"?`
      )
    ) {

      return;

    }

    this.horarios =
      this.horarios.filter(
        item =>
          item.id !== horario.id
      );

  }


  cerrarModalHorario(): void {

    this.mostrarModalHorario =
      false;

    this.horarioFormulario =
      this.nuevoHorario();

    this.modoEdicion = false;

  }


  // =====================================================
  // DEPARTAMENTOS
  // =====================================================

  abrirAgregarDepartamento(): void {

    this.modoEdicion = false;

    this.departamentoFormulario =
      this.nuevoDepartamento();

    this.mostrarModalDepartamento =
      true;

  }


  editarDepartamento(
    departamento: Departamento
  ): void {

    this.modoEdicion = true;

    this.departamentoFormulario = {

      ...departamento

    };

    this.mostrarModalDepartamento =
      true;

  }


  guardarDepartamento(): void {

    if (
      !this.departamentoFormulario.nombre
    ) {

      alert(
        'Ingresa el nombre del departamento.'
      );

      return;

    }


    if (this.modoEdicion) {

      const indice =
        this.departamentos.findIndex(
          item =>
            item.id ===
            this.departamentoFormulario.id
        );

      if (indice !== -1) {

        this.departamentos[indice] = {

          ...this.departamentoFormulario

        };

      }

    } else {

      this.departamentos.push({

        ...this.departamentoFormulario,

        id: this.obtenerNuevoId(
          this.departamentos
        )

      });

    }

    this.cerrarModalDepartamento();

  }


  eliminarDepartamento(
    departamento: Departamento
  ): void {

    if (
      !confirm(
        `¿Deseas eliminar "${departamento.nombre}"?`
      )
    ) {

      return;

    }

    this.departamentos =
      this.departamentos.filter(
        item =>
          item.id !== departamento.id
      );

  }


  cerrarModalDepartamento(): void {

    this.mostrarModalDepartamento =
      false;

    this.departamentoFormulario =
      this.nuevoDepartamento();

    this.modoEdicion = false;

  }


  // =====================================================
  // ESPECIALIDADES
  // =====================================================

  abrirAgregarEspecialidad(): void {

    this.modoEdicion = false;

    this.especialidadFormulario =
      this.nuevaEspecialidad();

    this.mostrarModalEspecialidad =
      true;

  }


  editarEspecialidad(
    especialidad: Especialidad
  ): void {

    this.modoEdicion = true;

    this.especialidadFormulario = {

      ...especialidad

    };

    this.mostrarModalEspecialidad =
      true;

  }


  guardarEspecialidad(): void {

    if (
      !this.especialidadFormulario.nombre ||
      !this.especialidadFormulario.departamento
    ) {

      alert(
        'Completa los datos de la especialidad.'
      );

      return;

    }


    if (this.modoEdicion) {

      const indice =
        this.especialidades.findIndex(
          item =>
            item.id ===
            this.especialidadFormulario.id
        );

      if (indice !== -1) {

        this.especialidades[indice] = {

          ...this.especialidadFormulario

        };

      }

    } else {

      this.especialidades.push({

        ...this.especialidadFormulario,

        id: this.obtenerNuevoId(
          this.especialidades
        )

      });

    }

    this.cerrarModalEspecialidad();

  }


  eliminarEspecialidad(
    especialidad: Especialidad
  ): void {

    if (
      !confirm(
        `¿Deseas eliminar "${especialidad.nombre}"?`
      )
    ) {

      return;

    }

    this.especialidades =
      this.especialidades.filter(
        item =>
          item.id !== especialidad.id
      );

  }


  cerrarModalEspecialidad(): void {

    this.mostrarModalEspecialidad =
      false;

    this.especialidadFormulario =
      this.nuevaEspecialidad();

    this.modoEdicion = false;

  }


  // =====================================================
  // CONTRATOS
  // =====================================================

  abrirAgregarContrato(): void {

    this.modoEdicion = false;

    this.contratoFormulario =
      this.nuevoContrato();

    this.mostrarModalContrato =
      true;

  }


  editarContrato(
    contrato: TipoContrato
  ): void {

    this.modoEdicion = true;

    this.contratoFormulario = {

      ...contrato

    };

    this.mostrarModalContrato =
      true;

  }


  guardarContrato(): void {

    if (
      !this.contratoFormulario.nombre
    ) {

      alert(
        'Ingresa el tipo de contrato.'
      );

      return;

    }


    if (this.modoEdicion) {

      const indice =
        this.tiposContrato.findIndex(
          item =>
            item.id ===
            this.contratoFormulario.id
        );

      if (indice !== -1) {

        this.tiposContrato[indice] = {

          ...this.contratoFormulario

        };

      }

    } else {

      this.tiposContrato.push({

        ...this.contratoFormulario,

        id: this.obtenerNuevoId(
          this.tiposContrato
        )

      });

    }

    this.cerrarModalContrato();

  }


  eliminarContrato(
    contrato: TipoContrato
  ): void {

    if (
      !confirm(
        `¿Deseas eliminar "${contrato.nombre}"?`
      )
    ) {

      return;

    }

    this.tiposContrato =
      this.tiposContrato.filter(
        item =>
          item.id !== contrato.id
      );

  }


  cerrarModalContrato(): void {

    this.mostrarModalContrato =
      false;

    this.contratoFormulario =
      this.nuevoContrato();

    this.modoEdicion = false;

  }


  // =====================================================
  // UTILIDADES
  // =====================================================

  private obtenerNuevoId<T extends { id: number }>(
    lista: T[]
  ): number {

    if (lista.length === 0) {

      return 1;

    }

    return Math.max(
      ...lista.map(
        item => item.id
      )
    ) + 1;

  }


  // =====================================================
  // CERRAR DROPDOWNS
  // =====================================================

  cerrarTodosLosDropdowns(): void {

    this.dropdownHorarioSigla = false;
    this.dropdownHorarioSignificado = false;
    this.dropdownHorarioEstado = false;

    this.dropdownDepartamento = false;
    this.dropdownDepartamentoEstado = false;

    this.dropdownEspecialidad = false;
    this.dropdownEspecialidadDepartamento = false;
    this.dropdownEspecialidadEstado = false;

    this.dropdownContrato = false;
    this.dropdownContratoEstado = false;

    this.dropdownEmpleadoDepartamento = false;
    this.dropdownEmpleadoEspecialidad = false;
    this.dropdownEmpleadoContrato = false;
    this.dropdownEmpleadoEstado = false;

    this.dropdownEmpleadoDepartamentoModal = false;
    this.dropdownEmpleadoEspecialidadModal = false;
    this.dropdownEmpleadoContratoModal = false;

  }


  // =====================================================
  // LIMPIAR FILTROS
  // =====================================================

  limpiarFiltrosHorarios(): void {

    this.busquedaHorarioSigla = '';
    this.busquedaHorarioSignificado = '';
    this.busquedaHorarioEstado = '';

    this.filtroHorarioSigla = '';
    this.filtroHorarioSignificado = '';
    this.filtroHorarioEstado = 'Todos';

    this.cerrarTodosLosDropdowns();

  }


  limpiarFiltrosDepartamentos(): void {

    this.busquedaDepartamento = '';
    this.busquedaDepartamentoEstado = '';

    this.filtroDepartamento = '';
    this.filtroDepartamentoEstado = 'Todos';

    this.cerrarTodosLosDropdowns();

  }


  limpiarFiltrosEspecialidades(): void {

    this.busquedaEspecialidad = '';
    this.busquedaEspecialidadDepartamento = '';
    this.busquedaEspecialidadEstado = '';

    this.filtroEspecialidad = '';
    this.filtroEspecialidadDepartamento = 'Todos';
    this.filtroEspecialidadEstado = 'Todos';

    this.cerrarTodosLosDropdowns();

  }


  limpiarFiltrosContratos(): void {

    this.busquedaContrato = '';
    this.busquedaContratoEstado = '';

    this.filtroContrato = '';
    this.filtroContratoEstado = 'Todos';

    this.cerrarTodosLosDropdowns();

  }


  limpiarFiltrosEmpleados(): void {

    this.busquedaEmpleado = '';
    this.busquedaEmpleadoDepartamento = '';
    this.busquedaEmpleadoEspecialidad = '';
    this.busquedaEmpleadoContrato = '';
    this.busquedaEmpleadoEstado = '';

    this.filtroEmpleadoDepartamento = 'Todos';
    this.filtroEmpleadoEspecialidad = 'Todos';
    this.filtroEmpleadoContrato = 'Todos';
    this.filtroEmpleadoEstado = 'Todos';

    this.cerrarTodosLosDropdowns();

  }

}
