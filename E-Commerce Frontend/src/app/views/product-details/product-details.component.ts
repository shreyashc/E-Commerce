import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EcapiService } from 'src/app/services/ecapi.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: string;
  product;
  constructor(private rote: ActivatedRoute, private ecapi: EcapiService) {}

  ngOnInit(): void {
    this.id = this.rote.snapshot.params.id;
    this.ecapi.getProduct(this.id).subscribe((res) => {
      this.product = res;
    });
  }
}
