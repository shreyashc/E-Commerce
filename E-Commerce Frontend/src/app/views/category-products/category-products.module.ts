import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryProductsRoutingModule } from './category-products-routing.module';
import { CategoryProductsComponent } from './category-products.component';


@NgModule({
  declarations: [CategoryProductsComponent],
  imports: [
    CommonModule,
    CategoryProductsRoutingModule
  ]
})
export class CategoryProductsModule { }
