import { Injectable } from '@angular/core';
import { Programacion } from '../models/programacion.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionService {

  private programaciones: Programacion[] = [];

  constructor() {}

  /* =====================================================
     OBTENER TODAS LAS PROGRAMACIONES
  ===================================================== */

  obtenerProgramaciones(): Programacion[] {

    return [...this.programaciones];

  }

  /* =====================================================
     REGISTRAR PROGRAMACIÓN
  ===================================================== */

  agregarProgramacion(programacion: Programacion): boolean {

    const existe = this.programaciones.some(
      item =>
        item.personalId === programacion.personalId &&
        item.fecha === programacion.fecha &&
        item.turnoId === programacion.turnoId
    );

    if (existe) {
      return false;
    }

    this.programaciones.push(programacion);

    return true;
  }

  /* =====================================================
     ACTUALIZAR PROGRAMACIÓN
  ===================================================== */

  actualizarProgramacion(programacion: Programacion): boolean {

    const index = this.programaciones.findIndex(
      item => item.id === programacion.id
    );

    if (index === -1) {
      return false;
    }

    this.programaciones[index] = {
      ...programacion
    };

    return true;
  }

  /* =====================================================
     ELIMINAR PROGRAMACIÓN
  ===================================================== */

  eliminarProgramacion(id: string): boolean {

    const index = this.programaciones.findIndex(
      item => item.id === id
    );

    if (index === -1) {
      return false;
    }

    this.programaciones.splice(index, 1);

    return true;
  }

  /* =====================================================
     BUSCAR POR PERSONAL
  ===================================================== */

  obtenerPorPersonal(personalId: number): Programacion[] {

    return this.programaciones.filter(
      item => item.personalId === personalId
    );

  }

  /* =====================================================
     BUSCAR POR PERSONAL Y FECHA
  ===================================================== */

  obtenerPorPersonalYFecha(
    personalId: number,
    fecha: string
  ): Programacion[] {

    return this.programaciones.filter(
      item =>
        item.personalId === personalId &&
        item.fecha === fecha
    );

  }

  /* =====================================================
     BUSCAR POR ID
  ===================================================== */

  obtenerPorId(id: string): Programacion | undefined {

    return this.programaciones.find(
      item => item.id === id
    );

  }

  /* =====================================================
     LIMPIAR TODO
  ===================================================== */

  limpiar(): void {

    this.programaciones = [];

  }

}
