import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // =====================================================
  // FORMULARIO
  // =====================================================

  usuario: string = '';

  password: string = '';

  recordar: boolean = false;


  // =====================================================
  // CONTRASEÑA
  // =====================================================

  mostrarPassword: boolean = false;


  // =====================================================
  // ESTADO
  // =====================================================

  cargando: boolean = false;

  mensajeError: string = '';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private router: Router
  ) {}


  // =====================================================
  // MOSTRAR / OCULTAR CONTRASEÑA
  // =====================================================

  alternarPassword(): void {

    this.mostrarPassword =
      !this.mostrarPassword;

  }


  // =====================================================
  // INICIAR SESIÓN
  // =====================================================

  iniciarSesion(): void {

    this.mensajeError = '';


    // -----------------------------------------------------
    // VALIDACIÓN
    // -----------------------------------------------------

    if (
      !this.usuario.trim() ||
      !this.password.trim()
    ) {

      this.mensajeError =
        'Ingresa tu usuario y contraseña.';

      return;

    }


    this.cargando = true;


    // -----------------------------------------------------
    // LOGIN TEMPORAL
    // -----------------------------------------------------
    //
    // Usuario: admin
    // Contraseña: 123456
    //
    // Posteriormente será reemplazado por el backend.
    // -----------------------------------------------------

    setTimeout(() => {

      const usuarioIngresado =
        this.usuario
          .trim()
          .toLowerCase();


      if (
        usuarioIngresado === 'admin' &&
        this.password === '123456'
      ) {

        const usuarioActual = {

          nombres: 'Marcelo',

          apellidos: 'Ubia',

          nombreCompleto: 'Marcelo Ubia',

          cargo: 'Administrador'

        };


        // -------------------------------------------------
        // GUARDAR SESIÓN
        // -------------------------------------------------

        localStorage.setItem(
          'sesionActiva',
          'true'
        );


        localStorage.setItem(
          'usuarioActual',
          JSON.stringify(usuarioActual)
        );


        // -------------------------------------------------
        // RECORDAR USUARIO
        // -------------------------------------------------

        if (this.recordar) {

          localStorage.setItem(
            'usuarioRecordado',
            this.usuario
          );

        } else {

          localStorage.removeItem(
            'usuarioRecordado'
          );

        }


        this.cargando = false;


        // -------------------------------------------------
        // IR AL DASHBOARD
        // -------------------------------------------------

        this.router.navigate([
          '/dashboard'
        ]);

      } else {

        this.cargando = false;

        this.mensajeError =
          'El usuario o la contraseña son incorrectos.';

      }

    }, 700);

  }


  // =====================================================
  // RECUPERAR CONTRASEÑA
  // =====================================================

  recuperarPassword(): void {

    alert(
      'La recuperación de contraseña estará disponible cuando conectemos el backend.'
    );

  }

}
