import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


// =====================================================
// INTERFACES
// =====================================================

export interface Empleado {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  activo: boolean;
  metaMensualHoras: number;
}


// =====================================================
// HORARIO
// =====================================================

export interface HorarioMedico {
  id: number;

  empleado: Empleado;

  fecha: string;

  horaInicio: string;

  horaFin: string;

  activo: boolean;
}


// =====================================================
// DATOS PARA CREAR UN HORARIO
// =====================================================

export interface CrearHorario {
  empleadoId: number;

  fecha: string;

  horaInicio: string;

  horaFin: string;

  activo?: boolean;
}


// =====================================================
// DATOS PARA CREAR VARIOS HORARIOS
// =====================================================

export interface CrearHorariosMultiples {
  empleadoId: number;

  fechas: string[];

  horaInicio: string;

  horaFin: string;

  activo?: boolean;
}


// =====================================================
// SERVICIO
// =====================================================

@Injectable({
  providedIn: 'root',
})
export class HorariosService {

  // ===================================================
  // URL DEL BACKEND
  // ===================================================

  private readonly apiUrl =
    'http://localhost:3000/api/horarios-medicos';


  // ===================================================
  // CONSTRUCTOR
  // ===================================================

  constructor(
    private readonly http: HttpClient,
  ) {}


  // ===================================================
  // OBTENER TODOS LOS HORARIOS
  // ===================================================

  obtenerHorarios(): Observable<HorarioMedico[]> {
    return this.http.get<HorarioMedico[]>(
      this.apiUrl,
    );
  }


  // ===================================================
  // OBTENER HORARIO POR ID
  // ===================================================

  obtenerHorario(
    id: number,
  ): Observable<HorarioMedico> {

    return this.http.get<HorarioMedico>(
      `${this.apiUrl}/${id}`,
    );
  }


  // ===================================================
  // OBTENER HORARIOS DE UN EMPLEADO
  // ===================================================

  obtenerHorariosEmpleado(
    empleadoId: number,
  ): Observable<HorarioMedico[]> {

    return this.http.get<HorarioMedico[]>(
      `${this.apiUrl}/empleado/${empleadoId}`,
    );
  }


  // ===================================================
  // CREAR UN HORARIO
  // ===================================================

  crearHorario(
    horario: CrearHorario,
  ): Observable<HorarioMedico> {

    return this.http.post<HorarioMedico>(
      this.apiUrl,
      horario,
    );
  }


  // ===================================================
  // CREAR VARIOS HORARIOS
  // ===================================================

  crearHorariosMultiples(
    datos: CrearHorariosMultiples,
  ): Observable<HorarioMedico[]> {

    return this.http.post<HorarioMedico[]>(
      `${this.apiUrl}/multiple`,
      datos,
    );
  }


  // ===================================================
  // ELIMINAR HORARIO
  // ===================================================

  eliminarHorario(
    id: number,
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
    );
  }
}
