import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';


@Component({
  selector: 'app-layout',

  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './layout.html',

  styleUrl: './layout.css'
})


export class Layout {


  // =====================================================
  // SIDEBAR
  // =====================================================

  sidebarColapsado = false;


  // =====================================================
  // PROGRAMACIÓN
  // =====================================================

  programacionAbierta = true;


  // =====================================================
  // MENÚ USUARIO DEL SIDEBAR
  // =====================================================

  perfilMenuAbierto = false;


  // =====================================================
  // MENÚ USUARIO DEL TOPBAR
  // =====================================================

  topPerfilMenuAbierto = false;


  // =====================================================
  // USUARIO
  // =====================================================

  nombreUsuario = 'Marcelo Ubia';

  cargoUsuario = 'Administrador';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private router: Router
  ) {

    this.cargarUsuario();

  }


  // =====================================================
  // CARGAR USUARIO
  // =====================================================

  cargarUsuario(): void {

    const datos =
      localStorage.getItem('usuarioActual');


    if (!datos) {
      return;
    }


    try {

      const usuario =
        JSON.parse(datos);


      if (
        usuario.nombres &&
        usuario.apellidos
      ) {

        this.nombreUsuario =
          `${usuario.nombres} ${usuario.apellidos}`;

      }


      if (usuario.nombreCompleto) {

        this.nombreUsuario =
          usuario.nombreCompleto;

      }


      if (usuario.cargo) {

        this.cargoUsuario =
          usuario.cargo;

      }

    } catch {

      console.warn(
        'No se pudo cargar la información del usuario.'
      );

    }

  }


  // =====================================================
  // INICIALES
  // =====================================================

  get inicialesUsuario(): string {

    const partes =
      this.nombreUsuario
        .trim()
        .split(/\s+/);


    if (partes.length === 0) {

      return 'MU';

    }


    if (partes.length === 1) {

      return partes[0]
        .substring(0, 2)
        .toUpperCase();

    }


    return (
      partes[0].charAt(0) +
      partes[partes.length - 1].charAt(0)
    ).toUpperCase();

  }


  // =====================================================
  // SIDEBAR
  // =====================================================

  alternarSidebar(): void {

    this.sidebarColapsado =
      !this.sidebarColapsado;


    this.perfilMenuAbierto = false;

    this.topPerfilMenuAbierto = false;


    if (this.sidebarColapsado) {

      this.programacionAbierta = false;

    }

  }


  // =====================================================
  // PROGRAMACIÓN
  // =====================================================

  alternarProgramacion(): void {

    if (this.sidebarColapsado) {

      this.sidebarColapsado = false;

    }


    this.programacionAbierta =
      !this.programacionAbierta;

  }


  // =====================================================
  // USUARIO DEL SIDEBAR
  // =====================================================

  alternarPerfilSidebar(): void {

    console.log(
      'Click en usuario del sidebar'
    );


    this.topPerfilMenuAbierto = false;


    this.perfilMenuAbierto =
      !this.perfilMenuAbierto;

  }


  // =====================================================
  // USUARIO DEL TOPBAR
  // =====================================================

  alternarPerfilTopbar(): void {

    console.log(
      'Click en usuario del topbar'
    );


    this.perfilMenuAbierto = false;


    this.topPerfilMenuAbierto =
      !this.topPerfilMenuAbierto;

  }


  // =====================================================
  // VER PERFIL
  // =====================================================

  irPerfil(): void {

    this.perfilMenuAbierto = false;

    this.topPerfilMenuAbierto = false;


    this.router.navigate([
      '/perfil'
    ]);

  }


  // =====================================================
  // CERRAR SESIÓN
  // =====================================================

  cerrarSesion(): void {

    const confirmar =
      confirm(
        '¿Deseas cerrar la sesión?'
      );


    if (!confirmar) {
      return;
    }


    localStorage.removeItem(
      'sesionActiva'
    );


    localStorage.removeItem(
      'usuarioActual'
    );


    this.perfilMenuAbierto = false;

    this.topPerfilMenuAbierto = false;


    this.router.navigate([
      '/login'
    ]);

  }

}
