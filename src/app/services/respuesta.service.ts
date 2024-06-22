import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from '../models/respuesta';
const base_url= environment.csbase;
@Injectable({
  providedIn: 'root'
})
export class respuestaService {
  private url=`${base_url}/respuestas`;
  private listaCambio= new Subject<Respuesta[]>();
  constructor(private httpClient: HttpClient){}
  list() {
    return this.httpClient.get<Respuesta[]>(this.url);
  }
  inser(r: Respuesta) {
    return this.httpClient.post(this.url, r);
  }
  setList(listaNueva: Respuesta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Respuesta>(`${this.url}/${id}`);
  }
  update(r: Respuesta) {
    return this.httpClient.put(this.url, r);
  }
  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  
}
