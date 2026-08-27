import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface MedicoResumen {
  id: number;
  iniciales: string;
  nombre: string;
  especialidad: string;
  horas: number;
  meta: number;
  porcentaje: number;
  estado: 'cumple' | 'pendiente' | 'excedido';
}

interface TurnoResumen {
  siglas: string;
  nombre: string;
  horas: number;
  cantidad: number;
  clase: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  // =====================================================
  // PERIODO
  // =====================================================

  mesActual = 'Agosto 2026';


  // =====================================================
  // INDICADORES PRINCIPALES
  // =====================================================

  totalPersonal = 5;

  personalActivo = 5;

  horasProgramadas = 610;

  horasMeta = 750;

  get horasPendientes(): number {
    return Math.max(
      this.horasMeta - this.horasProgramadas,
      0
    );
  }

  get porcentajeCumplimiento(): number {

    if (this.horasMeta === 0) {
      return 0;
    }

    return Math.min(
      Math.round(
        (this.horasProgramadas / this.horasMeta) * 100
      ),
      100
    );
  }


  // =====================================================
  // PERSONAL
  // =====================================================

  medicos: MedicoResumen[] = [

    {
      id: 1,
      iniciales: 'MP',
      nombre: 'Marcelo Pérez',
      especialidad: 'Cirugía General',
      horas: 150,
      meta: 150,
      porcentaje: 100,
      estado: 'cumple'
    },

    {
      id: 2,
      iniciales: 'JG',
      nombre: 'Juan García',
      especialidad: 'Cirugía Pediátrica',
      horas: 138,
      meta: 150,
      porcentaje: 92,
      estado: 'pendiente'
    },

    {
      id: 3,
      iniciales: 'CZ',
      nombre: 'Carlos Zafra',
      especialidad: 'Anestesiología',
      horas: 150,
      meta: 150,
      porcentaje: 100,
      estado: 'cumple'
    },

    {
      id: 4,
      iniciales: 'AB',
      nombre: 'Ambar Barriga',
      especialidad: 'Ginecología',
      horas: 142,
      meta: 150,
      porcentaje: 95,
      estado: 'pendiente'
    },

    {
      id: 5,
      iniciales: 'KO',
      nombre: 'Kian Okuhama',
      especialidad: 'Medicina Interna',
      horas: 130,
      meta: 150,
      porcentaje: 87,
      estado: 'pendiente'
    }

  ];


  // =====================================================
  // TURNOS
  // =====================================================

  turnos: TurnoResumen[] = [

    {
      siglas: 'GD',
      nombre: 'Guardia Diurna',
      horas: 12,
      cantidad: 18,
      clase: 'turno-verde'
    },

    {
      siglas: 'GN',
      nombre: 'Guardia Nocturna',
      horas: 12,
      cantidad: 15,
      clase: 'turno-azul'
    },

    {
      siglas: 'TD',
      nombre: 'Turno Día',
      horas: 12,
      cantidad: 14,
      clase: 'turno-celeste'
    },

    {
      siglas: 'TN',
      nombre: 'Turno Noche',
      horas: 12,
      cantidad: 10,
      clase: 'turno-turquesa'
    },

    {
      siglas: 'M',
      nombre: 'Mañana',
      horas: 6,
      cantidad: 8,
      clase: 'turno-amarillo'
    },

    {
      siglas: 'T',
      nombre: 'Tarde',
      horas: 6,
      cantidad: 9,
      clase: 'turno-rojo'
    }

  ];


  // =====================================================
  // MÉDICOS PENDIENTES
  // =====================================================

  get medicosPendientes(): MedicoResumen[] {

    return this.medicos.filter(
      medico => medico.horas < medico.meta
    );

  }


  // =====================================================
  // MÉDICOS QUE CUMPLEN
  // =====================================================

  get medicosCumplen(): MedicoResumen[] {

    return this.medicos.filter(
      medico => medico.horas >= medico.meta
    );

  }


  // =====================================================
  // CANTIDAD DE PENDIENTES
  // =====================================================

  get totalPendientes(): number {

    return this.medicosPendientes.length;

  }


  // =====================================================
  // CANTIDAD QUE CUMPLEN
  // =====================================================

  get totalCumplen(): number {

    return this.medicosCumplen.length;

  }


  // =====================================================
  // PORCENTAJE DE UN MÉDICO
  // =====================================================

  porcentajeMedico(
    medico: MedicoResumen
  ): number {

    if (medico.meta === 0) {
      return 0;
    }

    return Math.min(
      Math.round(
        (medico.horas / medico.meta) * 100
      ),
      100
    );

  }


  // =====================================================
  // HORAS RESTANTES
  // =====================================================

  horasRestantes(
    medico: MedicoResumen
  ): number {

    return Math.max(
      medico.meta - medico.horas,
      0
    );

  }


  // =====================================================
  // TEXTO DEL ESTADO
  // =====================================================

  obtenerTextoEstado(
    medico: MedicoResumen
  ): string {

    if (medico.horas >= medico.meta) {

      return 'Cumple meta';

    }

    return `Faltan ${this.horasRestantes(medico)} horas`;

  }


  // =====================================================
  // CLASE DEL ESTADO
  // =====================================================

  obtenerClaseEstado(
    medico: MedicoResumen
  ): string {

    if (medico.horas >= medico.meta) {

      return 'estado-cumple';

    }

    return 'estado-pendiente';

  }

}
