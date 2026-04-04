import {
	Component,
	signal
} from '@angular/core';
import {
	RouterOutlet
} from '@angular/router';
import {
	Saludo
} from './saludo/saludo'
import {
	UsuarioService
} from './service/usuario'
import {
	CommonModule
} from '@angular/common';
import {
  FormGroup,
	FormsModule
} from '@angular/forms';
import {
	ReactiveFormsModule,
	FormBuilder,
	Validators
} from '@angular/forms';
@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, Saludo, CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	tittle = 'mi primera app josseph'
	nombre!: string;
	usuarios: string[] = [];
	nuevoUsuario: string = '';
formulario!:FormGroup;
mensaje:string='';
mensajeExito:boolean=false;
	constructor(private usuarioService: UsuarioService, private fb:FormBuilder) {
		this.usuarios = this.usuarioService.obtenerUsuarios();
 this.formulario=this.fb.group({
nombre:['',[Validators.required,Validators.minLength(3)]],
edad:[0,[Validators.required,Validators.min(1),Validators.max(60)]],
direccion:['',[Validators.required]]

  });
	}
 
	recibirNombre(n: string) {

		console.log("recibiendo del hijo", n);
		this.nombre = n;
	}

	guardar() {
	 
    if(this.formulario.invalid) return;

    console.log(this.formulario.value);

		this.usuarioService.agregar(this.formulario.value.nombre);
		 
		this.usuarios = this.usuarioService.obtenerUsuarios();
    this.mensaje=" usuario guardado con exito";
    this.mensajeExito=true;
console.log('antes');
    setTimeout(()=>{this.mensajeExito=false;
      this.mensaje='';
      console.log('adentro');
       this.formulario.reset();
    },4000);
    console.log("despues");
   
	}
}