import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

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
export class ProgramacionComponent implements OnInit {

  /* =======================================================
     CONFIGURACIÓN
     ======================================================= */

  readonly MAX_FILE_SIZE = 7 * 1024 * 1024;

  /* =======================================================
     PERSONAL
     ======================================================= */

  personal: Personal[] = [
    {
      id: 1,
      nombres: 'Marcelo',
      apellidos: 'Pérez',
      especialidad: 'Cirugía General',
      activo: true,
      iniciales: 'MP'
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

  personalSeleccionado: Personal | null = this.personal[0];

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
     SELECCIÓN DE DÍAS
     ======================================================= */

  fechasSeleccionadas: string[] = [];

  /* =======================================================
     TURNOS BASE
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

  programaciones: ProgramacionData[] = [];

  /* =======================================================
     MODAL REGISTRAR
     ======================================================= */

  mostrarModal = false;

  /* =======================================================
     MODAL MODIFICAR
     ======================================================= */

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
     PROGRAMACIÓN QUE SE ESTÁ MODIFICANDO
     ======================================================= */

  programacionesEditando: ProgramacionData[] = [];

  /* =======================================================
     ARCHIVO
     ======================================================= */

  archivoSeleccionado: File | null = null;

  archivoNombre = '';

  archivoUrl = '';

  /* =======================================================
     MENÚ CONTEXTUAL
     ======================================================= */

  mostrarMenuContextual = false;

  menuX = 0;

  menuY = 0;

  programacionContextual: ProgramacionData | null = null;

  /* =======================================================
     CONSTRUCTOR / INIT
     ======================================================= */

  ngOnInit(): void {

    this.generarCalendario();

    this.cargarDatosDemo();

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

    const year = this.fechaActual.getFullYear();

    const month = this.fechaActual.getMonth();

    const primerDia = new Date(
      year,
      month,
      1
    );

    const ultimoDia = new Date(
      year,
      month + 1,
      0
    );

    const primerDiaSemana = primerDia.getDay();

    const diasMes = ultimoDia.getDate();

    const diasMesAnterior = new Date(
      year,
      month,
      0
    ).getDate();

    this.diasCalendario = [];

    /* Días anteriores */

    for (
      let i = primerDiaSemana - 1;
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

    /* Días del mes */

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

    /* Días siguientes */

    let siguiente = 1;

    while (
      this.diasCalendario.length < 42
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

    return this.fechaActual.toLocaleDateString(
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

    this.fechaActual = new Date(
      this.fechaActual.getFullYear(),
      this.fechaActual.getMonth() - 1,
      1
    );

    this.generarCalendario();

    this.limpiarSeleccion();

  }

  mesSiguiente(): void {

    this.fechaActual = new Date(
      this.fechaActual.getFullYear(),
      this.fechaActual.getMonth() + 1,
      1
    );

    this.generarCalendario();

    this.limpiarSeleccion();

  }

  irHoy(): void {

    this.fechaActual = new Date();

    this.generarCalendario();

    this.limpiarSeleccion();

  }

  /* =======================================================
     FECHA
     ======================================================= */

  fechaKey(fecha: Date): string {

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
     COMPROBAR DÍA DEL MES ACTUAL
     ======================================================= */

  esMesActual(fecha: Date): boolean {

    return (
      fecha.getMonth() ===
      this.fechaActual.getMonth() &&

      fecha.getFullYear() ===
      this.fechaActual.getFullYear()
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

    const key =
      this.fechaKey(fecha);

    const index =
      this.fechasSeleccionadas.indexOf(key);

    if (index >= 0) {

      this.fechasSeleccionadas.splice(
        index,
        1
      );

    } else {

      this.fechasSeleccionadas.push(key);

    }

  }

  /* =======================================================
     SABER SI ESTÁ SELECCIONADO
     ======================================================= */

  estaSeleccionado(
    fecha: Date
  ): boolean {

    return this.fechasSeleccionadas.includes(
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

  }

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
          activoCorrecto &&
          (
            texto === '' ||
            nombre.includes(texto) ||
            persona.especialidad
              .toLowerCase()
              .includes(texto)
          )
        );

      }
    );

  }

  /* =======================================================
     TURNOS
     ======================================================= */

  get turnoSeleccionado(): Turno | undefined {

    return this.turnos.find(
      turno =>
        turno.id ===
        Number(this.turnoSeleccionadoId)
    );

  }

  cambioTurno(): void {

    const turno =
      this.turnoSeleccionado;

    if (!turno) {

      return;

    }

    if (!this.usarDuracionPersonalizada) {

      this.duracionPersonalizada =
        turno.duracion;

    }

  }

  /* =======================================================
     ABRIR MODAL REGISTRAR
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

    this.mostrarModal = true;

    this.turnoSeleccionadoId = 1;

    this.observacion = '';

    this.justificacion = '';

    this.usarDuracionPersonalizada = false;

    this.duracionPersonalizada =
      this.turnos[0].duracion;

    this.limpiarArchivo();

  }

  /* =======================================================
     CERRAR MODAL
     ======================================================= */

  cerrarModal(): void {

    this.mostrarModal = false;

    this.limpiarArchivo();

  }

  /* =======================================================
     REGISTRAR PROGRAMACIÓN
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
      Si se utiliza la duración original,
      se mantiene el ID del turno base.

      Si se cambia la duración,
      se crea un NUEVO ID para la variante.

      De esta manera:

      Turno ID 1 = Guardia Diurna - 12 horas

      Variante ID X =
      Guardia Diurna - 10 horas

      El turno original NO se modifica.
    */

    let turnoId =
      turno.id;

    let tipo:
      'ORIGINAL' |
      'VARIANTE' = 'ORIGINAL';

    if (
      this.usarDuracionPersonalizada &&
      duracion !== turno.duracion
    ) {

      turnoId =
        this.generarIdTurnoVariante();

      tipo = 'VARIANTE';

    }

    for (
      const fecha of this.fechasSeleccionadas
    ) {

      const nuevaProgramacion: ProgramacionData = {

        id:
          this.generateId(),

        personalId:
          this.personalSeleccionado.id,

        fecha,

        turnoId,

        turnoBaseId:
          turno.id,

        tipo,

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

      /*
        Permite tener DOS turnos
        en el mismo día.
      */

      const existeMismoTurno =
        this.programaciones.some(
          programacion =>

            programacion.personalId ===
              this.personalSeleccionado!.id &&

            programacion.fecha ===
              fecha &&

            programacion.turnoId ===
              turnoId
        );

      if (!existeMismoTurno) {

        this.programaciones.push(
          nuevaProgramacion
        );

      }

    }

    this.cerrarModal();

    this.limpiarSeleccion();

  }

  /* =======================================================
     ID DE VARIANTE
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

    if (ids.length === 0) {

      return 1001;

    }

    return Math.max(...ids) + 1;

  }

  /* =======================================================
     PROGRAMACIONES DE UN DÍA
     ======================================================= */

  getProgramaciones(
    fecha: Date
  ): ProgramacionData[] {

    if (!this.personalSeleccionado) {

      return [];

    }

    const key =
      this.fechaKey(fecha);

    return this.programaciones.filter(
      programacion =>

        programacion.personalId ===
          this.personalSeleccionado!.id &&

        programacion.fecha ===
          key
    );

  }

  /* =======================================================
     OBTENER COLOR
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
     MODIFICAR PROGRAMACIÓN
     ======================================================= */

  modificarTurno(
    programacion?: ProgramacionData
  ): void {

    let registros: ProgramacionData[] = [];

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
     GUARDAR MODIFICACIÓN
     ======================================================= */

  guardarCambios(): void {

    if (
      this.programacionesEditando.length ===
      0
    ) {

      this.cerrarModalModificar();

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
      IMPORTANTE:

      Nunca modificamos el turno base.

      Si cambiamos las horas:

      ID 1
      Guardia Diurna
      12 horas

      pasa a existir una variante:

      ID 1001
      Guardia Diurna
      10 horas

      El ID 1 sigue intacto.
    */

    let nuevoTurnoId =
      turno.id;

    let tipo:
      'ORIGINAL' |
      'VARIANTE' = 'ORIGINAL';

    if (
      this.usarDuracionPersonalizada &&
      duracion !== turno.duracion
    ) {

      nuevoTurnoId =
        this.generarIdTurnoVariante();

      tipo = 'VARIANTE';

    }

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

      if (indice === -1) {

        continue;

      }

      this.programaciones[indice] = {

        ...this.programaciones[indice],

        turnoId:
          nuevoTurnoId,

        turnoBaseId:
          turno.id,

        tipo,

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
     CERRAR MODIFICAR
     ======================================================= */

  cerrarModalModificar(): void {

    this.mostrarModalModificar =
      false;

    this.programacionesEditando =
      [];

    this.limpiarArchivo();

  }

  /* =======================================================
     ELIMINAR TURNO
     ======================================================= */

  eliminarTurno(
    programacion?: ProgramacionData
  ): void {

    let registros: ProgramacionData[] = [];

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

    const ids =
      new Set(
        registros.map(
          registro =>
            registro.id
        )
      );

    this.programaciones =
      this.programaciones.filter(
        programacion =>
          !ids.has(
            programacion.id
          )
      );

    this.limpiarSeleccion();

    this.cerrarMenuContextual();

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

    if (!this.personalSeleccionado) {

      return [];

    }

    return this.programaciones.filter(
      programacion =>

        programacion.personalId ===
          this.personalSeleccionado!.id &&

        this.fechasSeleccionadas.includes(
          programacion.fecha
        )
    );

  }

  /* =======================================================
     CLICK DERECHO
     ======================================================= */

  mostrarMenu(
    event: MouseEvent,
    programacion: ProgramacionData
  ): void {

    event.preventDefault();

    event.stopPropagation();

    this.programacionContextual =
      programacion;

    this.menuX =
      event.clientX;

    this.menuY =
      event.clientY;

    this.mostrarMenuContextual =
      true;

  }

  /* =======================================================
     MODIFICAR DESDE MENÚ
     ======================================================= */

  modificarDesdeMenu(): void {

    if (
      !this.programacionContextual
    ) {

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

  eliminarDesdeMenu(): void {

    if (
      !this.programacionContextual
    ) {

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

  }

  /* =======================================================
     ARCHIVO
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

      input.value = '';

      return;

    }

    this.archivoSeleccionado =
      archivo;

    this.archivoNombre =
      archivo.name;

    /*
      Para esta versión frontend
      generamos una URL local.

      Posteriormente esta URL será
      reemplazada por la URL del backend.
    */

    this.archivoUrl =
      URL.createObjectURL(
        archivo
      );

  }

  /* =======================================================
     ELIMINAR ARCHIVO
     ======================================================= */

  eliminarArchivo(): void {

    this.limpiarArchivo();

  }

  /* =======================================================
     LIMPIAR ARCHIVO
     ======================================================= */

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

  /* =======================================================
     ABRIR DOCUMENTO
     ======================================================= */

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
     DATOS PARA LA INFORMACIÓN DEL TURNO
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

    enlace.href = url;

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
            this.personalSeleccionado!.id &&

          fecha.getFullYear() ===
            year &&

          fecha.getMonth() ===
            month
        );

      }
    );

  }

  /* =======================================================
     TOTAL DE HORAS DEL MES
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
     HORAS FALTANTES / EXCESO
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

  /* =======================================================
     CARGAR DATOS DE PRUEBA
     ======================================================= */

  private cargarDatosDemo(): void {

    /*
      Solo datos visuales para comprobar
      que el calendario funciona.

      Posteriormente serán reemplazados
      por información proveniente del backend.
    */

    this.programaciones = [

      {
        id: this.generateId(),
        personalId: 1,
        fecha: '2026-08-18',
        turnoId: 6,
        turnoBaseId: 6,
        tipo: 'ORIGINAL',
        siglas: 'T',
        nombreTurno: 'Tarde',
        duracion: 6,
        observacion: 'Turno tarde',
        justificacion: '',
        archivoNombre: '',
        archivoUrl: ''
      },

      {
        id: this.generateId(),
        personalId: 1,
        fecha: '2026-08-18',
        turnoId: 1,
        turnoBaseId: 1,
        tipo: 'ORIGINAL',
        siglas: 'GD',
        nombreTurno: 'Guardia Diurna',
        duracion: 12,
        observacion: 'Guardia diurna',
        justificacion: '',
        archivoNombre: '',
        archivoUrl: ''
      },

      {
        id: this.generateId(),
        personalId: 1,
        fecha: '2026-08-19',
        turnoId: 4,
        turnoBaseId: 4,
        tipo: 'ORIGINAL',
        siglas: 'TN',
        nombreTurno: 'Turno Noche',
        duracion: 12,
        observacion: 'Turno noche',
        justificacion: '',
        archivoNombre: '',
        archivoUrl: ''
      }

    ];

  }

}
