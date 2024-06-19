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
  ListId(id:number){
    return this.httpClient.get<Herramienta>(`${this.url}/${id}`)
  }
  
  update(e: Herramienta){
    return this.httpClient.put(this.url, e);
  }
}