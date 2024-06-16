import { Oncologo } from "./oncologo";
import { Paciente } from "./paciente";

export class Comentario{
    idComentario: number= 0;
    descripcion:string="";
    estrellas: number =0;
    oncologo: Oncologo = new Oncologo();   
    paciente: Paciente = new Paciente();
}