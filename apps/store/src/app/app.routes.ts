import { Route } from '@angular/router';
import { StoreMainPageComponent } from './components/store-main-page/store-main-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: async (): Promise<typeof StoreMainPageComponent> =>
      import('./components/store-main-page/store-main-page.component').then(
        (c) => c.StoreMainPageComponent,
      ),
  },
];
