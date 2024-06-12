import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from '../models/especialidad';
import { Subject } from 'rxjs';

const base_url = environment.csbase

@Injectable({
  providedIn: 'root'
})

export class EspecialidadService {
  private url =`${base_url}/especialidades`
  private listaCambio = new Subject<Especialidad[]>()
    constructor(private hhtp:HttpClient) {}
    list(){
      return this.hhtp.get<Especialidad[]>(this.url)
    }
    inser(s:Especialidad){
      return this.hhtp.post(this.url,s)
  
    }
    setList(listaNueva: Especialidad[]){
      this.listaCambio.next(listaNueva);
    }
    getList(){
      return this.listaCambio.asObservable();
    }
  
  
    listId(id: number){
      return this.hhtp.get<Especialidad>(`${this.url}/${id}`)
   }
  
   update(s: Especialidad){
     return this.hhtp.put(this.url, s);
   }
  
   delete(id:number)
   {
     return this.hhtp.delete(`${this.url}/${id}`)
   }
}
