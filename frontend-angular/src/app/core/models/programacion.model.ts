export interface Programacion {

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
