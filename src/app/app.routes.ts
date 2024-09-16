import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'date-time-format',
    loadComponent: () => import('./domains/date-time-format/page/date-time-format-page.component').then(m => m.DateTimeFormatPageComponent)
  }
];
