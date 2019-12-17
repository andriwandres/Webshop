import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products'
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'products/:id',
        loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
