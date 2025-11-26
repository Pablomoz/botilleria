import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'productos', loadComponent: () => import('./productos/productos.component').then(m => m.ProductosComponent) },
      { path: 'pos', loadComponent: () => import('./pos/pos.component').then(m => m.PosComponent) },
      { path: 'compras', loadComponent: () => import('./compras/compras.component').then(m => m.ComprasComponent) },
      { path: 'proveedores', loadComponent: () => import('./proveedores/proveedores.component').then(m => m.ProveedoresComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
