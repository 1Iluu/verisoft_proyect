import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetalleHistorial } from '../models/detallehistorial';
import { Subject } from 'rxjs';
import { environment } from '../../environments/enviroment';
import { Herramienta } from '../models/herramienta';

const csbase_url=environment.csbase

@Injectable({
  providedIn: 'root'
})
export class ServiciodetallehistorialService {
  private url=`${csbase_url}/DetalleHistorial`;
  private listaCambio=new Subject<DetalleHistorial[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<DetalleHistorial[]>(this.url);
  }
  insert(dS:DetalleHistorial){
    return this.http.post(this.url, dS);
  }
  setList(listaNueva:DetalleHistorial[]) {
    this.listaCambio.next(listaNueva);
      }
  getList(){
    return this.listaCambio.asObservable();
      }
        
}
