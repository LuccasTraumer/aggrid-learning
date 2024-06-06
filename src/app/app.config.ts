import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AgGridModule } from 'ag-grid-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
