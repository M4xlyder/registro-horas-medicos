import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmpleadoBackend {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  activo: boolean;
  metaMensualHoras: number;
}

export interface HorarioMedicoBackend {
  id: number;
  empleado: EmpleadoBackend;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  activo: boolean;
}

export interface CrearHorarioMultiple {
  empleadoId: number;
  fechas: string[];
  horaInicio: string;
  horaFin: string;
  activo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private readonly apiUrl =
    'http://localhost:3000/api/horarios-medicos';

  constructor(
    private readonly http: HttpClient
  ) {}

  // =====================================================
  // OBTENER TODOS
  // =====================================================

  obtenerTodos(): Observable<HorarioMedicoBackend[]> {
    return this.http.get<HorarioMedicoBackend[]>(
      this.apiUrl
    );
  }

  // =====================================================
  // OBTENER POR EMPLEADO
  // =====================================================

  obtenerPorEmpleado(
    empleadoId: number
  ): Observable<HorarioMedicoBackend[]> {

    return this.http.get<HorarioMedicoBackend[]>(
      `${this.apiUrl}/empleado/${empleadoId}`
    );
  }

  // =====================================================
  // CREAR VARIOS
  // =====================================================

  crearMultiple(
    datos: CrearHorarioMultiple
  ): Observable<HorarioMedicoBackend[]> {

    return this.http.post<HorarioMedicoBackend[]>(
      `${this.apiUrl}/multiple`,
      datos
    );
  }

  // =====================================================
  // ELIMINAR
  // =====================================================

  eliminar(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
