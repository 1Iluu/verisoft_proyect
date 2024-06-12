import { Roles } from "./roles";

export class Users {
  id: number = 0;
  username: string = "";
  password: string = "";
  enabled: boolean = false;
  roles: Roles[] = [];
  nombre: string = "";
  apellido: string = "";
  genero: string = "";
  fecha_nacimiento: Date = new Date(Date.now());;
  dni: string = "";
  correo_electronico: string = "";
  telefono: string = "";
  pais_de_origen: string = "";
  direccion: string = "";
}
