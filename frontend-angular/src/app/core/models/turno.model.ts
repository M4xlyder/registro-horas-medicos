export interface Turno {

  /**
   * Identificador único del turno.
   *
   * Los turnos originales tendrán IDs permanentes.
   * Las variantes también tendrán un ID diferente.
   */
  id: number;

  /**
   * Siglas que aparecerán en el calendario.
   *
   * Ejemplo:
   * GD
   * GN
   * T
   * TN
   */
  siglas: string;

  /**
   * Nombre completo del turno.
   */
  nombre: string;

  /**
   * Duración oficial del turno.
   */
  horas: number;

  /**
   * Color utilizado para mostrar
   * el turno en el calendario.
   */
  color: string;

  /**
   * Indica si el turno está activo.
   */
  activo: boolean;

  /**
   * Indica si es un turno original
   * o una variante personalizada.
   */
  tipo: 'ORIGINAL' | 'VARIANTE';

  /**
   * Si el turno es una variante,
   * aquí se guarda el ID del turno original.
   *
   * Ejemplo:
   *
   * ID 1 = Guardia Diurna = 12 horas
   *
   * ID 8 = Guardia Diurna = 10 horas
   * ID turno base = 1
   */
  idTurnoBase?: number;

  /**
   * Motivo por el cual se creó
   * la variante.
   */
  motivoModificacion?: string;

}
