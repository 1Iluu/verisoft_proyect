import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { Herramienta } from '../models/herramienta';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const csbase_url = environment.csbase;

@Injectable({
  providedIn: 'root'
})
export class ServicioherramientaService {
  private url=`${csbase_url}/herramientas`;
  private listaCambio = new Subject<Herramienta[]>();
    constructor(private httpClient:HttpClient) { }
    list(){
      return this.httpClient.get<Herramienta[]>(this.url);
    }
    insert(hS:Herramienta){
      return this.httpClient.post(this.url, hS);
    }
    setList(listaNueva:Herramienta[]){
      this.listaCambio.next(listaNueva);
    }    
  getList(){
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.httpClient.get<Herramienta>(`${this.url}/${id}`);
  }
  update(h: Herramienta) {
    return this.httpClient.put(this.url, h);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}