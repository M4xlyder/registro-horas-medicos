import {
  Component,
  HostBinding,
  HostListener,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  HorariosService,
  HorarioMedicoBackend
} from '../core/services/horarios.service';


/* =========================================================
   MODELOS
   ========================================================= */

interface Personal {

  id: number;

  nombres: string;

  apellidos: string;

  especialidad: string;

  activo: boolean;

  iniciales: string;

}


interface Turno {

  id: number;

  siglas: string;

  nombre: string;

  observacion: string;

  duracion: number;

  color: string;

}


interface ProgramacionData {

  id: string;

  personalId: number;

  fecha: string;

  turnoId: number;

  turnoBaseId: number;

  tipo: 'ORIGINAL' | 'VARIANTE';

  siglas: string;

  nombreTurno: string;

  duracion: number;

  observacion: string;

  justificacion: string;

  archivoNombre: string;

  archivoUrl: string;

}


/* =========================================================
   COMPONENTE
   ========================================================= */

@Component({

  selector: 'app-programacion',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './programacion.html',

  styleUrl: './programacion.css'

})
export class ProgramacionComponent
  implements OnInit {


  /* =======================================================
     CAPA DEL COMPONENTE CUANDO HAY MODAL
     ======================================================= */

  /*
    IMPORTANTE:

    El layout principal tiene un .page-content
    con z-index propio.

    Cuando abrimos un modal elevamos solamente
    este componente por encima del topbar.

    Cuando no hay modal, vuelve a su posición normal.
  */

  @HostBinding('class.modal-open')
  get modalOpen(): boolean {

    return (
      this.mostrarModal ||
      this.mostrarModalModificar
    );

  }


  /* =======================================================
     CERRAR MENÚ AL HACER CLICK FUERA
     ======================================================= */

  @HostListener(
    'document:click',
    ['$event']
  )
  cerrarMenuAlHacerClickFuera(
    event: MouseEvent
  ): void {

    const target =
      event.target as HTMLElement;

    if (
      this.mostrarMenuContextual &&
      !target.closest('.context-menu')
    ) {

      this.cerrarMenuContextual();

    }

  }


  /* =======================================================
     CERRAR MENÚ CON ESC
     ======================================================= */

  @HostListener(
    'document:keydown.escape'
  )
  cerrarMenuConEscape(): void {

    if (
      this.mostrarMenuContextual
    ) {

      this.cerrarMenuContextual();

      return;

    }

    if (
      this.mostrarModal
    ) {

      this.cerrarModal();

      return;

    }

    if (
      this.mostrarModalModificar
    ) {

      this.cerrarModalModificar();

    }

  }


  /* =======================================================
     CONFIGURACIÓN
     ======================================================= */

  readonly MAX_FILE_SIZE =
    7 * 1024 * 1024;


  /* =======================================================
     PERSONAL
     ======================================================= */

  personal: Personal[] = [

    {
      id: 1,
      nombres: 'Marcelo',
      apellidos: 'Ubia Alzamora',
      especialidad: 'Cirugía General',
      activo: true,
      iniciales: 'MU'
    },

    {
      id: 2,
      nombres: 'Juan',
      apellidos: 'García',
      especialidad: 'Cirugía Pediátrica',
      activo: true,
      iniciales: 'JG'
    },

    {
      id: 3,
      nombres: 'Carlos',
      apellidos: 'Zafra',
      especialidad: 'Anestesiología',
      activo: true,
      iniciales: 'CZ'
    },

    {
      id: 4,
      nombres: 'Ambar',
      apellidos: 'Barriga',
      especialidad: 'Ginecología',
      activo: true,
      iniciales: 'AB'
    },

    {
      id: 5,
      nombres: 'Kian',
      apellidos: 'Okuhama',
      especialidad: 'Medicina Interna',
      activo: true,
      iniciales: 'KO'
    }

  ];


  personalSeleccionado:
    Personal | null =
      this.personal[0];


  buscarPersonal = '';

  mostrarActivos = true;


  /* =======================================================
     FILTROS
     ======================================================= */

  departamentoSeleccionado = '';

  especialidadSeleccionada = '';


  departamentos: string[] = [

    'Medicina',

    'Cirugía',

    'Pediatría',

    'Ginecología',

    'Emergencia'

  ];


  especialidades: string[] = [

    'Cirugía General',

    'Cirugía Pediátrica',

    'Anestesiología',

    'Ginecología',

    'Medicina Interna'

  ];


  /* =======================================================
     CALENDARIO
     ======================================================= */

  fechaActual = new Date(
    2026,
    7,
    26
  );


  diasSemana: string[] = [

    'DOM',
    'LUN',
    'MAR',
    'MIÉ',
    'JUE',
    'VIE',
    'SÁB'

  ];


  diasCalendario: Date[] = [];


  /* =======================================================
     SELECCIÓN
     ======================================================= */

  fechasSeleccionadas: string[] = [];


  /* =======================================================
     TURNOS
     ======================================================= */

  turnos: Turno[] = [

    {
      id: 1,
      siglas: 'GD',
      nombre: 'Guardia Diurna',
      observacion: 'Turno diurno',
      duracion: 12,
      color: 'verde'
    },

    {
      id: 2,
      siglas: 'GN',
      nombre: 'Guardia Nocturna',
      observacion: 'Turno nocturno',
      duracion: 12,
      color: 'azul'
    },

    {
      id: 3,
      siglas: 'TD',
      nombre: 'Turno Día',
      observacion: 'Turno día',
      duracion: 12,
      color: 'celeste'
    },

    {
      id: 4,
      siglas: 'TN',
      nombre: 'Turno Noche',
      observacion: 'Turno noche',
      duracion: 12,
      color: 'turquesa'
    },

    {
      id: 5,
      siglas: 'M',
      nombre: 'Mañana',
      observacion: 'Turno mañana',
      duracion: 6,
      color: 'amarillo'
    },

    {
      id: 6,
      siglas: 'T',
      nombre: 'Tarde',
      observacion: 'Turno tarde',
      duracion: 6,
      color: 'rojo'
    }

  ];


  /* =======================================================
     PROGRAMACIONES
     ======================================================= */

  programaciones:
    ProgramacionData[] = [];


  /* =======================================================
     MODALES
     ======================================================= */

  mostrarModal = false;

  mostrarModalModificar = false;


  /* =======================================================
     FORMULARIO
     ======================================================= */

  turnoSeleccionadoId = 1;

  observacion = '';

  justificacion = '';

  duracionPersonalizada = 12;

  usarDuracionPersonalizada = false;


  /* =======================================================
     EDICIÓN
     ======================================================= */

  programacionesEditando:
    ProgramacionData[] = [];


  /* =======================================================
     ARCHIVO
     ======================================================= */

  archivoSeleccionado:
    File | null = null;

  archivoNombre = '';

  archivoUrl = '';


  /* =======================================================
     MENÚ CONTEXTUAL
     ======================================================= */

  mostrarMenuContextual = false;

  menuX = 0;

  menuY = 0;

  programacionContextual:
    ProgramacionData | null = null;

  fechaContextual:
    string | null = null;


  /* =======================================================
     CONSTRUCTOR
     ======================================================= */

  constructor(
    private readonly horariosService:
      HorariosService
  ) {}


  /* =======================================================
     INIT
     ======================================================= */

  ngOnInit(): void {

    this.generarCalendario();

    this.cargarHorariosBackend();

  }


  /* =======================================================
     CARGAR HORARIOS
     ======================================================= */

  private cargarHorariosBackend(): void {

    this.horariosService
      .obtenerTodos()
      .subscribe({

        next: (
          horarios:
            HorarioMedicoBackend[]
        ) => {

          this.programaciones =
            horarios.map(
              horario =>
                this.convertirHorarioBackend(
                  horario
                )
            );

          console.log(
            'Horarios cargados desde PostgreSQL:',
            this.programaciones
          );

        },

        error: (error) => {

          console.error(
            'Error al cargar horarios:',
            error
          );

        }

      });

  }


  /* =======================================================
     CONVERTIR BACKEND → FRONTEND
     ======================================================= */

  private convertirHorarioBackend(
    horario:
      HorarioMedicoBackend
  ): ProgramacionData {

    const duracion =
      this.calcularDuracion(
        horario.horaInicio,
        horario.horaFin
      );


    const turno =
      this.obtenerTurnoPorHorario(
        horario.horaInicio,
        horario.horaFin,
        duracion
      );


    return {

      id:
        String(horario.id),

      personalId:
        horario.empleado.id,

      fecha:
        horario.fecha,

      turnoId:
        turno.id,

      turnoBaseId:
        turno.id,

      tipo:
        'ORIGINAL',

      siglas:
        turno.siglas,

      nombreTurno:
        turno.nombre,

      duracion,

      observacion:
        turno.observacion,

      justificacion:
        '',

      archivoNombre:
        '',

      archivoUrl:
        ''

    };

  }


  /* =======================================================
     IDENTIFICAR TURNO
     ======================================================= */

  private obtenerTurnoPorHorario(
    horaInicio: string,
    horaFin: string,
    duracion: number
  ): Turno {

    const inicio =
      horaInicio.substring(
        0,
        5
      );

    const fin =
      horaFin.substring(
        0,
        5
      );


    if (
      inicio === '08:00' &&
      fin === '20:00'
    ) {

      return this.turnos[0];

    }


    if (
      inicio === '20:00' &&
      fin === '08:00'
    ) {

      return this.turnos[1];

    }


    if (
      inicio === '08:00' &&
      fin === '14:00'
    ) {

      return this.turnos[4];

    }


    if (
      inicio === '14:00' &&
      fin === '20:00'
    ) {

      return this.turnos[5];

    }


    const encontrado =
      this.turnos.find(
        turno =>
          turno.duracion ===
          duracion
      );


    return (
      encontrado ??
      this.turnos[0]
    );

  }


  /* =======================================================
     CALCULAR DURACIÓN
     ======================================================= */

  private calcularDuracion(
    horaInicio: string,
    horaFin: string
  ): number {

    const inicioPartes =
      horaInicio
        .substring(0, 5)
        .split(':')
        .map(Number);


    const finPartes =
      horaFin
        .substring(0, 5)
        .split(':')
        .map(Number);


    const inicio =
      inicioPartes[0] * 60 +
      inicioPartes[1];


    let fin =
      finPartes[0] * 60 +
      finPartes[1];


    if (
      fin <= inicio
    ) {

      fin +=
        24 * 60;

    }


    return (
      fin - inicio
    ) / 60;

  }


  /* =======================================================
     GENERAR ID
     ======================================================= */

  generateId(): string {

    if (
      typeof crypto !== 'undefined' &&
      typeof crypto.randomUUID === 'function'
    ) {

      return crypto.randomUUID();

    }


    return (
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substring(2)
    );

  }


  /* =======================================================
     CALENDARIO
     ======================================================= */

  generarCalendario(): void {

    const year =
      this.fechaActual.getFullYear();

    const month =
      this.fechaActual.getMonth();


    const primerDia =
      new Date(
        year,
        month,
        1
      );


    const ultimoDia =
      new Date(
        year,
        month + 1,
        0
      );


    const primerDiaSemana =
      primerDia.getDay();


    const diasMes =
      ultimoDia.getDate();


    const diasMesAnterior =
      new Date(
        year,
        month,
        0
      ).getDate();


    this.diasCalendario = [];


    for (
      let i =
        primerDiaSemana - 1;

      i >= 0;

      i--
    ) {

      this.diasCalendario.push(

        new Date(
          year,
          month - 1,
          diasMesAnterior - i
        )

      );

    }


    for (
      let dia = 1;

      dia <= diasMes;

      dia++
    ) {

      this.diasCalendario.push(

        new Date(
          year,
          month,
          dia
        )

      );

    }


    let siguiente = 1;


    while (
      this.diasCalendario.length <
      42
    ) {

      this.diasCalendario.push(

        new Date(
          year,
          month + 1,
          siguiente++
        )

      );

    }

  }


  /* =======================================================
     NOMBRE DEL MES
     ======================================================= */

  get nombreMes(): string {

    return this.fechaActual
      .toLocaleDateString(
        'es-PE',
        {
          month: 'long',
          year: 'numeric'
        }
      );

  }


  /* =======================================================
     CAMBIAR MES
     ======================================================= */

  mesAnterior(): void {

    this.fechaActual =
      new Date(
        this.fechaActual.getFullYear(),
        this.fechaActual.getMonth() - 1,
        1
      );

    this.generarCalendario();

    this.limpiarSeleccion();

    this.cerrarMenuContextual();

  }


  mesSiguiente(): void {

    this.fechaActual =
      new Date(
        this.fechaActual.getFullYear(),
        this.fechaActual.getMonth() + 1,
        1
      );

    this.generarCalendario();

    this.limpiarSeleccion();

    this.cerrarMenuContextual();

  }


  irHoy(): void {

    this.fechaActual =
      new Date();

    this.generarCalendario();

    this.limpiarSeleccion();

    this.cerrarMenuContextual();

  }


  /* =======================================================
     FECHA KEY
     ======================================================= */

  fechaKey(
    fecha: Date
  ): string {

    const year =
      fecha.getFullYear();

    const month =
      String(
        fecha.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        fecha.getDate()
      ).padStart(2, '0');


    return `${year}-${month}-${day}`;

  }


  /* =======================================================
     MES ACTUAL
     ======================================================= */

  esMesActual(
    fecha: Date
  ): boolean {

    return (

      fecha.getMonth() ===
      this.fechaActual.getMonth()

      &&

      fecha.getFullYear() ===
      this.fechaActual.getFullYear()

    );

  }


  /* =======================================================
     HOY
     ======================================================= */

  esHoy(
    fecha: Date
  ): boolean {

    const hoy =
      new Date();

    return (

      fecha.getDate() ===
      hoy.getDate()

      &&

      fecha.getMonth() ===
      hoy.getMonth()

      &&

      fecha.getFullYear() ===
      hoy.getFullYear()

    );

  }


  /* =======================================================
     SELECCIONAR DÍA
     ======================================================= */

  seleccionarDia(
    fecha: Date,
    event?: MouseEvent
  ): void {

    if (event) {

      event.preventDefault();

    }


    this.cerrarMenuContextual();


    const key =
      this.fechaKey(fecha);


    const index =
      this.fechasSeleccionadas.indexOf(
        key
      );


    if (index >= 0) {

      this.fechasSeleccionadas.splice(
        index,
        1
      );

    } else {

      this.fechasSeleccionadas.push(
        key
      );

    }

  }


  /* =======================================================
     COMPROBAR SELECCIÓN
     ======================================================= */

  estaSeleccionado(
    fecha: Date
  ): boolean {

    return this.fechasSeleccionadas
      .includes(
        this.fechaKey(fecha)
      );

  }


  /* =======================================================
     LIMPIAR SELECCIÓN
     ======================================================= */

  limpiarSeleccion(): void {

    this.fechasSeleccionadas = [];

  }


  /* =======================================================
     PERSONAL
     ======================================================= */

  seleccionarPersonal(
    persona: Personal
  ): void {

    this.personalSeleccionado =
      persona;

    this.limpiarSeleccion();

    this.cargarHorariosEmpleado(
      persona.id
    );

  }


  /* =======================================================
     CARGAR HORARIOS DEL EMPLEADO
     ======================================================= */

  private cargarHorariosEmpleado(
    empleadoId: number
  ): void {

    this.horariosService
      .obtenerPorEmpleado(
        empleadoId
      )
      .subscribe({

        next: (
          horarios:
            HorarioMedicoBackend[]
        ) => {

          this.programaciones =
            horarios.map(
              horario =>
                this.convertirHorarioBackend(
                  horario
                )
            );

        },

        error: (error) => {

          console.error(
            'Error al cargar horarios:',
            error
          );

        }

      });

  }


  /* =======================================================
     PERSONAL FILTRADO
     ======================================================= */

  get personalFiltrado(): Personal[] {

    return this.personal.filter(
      persona => {

        const activoCorrecto =
          !this.mostrarActivos ||
          persona.activo;


        const texto =
          this.buscarPersonal
            .toLowerCase()
            .trim();


        const nombre =
          `${persona.nombres} ${persona.apellidos}`
            .toLowerCase();


        return (

          activoCorrecto

          &&

          (
            texto === ''

            ||

            nombre.includes(
              texto
            )

            ||

            persona.especialidad
              .toLowerCase()
              .includes(
                texto
              )

          )

        );

      }
    );

  }


  /* =======================================================
     TURNO SELECCIONADO
     ======================================================= */

  get turnoSeleccionado():
    Turno | undefined {

    return this.turnos.find(
      turno =>
        turno.id ===
        Number(
          this.turnoSeleccionadoId
        )
    );

  }


  cambioTurno(): void {

    const turno =
      this.turnoSeleccionado;


    if (!turno) {

      return;

    }


    if (
      !this.usarDuracionPersonalizada
    ) {

      this.duracionPersonalizada =
        turno.duracion;

    }

  }


  /* =======================================================
     ABRIR MODAL REGISTRO
     ======================================================= */

  abrirModalRegistro(): void {

    if (!this.personalSeleccionado) {

      alert(
        'Seleccione un personal antes de registrar un turno.'
      );

      return;

    }


    if (
      this.fechasSeleccionadas.length === 0
    ) {

      alert(
        'Seleccione al menos un día del calendario.'
      );

      return;

    }


    this.cerrarMenuContextual();


    this.mostrarModal =
      true;


    this.turnoSeleccionadoId =
      1;


    this.observacion =
      '';


    this.justificacion =
      '';


    this.usarDuracionPersonalizada =
      false;


    this.duracionPersonalizada =
      this.turnos[0].duracion;


    this.limpiarArchivo();

  }


  /* =======================================================
     CERRAR MODAL REGISTRO
     ======================================================= */

  cerrarModal(): void {

    this.mostrarModal =
      false;

    this.limpiarArchivo();

  }


  /* =======================================================
     GUARDAR PROGRAMACIÓN
     ======================================================= */

  guardarProgramacion(): void {

    if (!this.personalSeleccionado) {

      alert(
        'Seleccione un personal.'
      );

      return;

    }


    if (
      this.fechasSeleccionadas.length === 0
    ) {

      alert(
        'Seleccione al menos una fecha.'
      );

      return;

    }


    const turno =
      this.turnoSeleccionado;


    if (!turno) {

      alert(
        'Seleccione un turno.'
      );

      return;

    }


    const duracion =
      this.usarDuracionPersonalizada

        ? Number(
            this.duracionPersonalizada
          )

        : turno.duracion;


    if (
      !duracion ||
      duracion <= 0 ||
      duracion > 24
    ) {

      alert(
        'La duración debe estar entre 1 y 24 horas.'
      );

      return;

    }


    const horas =
      this.obtenerHorasTurno(
        turno,
        duracion
      );


    this.horariosService
      .crearMultiple({

        empleadoId:
          this.personalSeleccionado.id,

        fechas:
          [...this.fechasSeleccionadas],

        horaInicio:
          horas.horaInicio,

        horaFin:
          horas.horaFin,

        activo:
          true

      })
      .subscribe({

        next: (
          horarios
        ) => {

          const nuevasProgramaciones =
            horarios.map(
              horario =>
                this.convertirHorarioBackend(
                  horario
                )
            );


          this.programaciones.push(
            ...nuevasProgramaciones
          );


          this.cerrarModal();

          this.limpiarSeleccion();


          alert(
            `${horarios.length} programación(es) registrada(s) correctamente.`
          );

        },


        error: (error) => {

          console.error(
            'Error al guardar horario:',
            error
          );


          const mensaje =
            error?.error?.message ??
            'No se pudo registrar el horario.';


          alert(mensaje);

        }

      });

  }


  /* =======================================================
     OBTENER HORAS
     ======================================================= */

  private obtenerHorasTurno(
    turno: Turno,
    duracion: number
  ): {
    horaInicio: string;
    horaFin: string;
  } {

    let horaInicio =
      '08:00';


    if (
      turno.siglas === 'GN' ||
      turno.siglas === 'TN'
    ) {

      horaInicio =
        '20:00';

    }


    if (
      turno.siglas === 'T'
    ) {

      horaInicio =
        '14:00';

    }


    if (
      turno.siglas === 'M'
    ) {

      horaInicio =
        '08:00';

    }


    const [
      inicioHora,
      inicioMinuto
    ] =
      horaInicio
        .split(':')
        .map(Number);


    let finMinutos =
      inicioHora * 60 +
      inicioMinuto +
      duracion * 60;


    if (
      finMinutos >=
      24 * 60
    ) {

      finMinutos -=
        24 * 60;

    }


    const horaFin =
      `${String(
        Math.floor(
          finMinutos / 60
        )
      ).padStart(2, '0')}:${String(
        finMinutos % 60
      ).padStart(2, '0')}`;


    return {

      horaInicio,

      horaFin

    };

  }


  /* =======================================================
     GENERAR ID DE VARIANTE
     ======================================================= */

  private generarIdTurnoVariante(): number {

    const ids =
      this.programaciones
        .map(
          programacion =>
            programacion.turnoId
        )
        .filter(
          id =>
            id > 100
        );


    if (
      ids.length === 0
    ) {

      return 1001;

    }


    return (
      Math.max(...ids) + 1
    );

  }


  /* =======================================================
     PROGRAMACIONES DEL DÍA
     ======================================================= */

  getProgramaciones(
    fecha: Date
  ): ProgramacionData[] {

    if (
      !this.personalSeleccionado
    ) {

      return [];

    }


    const key =
      this.fechaKey(fecha);


    return this.programaciones.filter(
      programacion =>

        programacion.personalId ===
        this.personalSeleccionado!.id

        &&

        programacion.fecha ===
        key

    );

  }


  /* =======================================================
     OBTENER PROGRAMACIÓN CONTEXTUAL
     ======================================================= */

  obtenerProgramacionContextual(
    fecha: Date
  ): ProgramacionData | undefined {

    if (
      !this.personalSeleccionado
    ) {

      return undefined;

    }


    const key =
      this.fechaKey(fecha);


    return this.programaciones.find(
      programacion =>

        programacion.personalId ===
        this.personalSeleccionado!.id

        &&

        programacion.fecha ===
        key

    );

  }


  /* =======================================================
     COLOR DEL TURNO
     ======================================================= */

  obtenerClaseTurno(
    programacion: ProgramacionData
  ): string {

    const turno =
      this.turnos.find(
        t =>
          t.id ===
          programacion.turnoBaseId
      );


    if (!turno) {

      return 'turno-default';

    }


    return `turno-${turno.color}`;

  }


  /* =======================================================
     MODIFICAR TURNO
     ======================================================= */

  modificarTurno(
    programacion?: ProgramacionData
  ): void {

    let registros:
      ProgramacionData[] = [];


    if (programacion) {

      registros = [
        programacion
      ];

    } else {

      registros =
        this.obtenerProgramacionesSeleccionadas();

    }


    if (
      registros.length === 0
    ) {

      alert(
        'Seleccione un turno para modificar.'
      );

      return;

    }


    this.cerrarMenuContextual();


    this.programacionesEditando =
      registros;


    const primero =
      registros[0];


    this.turnoSeleccionadoId =
      primero.turnoBaseId;


    this.observacion =
      primero.observacion;


    this.justificacion =
      primero.justificacion;


    this.duracionPersonalizada =
      primero.duracion;


    const turnoBase =
      this.turnos.find(
        turno =>
          turno.id ===
          primero.turnoBaseId
      );


    this.usarDuracionPersonalizada =
      !!turnoBase &&
      primero.duracion !==
      turnoBase.duracion;


    this.archivoNombre =
      primero.archivoNombre;


    this.archivoUrl =
      primero.archivoUrl;


    this.mostrarModalModificar =
      true;

  }


  /* =======================================================
     GUARDAR CAMBIOS
     ======================================================= */

  guardarCambios(): void {

    /*
      El PATCH del backend se implementará
      en el siguiente paso.

      Por ahora mantenemos la edición
      preparada sin modificar la base.
    */

    if (
      this.programacionesEditando.length === 0
    ) {

      return;

    }


    const turno =
      this.turnoSeleccionado;


    if (!turno) {

      alert(
        'Seleccione un turno.'
      );

      return;

    }


    const duracion =
      this.usarDuracionPersonalizada
        ? Number(this.duracionPersonalizada)
        : turno.duracion;


    if (
      !duracion ||
      duracion <= 0 ||
      duracion > 24
    ) {

      alert(
        'La duración debe estar entre 1 y 24 horas.'
      );

      return;

    }


    /*
      Actualización local del frontend.
    */

    for (
      const registro of
      this.programacionesEditando
    ) {

      const indice =
        this.programaciones.findIndex(
          p =>
            p.id ===
            registro.id
        );


      if (
        indice === -1
      ) {

        continue;

      }


      this.programaciones[indice] = {

        ...this.programaciones[indice],

        turnoId:
          turno.id,

        turnoBaseId:
          turno.id,

        tipo:
          'ORIGINAL',

        siglas:
          turno.siglas,

        nombreTurno:
          turno.nombre,

        duracion,

        observacion:
          this.observacion,

        justificacion:
          this.justificacion,

        archivoNombre:
          this.archivoNombre,

        archivoUrl:
          this.archivoUrl

      };

    }


    this.cerrarModalModificar();

  }


  /* =======================================================
     CERRAR MODAL MODIFICAR
     ======================================================= */

  cerrarModalModificar(): void {

    this.mostrarModalModificar =
      false;


    this.programacionesEditando =
      [];


    this.limpiarArchivo();

  }


  /* =======================================================
     OBTENER PROGRAMACIONES SELECCIONADAS
     ======================================================= */

  private obtenerProgramacionesSeleccionadas():
    ProgramacionData[] {

    if (
      this.fechasSeleccionadas.length ===
      0
    ) {

      return [];

    }


    if (
      !this.personalSeleccionado
    ) {

      return [];

    }


    return this.programaciones.filter(
      programacion =>

        programacion.personalId ===
        this.personalSeleccionado!.id

        &&

        this.fechasSeleccionadas.includes(
          programacion.fecha
        )

    );

  }


  /* =======================================================
     CLICK DERECHO SOBRE EL CALENDARIO
     ======================================================= */

  mostrarMenuContextualCalendario(
    event: MouseEvent,
    fecha: Date,
    programacion?: ProgramacionData
  ): void {

    event.preventDefault();

    event.stopPropagation();


    /*
      Guardamos la fecha exacta.
    */

    this.fechaContextual =
      this.fechaKey(fecha);


    /*
      Guardamos el turno si existe.
    */

    this.programacionContextual =
      programacion ?? null;


    /*
      Tamaño aproximado del menú.
    */

    const anchoMenu =
      220;

    const altoMenu =
      170;


    let x =
      event.clientX;

    let y =
      event.clientY;


    /*
      Evitar desbordamiento derecho.
    */

    if (
      x + anchoMenu >
      window.innerWidth
    ) {

      x =
        window.innerWidth -
        anchoMenu -
        10;

    }


    /*
      Evitar desbordamiento inferior.
    */

    if (
      y + altoMenu >
      window.innerHeight
    ) {

      y =
        window.innerHeight -
        altoMenu -
        10;

    }


    this.menuX =
      Math.max(
        10,
        x
      );


    this.menuY =
      Math.max(
        10,
        y
      );


    this.mostrarMenuContextual =
      true;

  }


  /* =======================================================
     AGREGAR TURNO DESDE MENÚ
     ======================================================= */

  agregarTurnoContextual(): void {

    if (
      !this.fechaContextual
    ) {

      this.cerrarMenuContextual();

      return;

    }


    const fecha =
      this.fechaContextual;


    this.cerrarMenuContextual();


    /*
      Seleccionamos solamente
      el día donde se hizo click derecho.
    */

    this.fechasSeleccionadas = [
      fecha
    ];


    this.abrirModalRegistro();

  }


  /* =======================================================
     MODIFICAR DESDE MENÚ
     ======================================================= */

  modificarTurnoContextual(): void {

    if (
      !this.programacionContextual
    ) {

      alert(
        'El día seleccionado no tiene un turno registrado para modificar.'
      );

      this.cerrarMenuContextual();

      return;

    }


    const programacion =
      this.programacionContextual;


    this.cerrarMenuContextual();


    this.modificarTurno(
      programacion
    );

  }


  /* =======================================================
     ELIMINAR DESDE MENÚ
     ======================================================= */

  eliminarTurnoContextual(): void {

    if (
      !this.programacionContextual
    ) {

      alert(
        'El día seleccionado no tiene un turno registrado para eliminar.'
      );

      this.cerrarMenuContextual();

      return;

    }


    const programacion =
      this.programacionContextual;


    this.cerrarMenuContextual();


    this.eliminarTurno(
      programacion
    );

  }


  /* =======================================================
     CERRAR MENÚ
     ======================================================= */

  cerrarMenuContextual(): void {

    this.mostrarMenuContextual =
      false;


    this.programacionContextual =
      null;


    this.fechaContextual =
      null;

  }


  /* =======================================================
     ELIMINAR TURNO
     ======================================================= */

  eliminarTurno(
    programacion?: ProgramacionData
  ): void {

    let registros:
      ProgramacionData[] = [];


    if (programacion) {

      registros = [
        programacion
      ];

    } else {

      registros =
        this.obtenerProgramacionesSeleccionadas();

    }


    if (
      registros.length === 0
    ) {

      alert(
        'Seleccione un turno para eliminar.'
      );

      return;

    }


    const confirmar =
      confirm(

        registros.length === 1

          ? '¿Desea eliminar este turno?'

          : `¿Desea eliminar los ${registros.length} turnos seleccionados?`

      );


    if (!confirmar) {

      return;

    }


    let procesados =
      0;

    let eliminados =
      0;

    let errores =
      0;


    for (
      const registro of registros
    ) {

      const id =
        Number(
          registro.id
        );


      if (
        !Number.isInteger(id)
      ) {

        errores++;

        procesados++;

        continue;

      }


      this.horariosService
        .eliminar(id)
        .subscribe({

          next: () => {

            eliminados++;

            procesados++;


            this.programaciones =
              this.programaciones.filter(
                item =>
                  item.id !==
                  registro.id
              );


            if (
              procesados ===
              registros.length
            ) {

              this.limpiarSeleccion();

              this.cerrarMenuContextual();


              if (
                errores === 0
              ) {

                alert(
                  `${eliminados} programación(es) eliminada(s) correctamente.`
                );

              }

            }

          },


          error: (error) => {

            errores++;

            procesados++;


            console.error(
              'Error al eliminar horario:',
              error
            );


            if (
              procesados ===
              registros.length
            ) {

              this.cerrarMenuContextual();


              alert(
                `Se eliminaron ${eliminados} programación(es), pero ${errores} no pudieron eliminarse.`
              );

            }

          }

        });

    }

  }


  /* =======================================================
     ARCHIVOS
     ======================================================= */

  seleccionarArchivo(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files ||
      input.files.length === 0
    ) {

      return;

    }


    const archivo =
      input.files[0];


    if (
      archivo.size >
      this.MAX_FILE_SIZE
    ) {

      alert(
        'El archivo no puede superar los 7 MB.'
      );


      input.value =
        '';

      return;

    }


    this.archivoSeleccionado =
      archivo;


    this.archivoNombre =
      archivo.name;


    this.archivoUrl =
      URL.createObjectURL(
        archivo
      );

  }


  eliminarArchivo(): void {

    this.limpiarArchivo();

  }


  limpiarArchivo(): void {

    if (
      this.archivoUrl &&
      this.archivoUrl.startsWith(
        'blob:'
      )
    ) {

      URL.revokeObjectURL(
        this.archivoUrl
      );

    }


    this.archivoSeleccionado =
      null;

    this.archivoNombre =
      '';

    this.archivoUrl =
      '';

  }


  abrirDocumento(
    programacion: ProgramacionData
  ): void {

    if (
      !programacion.archivoUrl
    ) {

      return;

    }


    window.open(
      programacion.archivoUrl,
      '_blank'
    );

  }


  /* =======================================================
     INFORMACIÓN DEL TURNO
     ======================================================= */

  get turnoActual(): Turno | undefined {

    return this.turnos.find(
      turno =>
        turno.id ===
        Number(
          this.turnoSeleccionadoId
        )
    );

  }


  get siglasTurno(): string {

    return (
      this.turnoActual?.siglas ??
      ''
    );

  }


  get nombreTurno(): string {

    return (
      this.turnoActual?.nombre ??
      ''
    );

  }


  get observacionTurno(): string {

    return (
      this.turnoActual?.observacion ??
      ''
    );

  }


  get duracionTurno(): number {

    if (
      this.usarDuracionPersonalizada
    ) {

      return Number(
        this.duracionPersonalizada
      );

    }


    return (
      this.turnoActual?.duracion ??
      0
    );

  }


  /* =======================================================
     EXPORTAR
     ======================================================= */

  exportar(): void {

    const datos =
      JSON.stringify(
        this.programaciones,
        null,
        2
      );


    const blob =
      new Blob(
        [datos],
        {
          type:
            'application/json'
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const enlace =
      document.createElement(
        'a'
      );


    enlace.href =
      url;


    enlace.download =
      'programacion.json';


    enlace.click();


    URL.revokeObjectURL(
      url
    );

  }


  /* =======================================================
     IMPRIMIR
     ======================================================= */

  imprimir(): void {

    window.print();

  }


  /* =======================================================
     PROGRAMACIONES DEL MES
     ======================================================= */

  get programacionesDelMes():
    ProgramacionData[] {

    if (
      !this.personalSeleccionado
    ) {

      return [];

    }


    const year =
      this.fechaActual.getFullYear();


    const month =
      this.fechaActual.getMonth();


    return this.programaciones.filter(
      programacion => {

        const fecha =
          new Date(
            `${programacion.fecha}T00:00:00`
          );


        return (

          programacion.personalId ===
          this.personalSeleccionado!.id

          &&

          fecha.getFullYear() ===
          year

          &&

          fecha.getMonth() ===
          month

        );

      }
    );

  }


  /* =======================================================
     HORAS MENSUALES
     ======================================================= */

  get horasMensuales(): number {

    return this.programacionesDelMes
      .reduce(

        (
          total,
          programacion
        ) =>

          total +
          Number(
            programacion.duracion
          ),

        0

      );

  }


  /* =======================================================
     META MENSUAL
     ======================================================= */

  readonly HORAS_MENSUALES =
    150;


  get diferenciaMensual(): number {

    return (
      this.horasMensuales -
      this.HORAS_MENSUALES
    );

  }


  get cumpleHorasMensuales(): boolean {

    return (
      this.horasMensuales >=
      this.HORAS_MENSUALES
    );

  }

}
