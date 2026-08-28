import { Injectable } from '@angular/core';


// =====================================================
// INTERFAZ EMPLEADO
// =====================================================

export interface Empleado {

  id: number;

  dni: string;

  nombres: string;

  apellidoPaterno: string;

  apellidoMaterno: string;

  departamento: string;

  especialidad: string;

  tipoContrato: string;

  estado: 'Activo' | 'Inactivo';

  metaMensual: number;

}


// =====================================================
// SERVICIO
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {


  // ===================================================
  // DATOS INICIALES
  // ===================================================

  private empleados: Empleado[] = [

    {
      id: 1,
      dni: '70451236',
      nombres: 'Marcelo',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: '',
      departamento: 'Cirugía',
      especialidad: 'Cirujanos',
      tipoContrato: 'Nombrado',
      estado: 'Activo',
      metaMensual: 150
    },

    {
      id: 2,
      dni: '71562347',
      nombres: 'Juan',
      apellidoPaterno: 'García',
      apellidoMaterno: '',
      departamento: 'Pediatría',
      especialidad: 'Pediatras',
      tipoContrato: 'CAS',
      estado: 'Activo',
      metaMensual: 150
    },

    {
      id: 3,
      dni: '72673458',
      nombres: 'Carlos',
      apellidoPaterno: 'Zafra',
      apellidoMaterno: '',
      departamento: 'Anestesiología',
      especialidad: 'Anestesiólogos',
      tipoContrato: 'Contrato a plazo fijo',
      estado: 'Activo',
      metaMensual: 150
    },

    {
      id: 4,
      dni: '73784569',
      nombres: 'Ambar',
      apellidoPaterno: 'Barriga',
      apellidoMaterno: '',
      departamento: 'Ginecología y Obstetricia',
      especialidad: 'Ginecólogos',
      tipoContrato: 'Contrato por suplencia',
      estado: 'Activo',
      metaMensual: 150
    },

    {
      id: 5,
      dni: '74895670',
      nombres: 'Kian',
      apellidoPaterno: 'Okuhama',
      apellidoMaterno: '',
      departamento: 'Medicina',
      especialidad: 'Medicina interna',
      tipoContrato: 'Tercero',
      estado: 'Activo',
      metaMensual: 150
    }

  ];


  // ===================================================
  // OBTENER EMPLEADOS
  // ===================================================

  obtenerEmpleados(): Empleado[] {

    return [...this.empleados];

  }


  // ===================================================
  // OBTENER EMPLEADO POR ID
  // ===================================================

  obtenerPorId(id: number): Empleado | undefined {

    return this.empleados.find(
      empleado => empleado.id === id
    );

  }


  // ===================================================
  // AGREGAR
  // ===================================================

  agregarEmpleado(
    empleado: Omit<Empleado, 'id'>
  ): Empleado {

    const nuevoId =
      this.empleados.length > 0
        ? Math.max(
            ...this.empleados.map(
              empleado => empleado.id
            )
          ) + 1
        : 1;


    const nuevoEmpleado: Empleado = {

      id: nuevoId,

      ...empleado,

      metaMensual: 150

    };


    this.empleados.push(
      nuevoEmpleado
    );


    return nuevoEmpleado;

  }


  // ===================================================
  // EDITAR
  // ===================================================

  editarEmpleado(
    id: number,
    datos: Partial<Empleado>
  ): boolean {

    const indice =
      this.empleados.findIndex(
        empleado => empleado.id === id
      );


    if (indice === -1) {

      return false;

    }


    this.empleados[indice] = {

      ...this.empleados[indice],

      ...datos,

      // La meta siempre permanece fija
      metaMensual: 150

    };


    return true;

  }


  // ===================================================
  // ELIMINAR
  // ===================================================

  eliminarEmpleado(
    id: number
  ): boolean {

    const cantidadInicial =
      this.empleados.length;


    this.empleados =
      this.empleados.filter(
        empleado =>
          empleado.id !== id
      );


    return (
      this.empleados.length <
      cantidadInicial
    );

  }


  // ===================================================
  // CAMBIAR ESTADO
  // ===================================================

  cambiarEstado(
    id: number
  ): boolean {

    const empleado =
      this.obtenerPorId(id);


    if (!empleado) {

      return false;

    }


    empleado.estado =
      empleado.estado === 'Activo'
        ? 'Inactivo'
        : 'Activo';


    return true;

  }


  // ===================================================
  // DEPARTAMENTOS
  // ===================================================

  obtenerDepartamentos(): string[] {

    return [

      'Emergencia y Cuidados Críticos',

      'Anestesiología',

      'Ginecología y Obstetricia',

      'Cirugía',

      'Pediatría',

      'Medicina'

    ];

  }


  // ===================================================
  // ESPECIALIDADES
  // ===================================================

  obtenerEspecialidades(): string[] {

    return [

      'Medicina intensiva',

      'Medicina interna',

      'Medicina interna a plazo fijo',

      'Medicina general',

      'Emergenciólogo',

      'Emergenciólogo plazo fijo',

      'Medicina general cont. suplencia',

      'Intensivista',

      'Anestesiólogos',

      'Ginecólogos',

      'Obstetricias',

      'Cirujanos',

      'Traumatólogos',

      'Otorrinos',

      'Oftalmólogo',

      'Urólogos',

      'Pediatras',

      'Neurología',

      'Psiquiatría',

      'Gastro',

      'Medicina física y rehabilitación',

      'Gastroenterólogo',

      'Reumatólogos',

      'Oncólogos',

      'Neumólogos'

    ];

  }


  // ===================================================
  // TIPOS DE CONTRATO
  // ===================================================

  obtenerTiposContrato(): string[] {

    return [

      'Nombrado',

      'CAS',

      'Residente',

      'Tercero',

      'Contrato a plazo fijo',

      'Contrato por suplencia'

    ];

  }


  // ===================================================
  // META MENSUAL
  // ===================================================

  obtenerMetaMensual(): number {

    return 150;

  }

}
