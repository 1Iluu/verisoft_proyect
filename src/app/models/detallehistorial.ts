import { Cirugias } from "./cirugias";
import { Examendeteccion } from "./examendeteccion";
import { Paciente } from "./paciente";
import { Seguro } from "./seguro";
import { Tratamiento } from "./tratamiento";

export class DetalleHistorial{
    idDetalleHistorial:number=0;
    fechaDetalleHistorial:string="";
    seguro:Seguro=new Seguro();
    cirugia:Cirugias=new Cirugias();
    tratamiento:Tratamiento=new Tratamiento();
    examendeteccion:Examendeteccion=new Examendeteccion();
    paciente:Paciente=new Paciente()

}