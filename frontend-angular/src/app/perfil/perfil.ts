import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  usuario: string;
  cargo: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {

  usuario: Usuario = {
    id: 1,
    nombres: 'Marcelo',
    apellidos: 'Ubia Alzamora',
    usuario: 'marcelo',
    cargo: 'Administrador del sistema'
  };

  editando = false;

  mensaje = '';

  constructor(
    private router: Router
  ) {
    this.cargarUsuario();
  }

  cargarUsuario(): void {

    const datos = localStorage.getItem(
      'usuarioActual'
    );

    if (!datos) {
      return;
    }

    try {

      const usuarioGuardado =
        JSON.parse(datos);

      this.usuario = {
        ...this.usuario,
        ...usuarioGuardado
      };

    } catch {

      console.warn(
        'No se pudo cargar el usuario.'
      );

    }

  }

  activarEdicion(): void {

    this.editando = true;

    this.mensaje = '';

  }

  cancelarEdicion(): void {

    this.cargarUsuario();

    this.editando = false;

    this.mensaje = '';

  }

  guardarCambios(): void {

    if (!this.usuario.nombres.trim()) {

      this.mensaje =
        'El nombre no puede estar vacío.';

      return;

    }

    if (!this.usuario.apellidos.trim()) {

      this.mensaje =
        'Los apellidos no pueden estar vacíos.';

      return;

    }

    localStorage.setItem(
      'usuarioActual',
      JSON.stringify(this.usuario)
    );

    this.editando = false;

    this.mensaje =
      'Los datos fueron actualizados correctamente.';

    setTimeout(() => {

      this.mensaje = '';

    }, 3000);

  }

  get iniciales(): string {

    const nombres =
      this.usuario.nombres
        .trim()
        .split(/\s+/);

    const apellidos =
      this.usuario.apellidos
        .trim()
        .split(/\s+/);

    const inicialNombre =
      nombres[0]?.charAt(0) ?? '';

    const inicialApellido =
      apellidos[0]?.charAt(0) ?? '';

    return (
      inicialNombre +
      inicialApellido
    ).toUpperCase();

  }

  get nombreCompleto(): string {

    return `${this.usuario.nombres} ${this.usuario.apellidos}`;

  }

  volver(): void {

    this.router.navigate([
      '/dashboard'
    ]);

  }

}
