import { environment } from './../../environments/enviroment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from '../models/especialidad';
import { Subject } from 'rxjs';

const base_url = environment.csbase;

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private url = `${base_url}/especialidades`;
  private listaCambio = new Subject<Especialidad[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Especialidad[]>(this.url);
  }

  insert(s: Especialidad) {
    return this.http.post(this.url, s);
  }

  setList(listaNueva: Especialidad[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Especialidad>(`${this.url}/${id}`);
  }

  update(s: Especialidad) {
    return this.http.put(this.url, s);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
