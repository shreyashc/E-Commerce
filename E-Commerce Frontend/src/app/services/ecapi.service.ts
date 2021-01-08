import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EcapiService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(environment.API_URL + 'products');
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(environment.API_URL + 'products/' + id);
  }
}
