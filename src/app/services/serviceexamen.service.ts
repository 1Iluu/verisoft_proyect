import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Examendeteccion} from '../models/examendeteccion';
import { Subject } from 'rxjs';
import { environment } from '../../environments/enviroment';

const base_url=environment.csbase

@Injectable({
  providedIn: 'root'
})
export class Serviceexamen {
private url=`${base_url}/examenes`;
private listaCambio=new Subject<Examendeteccion[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Examendeteccion[]>(this.url);
  }

  insert(eS:Examendeteccion){
    return this.http.post(this.url, eS);
  }

  setList(listaNueva:Examendeteccion[]) {
this.listaCambio.next(listaNueva);
  }

  getList(){
    return this.listaCambio.asObservable();
  }
ListId(id:number){
  return this.http.get<Examendeteccion>(`${this.url}/${id}`)
}

update(e: Examendeteccion){
  return this.http.put(this.url, e);
}
}
