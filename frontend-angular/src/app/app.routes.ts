import { Routes } from '@angular/router';

import { Login } from './auth/login/login';

import { Layout } from './layout/layout';

import { Dashboard } from './dashboard/dashboard';

import { GestionDocumentos } from './gestion-documentos/gestion-documentos';

import { ProgramacionComponent } from './programacion/programacion';

import { Reportes } from './reportes/reportes';

import { Configuracion } from './configuracion/configuracion';

import { Perfil } from './perfil/perfil';


export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: '',

    component: Layout,

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: Dashboard
      },

      {
        path: 'gestion-documentos',
        component: GestionDocumentos
      },

      {
        path: 'programacion',
        component: ProgramacionComponent
      },

      {
        path: 'reportes',
        component: Reportes
      },

      {
        path: 'configuracion',
        component: Configuracion
      },

      {
        path: 'perfil',
        component: Perfil
      }

    ]

  },

  {
    path: '**',
    redirectTo: 'login'
  }

];
