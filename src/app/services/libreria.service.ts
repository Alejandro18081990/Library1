import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Libro } from '../interfaces/libro';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibreriaService {
  rutaGetAll: string = `${environment.apiUrl}/libros`
  rutaGet: string = `${environment.apiUrl}/libros/`

  constructor(private http: HttpClient) {

  }


  getAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.rutaGetAll);
  }

  getOne(idRecibida: number): Observable<Libro> {
    return this.http.get<Libro>(this.rutaGet + idRecibida);
  }
}
