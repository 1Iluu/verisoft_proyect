import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentario';

const base_url=environment.csbase

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

private url =`${base_url}/comentarios`
private listaCambio = new Subject<Comentario[]>()
  constructor(private http:HttpClient) {}
  list(){
    return this.http.get<Comentario[]>(this.url)
  }
  inser(c:Comentario){
    return this.http.post(this.url,c)

  }
  setList(listaNueva: Comentario[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }

  listId(id: number){
    return this.http.get<Comentario>(`${this.url}/${id}`)
 }

 update(c: Comentario){
   return this.http.put(this.url, c);
 }

 delete(id:number)
 {
   return this.http.delete(`${this.url}/${id}`)
 }
}
