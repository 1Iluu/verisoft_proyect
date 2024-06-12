import { Injectable } from "@angular/core";
import { environment } from "../../environments/enviroment";
import { Roles } from "../models/roles";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

const base_url = environment.csbase;

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = `${base_url}/Roles`;
  private listaCambio = new Subject<Roles[]>();

  constructor(private http:HttpClient) {}
  list() {
    return this.http.get<Roles[]>(this.url);
}

insert(r: Roles) {
    return this.http.post(this.url, r); 
}

setList (listaNueva: Roles[]) {
    this.listaCambio.next(listaNueva);
}

getList() {
    return this.listaCambio.asObservable();
}

listId(id:number){
    return this.http.get<Roles>(`${this.url}/${id}`)
}

update(r: Roles){
return this.http.put(this.url, r);
}

delete(id: number)  {
    return this.http.delete(`${this.url}/${id}`)
  }
 

}