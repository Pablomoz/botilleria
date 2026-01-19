import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () => import('./login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'crear-cuenta',
    loadComponent: () => import('./crear-cuenta/crear-cuenta.component')
      .then(m => m.CrearCuentaComponent)
  },
  {
      path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
 {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'productos', loadComponent: () => import('./productos/productos.component').then(m => m.ProductosComponent) },
      { path: 'pos', loadComponent: () => import('./pos/pos.component').then(m => m.PosComponent) },
      { path: 'ventas', loadComponent: () => import('./ventas/ventas.component').then(m => m.VentasComponent) },
      { path: 'compras', loadComponent: () => import('./compras/compras.component').then(m => m.ComprasComponent) },
      { path: 'proveedores', loadComponent: () => import('./proveedores/proveedores.component').then(m => m.ProveedoresComponent) },
    ]
  }
];
