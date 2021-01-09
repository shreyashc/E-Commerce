import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./views/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'product-details/:id',
    loadChildren: () =>
      import('./views/product-details/product-details.module').then(
        (m) => m.ProductDetailsModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./views/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: 'category-products/:id',
    loadChildren: () =>
      import('./views/category-products/category-products.module').then(
        (m) => m.CategoryProductsModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
