import { Injectable } from '@angular/core';
import { Turno } from '../models/turno.model';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  /**
   * Catálogo oficial de turnos.
   *
   * IMPORTANTE:
   *
   * Estos registros representan los horarios
   * establecidos oficialmente.
   *
   * NO debemos modificar sus horas desde
   * la programación.
   */
  private turnosOriginales: Turno[] = [

    {
      id: 1,
      siglas: 'GD',
      nombre: 'Guardia Diurna',
      horas: 12,
      color: '#EAF7EF',
      activo: true,
      tipo: 'ORIGINAL'
    },

    {
      id: 2,
      siglas: 'GN',
      nombre: 'Guardia Nocturna',
      horas: 12,
      color: '#EEF1FA',
      activo: true,
      tipo: 'ORIGINAL'
    },

    {
      id: 3,
      siglas: 'TD',
      nombre: 'Turno Día',
      horas: 12,
      color: '#FFF4E8',
      activo: true,
      tipo: 'ORIGINAL'
    },

    {
      id: 4,
      siglas: 'TN',
      nombre: 'Turno Noche',
      horas: 12,
      color: '#EAF6FA',
      activo: true,
      tipo: 'ORIGINAL'
    },

    {
      id: 5,
      siglas: 'M',
      nombre: 'Mañana',
      horas: 6,
      color: '#FFF8E5',
      activo: true,
      tipo: 'ORIGINAL'
    },

    {
      id: 6,
      siglas: 'T',
      nombre: 'Tarde',
      horas: 6,
      color: '#FFF0F1',
      activo: true,
      tipo: 'ORIGINAL'
    }

  ];


  /**
   * Variantes creadas por modificaciones particulares.
   *
   * Ejemplo:
   *
   * ID 8
   * Guardia Diurna
   * 10 horas
   * ID base = 1
   */
  private variantes: Turno[] = [];


  /**
   * Devuelve todos los turnos activos.
   */
  obtenerTurnosActivos(): Turno[] {

    return [
      ...this.turnosOriginales,
      ...this.variantes
    ].filter(turno => turno.activo);

  }


  /**
   * Devuelve únicamente los turnos originales.
   *
   * Esto será utilizado posteriormente
   * en Configuración.
   */
  obtenerTurnosOriginales(): Turno[] {

    return this.turnosOriginales.filter(
      turno => turno.activo
    );

  }


  /**
   * Buscar un turno por ID.
   */
  obtenerTurnoPorId(id: number): Turno | undefined {

    return [
      ...this.turnosOriginales,
      ...this.variantes
    ].find(
      turno => turno.id === id
    );

  }


  /**
   * Crear una variante de un turno.
   *
   * IMPORTANTE:
   *
   * Nunca modifica el turno original.
   */
  crearVariante(
    idTurnoBase: number,
    nuevasHoras: number,
    motivo: string
  ): Turno {

    const turnoBase =
      this.obtenerTurnoPorId(idTurnoBase);


    if (!turnoBase) {

      throw new Error(
        'No se encontró el turno base.'
      );

    }


    if (nuevasHoras <= 0) {

      throw new Error(
        'La duración debe ser mayor a 0 horas.'
      );

    }


    /**
     * Generamos un nuevo ID.
     *
     * Más adelante esto lo hará PostgreSQL.
     */
    const nuevoId =
      this.generarId();


    const nuevaVariante: Turno = {

      id: nuevoId,

      siglas: turnoBase.siglas,

      nombre: turnoBase.nombre,

      horas: nuevasHoras,

      color: turnoBase.color,

      activo: true,

      tipo: 'VARIANTE',

      idTurnoBase:
        turnoBase.tipo === 'VARIANTE'
          ? turnoBase.idTurnoBase
          : turnoBase.id,

      motivoModificacion:
        motivo

    };


    this.variantes.push(
      nuevaVariante
    );


    console.log(
      'Nueva variante creada:',
      nuevaVariante
    );


    return nuevaVariante;

  }


  /**
   * Genera un ID temporal.
   *
   * Cuando tengamos PostgreSQL,
   * el ID definitivo será generado
   * por la base de datos.
   */
  private generarId(): number {

    const todos = [
      ...this.turnosOriginales,
      ...this.variantes
    ];


    const mayorId =
      todos.reduce(
        (mayor, turno) =>
          Math.max(mayor, turno.id),
        0
      );


    return mayorId + 1;

  }

}
