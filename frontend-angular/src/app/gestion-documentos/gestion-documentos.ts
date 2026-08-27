import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

interface Documento {
  id: number;
  medico: string;
  iniciales: string;
  especialidad: string;
  fecha: string;
  turno: string;
  nombreTurno: string;
  horas: number;
  nombreArchivo: string;
  tipoArchivo: string;
  tamanio: string;
  estado: 'Pendiente' | 'Revisado';
}

@Component({
  selector: 'app-gestion-documentos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './gestion-documentos.html',
  styleUrl: './gestion-documentos.css'
})
export class GestionDocumentos {

  // =====================================================
  // BÚSQUEDA
  // =====================================================

  busqueda = '';

  filtroEspecialidad = 'Todas';

  filtroEstado = 'Todos';


  // =====================================================
  // DOCUMENTO SELECCIONADO
  // =====================================================

  documentoSeleccionado: Documento | null = null;

  mostrarVistaPrevia = false;


  // =====================================================
  // DATOS DE PRUEBA
  // =====================================================

  documentos: Documento[] = [

    {
      id: 1,
      medico: 'Marcelo Pérez',
      iniciales: 'MP',
      especialidad: 'Cirugía General',
      fecha: '27/08/2026',
      turno: 'GD',
      nombreTurno: 'Guardia Diurna',
      horas: 12,
      nombreArchivo: 'justificacion_marcelo.pdf',
      tipoArchivo: 'PDF',
      tamanio: '1.2 MB',
      estado: 'Revisado'
    },

    {
      id: 2,
      medico: 'Juan García',
      iniciales: 'JG',
      especialidad: 'Cirugía Pediátrica',
      fecha: '25/08/2026',
      turno: 'TN',
      nombreTurno: 'Turno Noche',
      horas: 12,
      nombreArchivo: 'documento_turno_juan.pdf',
      tipoArchivo: 'PDF',
      tamanio: '850 KB',
      estado: 'Pendiente'
    },

    {
      id: 3,
      medico: 'Carlos Zafra',
      iniciales: 'CZ',
      especialidad: 'Anestesiología',
      fecha: '24/08/2026',
      turno: 'GD',
      nombreTurno: 'Guardia Diurna',
      horas: 12,
      nombreArchivo: 'constancia_carlos.pdf',
      tipoArchivo: 'PDF',
      tamanio: '2.1 MB',
      estado: 'Revisado'
    },

    {
      id: 4,
      medico: 'Ambar Barriga',
      iniciales: 'AB',
      especialidad: 'Ginecología',
      fecha: '22/08/2026',
      turno: 'T',
      nombreTurno: 'Tarde',
      horas: 6,
      nombreArchivo: 'justificacion_ambar.pdf',
      tipoArchivo: 'PDF',
      tamanio: '740 KB',
      estado: 'Pendiente'
    },

    {
      id: 5,
      medico: 'Kian Okuhama',
      iniciales: 'KO',
      especialidad: 'Medicina Interna',
      fecha: '20/08/2026',
      turno: 'M',
      nombreTurno: 'Mañana',
      horas: 6,
      nombreArchivo: 'documento_kian.pdf',
      tipoArchivo: 'PDF',
      tamanio: '1.5 MB',
      estado: 'Pendiente'
    }

  ];


  // =====================================================
  // LISTA DE ESPECIALIDADES
  // =====================================================

  get especialidades(): string[] {

    return [
      'Todas',
      ...new Set(
        this.documentos.map(
          documento => documento.especialidad
        )
      )
    ];

  }


  // =====================================================
  // DOCUMENTOS FILTRADOS
  // =====================================================

  get documentosFiltrados(): Documento[] {

    const texto = this.busqueda
      .trim()
      .toLowerCase();


    return this.documentos.filter(
      documento => {

        const coincideBusqueda =
          !texto ||
          documento.medico
            .toLowerCase()
            .includes(texto) ||
          documento.nombreArchivo
            .toLowerCase()
            .includes(texto) ||
          documento.especialidad
            .toLowerCase()
            .includes(texto);


        const coincideEspecialidad =
          this.filtroEspecialidad === 'Todas' ||
          documento.especialidad ===
          this.filtroEspecialidad;


        const coincideEstado =
          this.filtroEstado === 'Todos' ||
          documento.estado === this.filtroEstado;


        return (
          coincideBusqueda &&
          coincideEspecialidad &&
          coincideEstado
        );

      }
    );

  }


  // =====================================================
  // CONTADORES
  // =====================================================

  get totalDocumentos(): number {

    return this.documentos.length;

  }


  get documentosPendientes(): number {

    return this.documentos.filter(
      documento =>
        documento.estado === 'Pendiente'
    ).length;

  }


  get documentosRevisados(): number {

    return this.documentos.filter(
      documento =>
        documento.estado === 'Revisado'
    ).length;

  }


  // =====================================================
  // CAMBIAR ESTADO
  // =====================================================

  cambiarEstado(documento: Documento): void {

    documento.estado =
      documento.estado === 'Pendiente'
        ? 'Revisado'
        : 'Pendiente';

  }


  // =====================================================
  // VISTA PREVIA
  // =====================================================

  verDocumento(documento: Documento): void {

    this.documentoSeleccionado = documento;

    this.mostrarVistaPrevia = true;

  }


  // =====================================================
  // CERRAR VISTA PREVIA
  // =====================================================

  cerrarVistaPrevia(): void {

    this.mostrarVistaPrevia = false;

    this.documentoSeleccionado = null;

  }


  // =====================================================
  // DESCARGAR
  // =====================================================

  descargarDocumento(documento: Documento): void {

    /*
      Por ahora solo mostramos una simulación.

      Cuando conectemos el backend:
      - se obtendrá el archivo real
      - se descargará desde el servidor
    */

    alert(
      `Descargando: ${documento.nombreArchivo}`
    );

  }


  // =====================================================
  // ELIMINAR
  // =====================================================

  eliminarDocumento(documento: Documento): void {

    const confirmar = confirm(
      `¿Deseas eliminar el documento "${documento.nombreArchivo}"?`
    );

    if (!confirmar) {
      return;
    }


    this.documentos =
      this.documentos.filter(
        item => item.id !== documento.id
      );


    if (
      this.documentoSeleccionado?.id ===
      documento.id
    ) {

      this.cerrarVistaPrevia();

    }

  }


  // =====================================================
  // LIMPIAR FILTROS
  // =====================================================

  limpiarFiltros(): void {

    this.busqueda = '';

    this.filtroEspecialidad = 'Todas';

    this.filtroEstado = 'Todos';

  }

}
