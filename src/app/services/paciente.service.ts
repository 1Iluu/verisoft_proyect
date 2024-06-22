import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { Subject } from 'rxjs';
import { Paciente } from '../models/paciente';
import { HttpClient } from '@angular/common/http';
const base_url= environment.csbase;
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private url=`${base_url}/pacientes`;
  private listaCambio= new Subject<Paciente[]>();
  constructor(private httpClient: HttpClient){}
  list() {
    return this.httpClient.get<Paciente[]>(this.url);
  }
  inser(p: Paciente) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Paciente[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Paciente>(`${this.url}/${id}`);
  }
  update(p: Paciente) {
    return this.httpClient.put(this.url, p);
  }
  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  
}
