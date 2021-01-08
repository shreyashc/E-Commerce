import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EcapiService } from 'src/app/services/ecapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Observable<any>;
  constructor(private ecapi: EcapiService) {}

  ngOnInit(): void {
    this.products = this.ecapi.getAllProducts();
  }
}
