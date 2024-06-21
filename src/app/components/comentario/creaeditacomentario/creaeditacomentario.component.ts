import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Oncologo } from '../../../models/oncologo';
import { Paciente } from '../../../models/paciente';
import { OncologoService } from '../../../services/oncologo.service';
import { PacienteService } from '../../../services/paciente.service';
import { Comentario } from '../../../models/comentario';
import { ComentarioService } from '../../../services/comentario.service';
@Component({
  selector: 'app-creaeditacomentario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './creaeditacomentario.component.html',
  styleUrl: './creaeditacomentario.component.css'
})
export class CreaeditacomentarioComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  comentario: Comentario = new Comentario();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaOncologo : Oncologo[] = []
  listaPaciente : Paciente[] = []
  estrellas: { value: string; viewValue: string }[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
    
  ];
  constructor(
    private cC: ComentarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private oS : OncologoService,
    private pS : PacienteService,
  ){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idComentario: [''],
      descripcion: ['', Validators.required],
      estrellas: ['', Validators.required],
      paciente: ['', Validators.required],
      oncologo: ['', Validators.required],
    });
    this.oS.list().subscribe((data) => {
      this.listaOncologo = data;
    });
    this.pS.list().subscribe((data) => {
      this.listaPaciente = data;
    });
    }
    aceptar(): void {
      if (this.form.valid) {
        this.comentario.idComentario = this.form.value.idComentario;
        this.comentario.descripcion = this.form.value.descripcion;
        this.comentario.estrellas = this.form.value.estrellas;
        this.comentario.oncologo.oncologo_id = this.form.value.oncologo;
        this.comentario.paciente.idPaciente = this.form.value.paciente;
        
    
        this.cC.inser(this.comentario).subscribe((data) => {
          this.cC.list().subscribe((data) => {
            this.cC.setList(data);
          });
        });
    
        this.router.navigate(['comentario']);
      }
    }
  }


