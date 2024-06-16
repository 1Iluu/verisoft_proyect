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
  private url = `${base_url}/cirugias`
  private listaCambio = new Subject<Cirugias[]>()
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Cirugias[]>(this.url)
  }
  inser(c: Cirugias) {
    return this.http.post(this.url, c);
  }
  setList(listaNueva: Cirugias[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Cirugias>(`${this.url}/${id}`);
  }
  update(c: Cirugias) {
    return this.http.put(this.url, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
}