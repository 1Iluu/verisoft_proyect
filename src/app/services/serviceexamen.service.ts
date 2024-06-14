import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Examendeteccion} from '../models/examendeteccion';
import { Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class ExamendeteccionService {
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

}
