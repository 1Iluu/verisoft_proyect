import { Injectable } from "@angular/core";
import { environment } from "../../environments/enviroment";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Oncologo } from "../models/oncologo";

const base_url = environment.csbase;

@Injectable({
  providedIn: 'root'
})
export class OncologoService {
  private url = `${base_url}/Oncologo`;
  private listaCambio = new Subject<Oncologo[]>();

  constructor(private http:HttpClient) {}
  list() {
    return this.http.get<Oncologo[]>(this.url);
}

insert(o: Oncologo) {
    return this.http.post(this.url, o); 
}

setList (ListaNueva: Oncologo[]) {
    this.listaCambio.next(ListaNueva);
}

getList() {
    return this.listaCambio.asObservable();
}

listId(id:number){
    return this.http.get<Oncologo>(`${this.url}/${id}`)
}

update(o: Oncologo){
return this.http.put(this.url, o);
}

delete(id: number)  {
    return this.http.delete(`${this.url}/${id}`)
  }
 

}