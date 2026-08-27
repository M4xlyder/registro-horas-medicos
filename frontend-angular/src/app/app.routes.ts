import { Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';

import { ProgramacionComponent } from './programacion/programacion';

import { GestionDocumentos } from './gestion-documentos/gestion-documentos';

import { Reportes } from './reportes/reportes';

import { Configuracion } from './configuracion/configuracion';


export const routes: Routes = [

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
    path: 'programacion',
    component: ProgramacionComponent
  },

  {
    path: 'gestion-documentos',
    component: GestionDocumentos
  },

  {
    path: 'reportes',
    component: Reportes
  },

  {
    path: 'configuracion',
    component: Configuracion
  }

];
