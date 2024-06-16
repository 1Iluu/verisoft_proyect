import { Oncologo } from "./oncologo";
import { Paciente } from "./paciente";

export class Cita{
    idCita: number= 0;
    Fecha: Date = new Date(Date.now());;
    hora: number = 0;
    motivo: string = "";
    estado: string = "";
    Consultorio: string = "";
    paciente: Paciente = new Paciente();
    oncologo: Oncologo = new Oncologo();

}