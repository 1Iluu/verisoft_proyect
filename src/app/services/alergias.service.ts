import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Alergias } from '../models/alergias';
import { Observable, Subject } from 'rxjs';
import { AlergiasByPacienteDTO } from '../models/AlergiasByPacienteDTO';

const base_url=environment.csbase
@Injectable({
  providedIn: 'root'
})
export class AlergiasService {
  private url=`${base_url}/alergias`
  private listaCambio = new Subject<Alergias[]>();
  constructor(private httpClient: HttpClient) {}
  list(){
    return this.httpClient.get<Alergias[]>(this.url);
  }
  insert(a: Alergias) {
    return this.httpClient.post(this.url, a);
  }
  setList(listaNueva: Alergias[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Alergias>(`${this.url}/${id}`);
  }
  update(a: Alergias) {
    return this.httpClient.put(this.url, a);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  
  getQuantity():Observable<AlergiasByPacienteDTO[]>{
    return this.httpClient.get<AlergiasByPacienteDTO[]>(`${this.url}/cantidadesalergias`);
  }
}