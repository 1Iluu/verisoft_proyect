import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { Observable, Subject } from 'rxjs';
import { Cita } from '../models/cita';
import { HttpClient } from '@angular/common/http';
import { CitaByOncologoDTO } from '../models/citaByOncologoDTO';
const base_url=environment.csbase

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private url =`${base_url}/citas`
  private listaCambio = new Subject<Cita[]>()
    constructor(private http:HttpClient) {}
    list(){
      return this.http.get<Cita[]>(this.url)
    }
    inser(c:Cita){
      return this.http.post(this.url,c)
  
    }
    setList(listaNueva: Cita[]){
      this.listaCambio.next(listaNueva);
    }
    getList(){
      return this.listaCambio.asObservable();
    }
  
    listId(id: number){
      return this.http.get<Cita>(`${this.url}/${id}`)
   }
  
   update(c: Cita){
     return this.http.put(this.url, c);
   }
  
   delete(id:number)
   {
     return this.http.delete(`${this.url}/${id}`)
   }
   getQuantity():Observable<CitaByOncologoDTO[]>{
    return this.http.get<CitaByOncologoDTO[]>(`${this.url}/CantidadCitas`)
   }
}
