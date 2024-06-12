import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { TipoTratamiento } from '../models/tipo_de_tratamiento';
import { Subject } from 'rxjs';
const base_url = environment.csbase

@Injectable({
  providedIn: 'root'
})
export class TipoTratamientoService {
  private url =`${base_url}/tipotratamientos`
private listaCambio = new Subject<TipoTratamiento[]>()
  constructor(private hhtp:HttpClient) {}
  list(){
    return this.hhtp.get<TipoTratamiento[]>(this.url)
  }
  inser(s:TipoTratamiento){
    return this.hhtp.post(this.url,s)

  }
  setList(listaNueva: TipoTratamiento[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }


  listId(id: number){
    return this.hhtp.get<TipoTratamiento>(`${this.url}/${id}`)
 }

 update(s: TipoTratamiento){
   return this.hhtp.put(this.url, s);
 }

 delete(id:number)
 {
   return this.hhtp.delete(`${this.url}/${id}`)
 }
}
