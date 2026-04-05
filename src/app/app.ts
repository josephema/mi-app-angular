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
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api';
import { Usuario } from './models/usuario';
@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, Saludo, CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	tittle = 'mi primera app josseph'
	nombre!: string;
	usuarios: Usuario[] = [];
	nuevoUsuario: string = '';
formulario!:FormGroup;
mensaje:string='';
mensajeExito:boolean=false;
	constructor(private usuarioService: UsuarioService, private fb:FormBuilder,
          private apiService:ApiService
  ) {
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

    const usuariotemporal:Usuario={nombre:this.formulario.value.nombre,
        edad:this.formulario.value.edad,
        direccion:this.formulario.value.direccion
    };
		this.usuarioService.agregar(usuariotemporal);
		
		this.usuarios = this.usuarioService.obtenerUsuarios();
     console.log("losusuarios:",this.usuarios);
    this.mensaje=" usuario guardado con exito";
    this.mensajeExito=true;
 
    setTimeout(()=>{this.mensajeExito=false;
      this.mensaje='';
      console.log('adentro');
       this.formulario.reset();
    },4000);
     
   
	}
cargarUsuariosApi(){
      this.apiService.obtenerUsuarios().subscribe(( data: any[] ) => {
    
              for(let i=0; i<data.length; i++)
              {
                  const u=data[i];
                  const usuarioTemporal:Usuario=
                    {
                        nombre:u.name,
                        edad:Math.floor(Math.random()*60)+1,
                        direccion: u.address.city
                    };
                    this.usuarioService.agregar(usuarioTemporal);

              }

      


      });
}


  ngOnInit(){

    this.cargarUsuariosApi();
  }
}