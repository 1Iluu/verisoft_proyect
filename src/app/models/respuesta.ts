import {Paciente} from "./paciente"

export class  Respuesta{
    idRespuesta: number=0
    gradoConsulta:string=""
    nivelRespuesta:string=""
    paciente: Paciente= new Paciente();
}