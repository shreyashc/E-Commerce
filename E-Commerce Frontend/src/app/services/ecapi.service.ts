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
    console.log('api ---');
    return this.http.get(environment.API_URL + 'products');
  }
}
