import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: async () => import('@nvk-store/store-feature').then((r) => r.storeRoutes),
      },
    ],
  },
];
