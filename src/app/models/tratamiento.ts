
import { Oncologo } from "./oncologo";

export class Tratamiento {
  idTratamiento: number = 0;
  descripcionTratamiento: string = '';
  estadoTratamiento: string = '';
  presupuestoTratamiento: number = 0;
  fechaTratamiento: Date = new Date();
  horasTratamiento: number = 0;
  efectosEsperadosTratamiento: string = '';
  oncologo: Oncologo = new Oncologo();
}