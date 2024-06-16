import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { Subject } from 'rxjs';
import { Pacient } from '../models/paciente';
import { HttpClient } from '@angular/common/http';
const base_url= environment.csbase;
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private url=`${base_url}/pacientes`;
  private listaCambio= new Subject<Pacient[]>();
  constructor(private httpClient: HttpClient){}
  list() {
    return this.httpClient.get<Pacient[]>(this.url);
  }
  inser(p: Pacient) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Pacient[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Pacient>(`${this.url}/${id}`);
  }
  update(c: Pacient) {
    return this.httpClient.put(this.url, c);
  }
  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  
}
