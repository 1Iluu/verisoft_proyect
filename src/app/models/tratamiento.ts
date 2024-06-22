import { Cita } from './cita';
import { Oncologo } from './oncologo';
import { TipoTratamiento } from './tipo_de_tratamiento';

export class Tratamiento {
  idTratamiento: number = 0;
  descripcionTratamiento: string = '';
  estadoTratamiento: string = '';
  presupuestoTratamiento: number = 0;
  fechaTratamiento: Date = new Date();
  horasTratamiento: number = 0;
  efectosEsperadosTratamiento: string = '';
  oncologo: Oncologo = new Oncologo();
  tipoTratamiento: TipoTratamiento = new TipoTratamiento();
  cita: Cita = new Cita();
}
