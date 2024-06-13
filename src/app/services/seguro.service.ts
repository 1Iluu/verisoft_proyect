import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Seguro } from '../models/seguro';
import { Subject } from 'rxjs';



const base_url = environment.csbase
@Injectable({
  providedIn: 'root'
})
export class SeguroService {
  private url =`${base_url}/seguros`
private listaCambio = new Subject<Seguro[]>()
  constructor(private hhtp:HttpClient) {}
  list(){
    return this.hhtp.get<Seguro[]>(this.url)
  }
  inser(s:Seguro){
    return this.hhtp.post(this.url,s)

  }
  setList(listaNueva: Seguro[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }

  listId(id: number){
    return this.hhtp.get<Seguro>(`${this.url}/${id}`)
 }

 update(s: Seguro){
   return this.hhtp.put(this.url, s);
 }

 delete(id:number)
 {
   return this.hhtp.delete(`${this.url}/${id}`)
 }
}
