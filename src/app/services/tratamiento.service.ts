import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { Tratamiento } from '../models/tratamiento';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.csbase;

@Injectable({
  providedIn: 'root',
})
export class TratamientoService {
  private url = `${base_url}/tratamientos`;
  private listaCambio = new Subject<Tratamiento[]>();
  private token = sessionStorage.getItem('token');

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Tratamiento[]>(this.url);
  }

  insert(s: Tratamiento) {
    console.log(this.url);

    return this.http.post(this.url, s, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  setList(listaNueva: Tratamiento[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Tratamiento>(`${this.url}/${id}`);
  }

  update(s: Tratamiento) {
    return this.http.put(this.url, s);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
