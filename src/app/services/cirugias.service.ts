import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Cirugias } from '../models/cirugias';
import { Subject } from 'rxjs';

const base_url=environment.csbase
@Injectable({
  providedIn: 'root',
})
export class CirugiasService  {
  private url = `${base_url}/cirugias`;
  private listaCambio = new Subject<Cirugias[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Cirugias[]>(this.url);
  }
  insert(c: Cirugias) {
    return this.httpClient.post(this.url, c);
  }
  setList(listaNueva: Cirugias[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Cirugias>(`${this.url}/${id}`);
  }
  update(c: Cirugias) {
    return this.httpClient.put(this.url, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  
}