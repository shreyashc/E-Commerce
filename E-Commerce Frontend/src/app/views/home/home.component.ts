import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoadProductsAction } from 'src/app/store/actions/products.actions';
import { AppState } from 'src/app/store/models/app-state.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Observable<any>;
  loading: Observable<boolean>;
  error;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.products = this.store.select((store) => store.products.list);
    this.loading = this.store.select((store) => store.products.loading);
    this.error = this.store.select((store) => store.products.error);
    this.products.pipe(take(1)).subscribe((data) => {
      if (data.length === 0) {
        this.store.dispatch(new LoadProductsAction());
      }
    });
  }
}
