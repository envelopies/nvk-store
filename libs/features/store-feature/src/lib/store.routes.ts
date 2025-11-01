import { StoreMainPageComponent } from './pages/store-main/store-main.page';

export const storeRoutes = [
  {
    path: '',
    loadComponent: async (): Promise<typeof StoreMainPageComponent> =>
      import('./pages/store-main/store-main.page').then((c) => c.StoreMainPageComponent),
  },
];
