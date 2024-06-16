import { Paciente } from "./paciente";
import { Users } from "./users";

export class Roles {
  id: number = 0;
  rol: string = "";
  user: Users = new Users();
  paciente: Paciente = new Paciente();
}
