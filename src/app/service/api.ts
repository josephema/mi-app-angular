import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

   

  obtenerUsuarios():Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  obtnerProductos(){
    return this.http.get<any[]>('https://fakestoreapi.com/products');

  }
}
