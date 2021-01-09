import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcapiService } from 'src/app/services/ecapi.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
})
export class CategoryProductsComponent implements OnInit {
  products;
  constructor(private route: ActivatedRoute, private ecapi: EcapiService) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.ecapi.getProductsOfACategory(id).subscribe((res) => {
      this.products = res;
      console.log(res);
    });
  }
}
