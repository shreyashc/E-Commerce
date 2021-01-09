import { Component, OnInit } from '@angular/core';
import { EcapiService } from 'src/app/services/ecapi.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories;
  constructor(private ecapi: EcapiService) {}

  ngOnInit(): void {
    this.ecapi.getAllCategoried().subscribe((res) => {
      this.categories = res;
      console.log(this.categories);
    });
  }
}
