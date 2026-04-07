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
import{map,catchError} from 'rxjs/operators';
import{of} from 'rxjs';
import { ProductoService } from './service/producto';
import { Producto } from './models/producto';
import {MatTableModule} from '@angular/material/table'

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, Saludo, CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule,MatTableModule],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	tittle = 'mi primera app josseph'
	nombre!: string;
	usuarios: Usuario[] = [];
	nuevoUsuario: string = '';
formulario!:FormGroup;
formularioProducto:FormGroup;
mensaje:string='';
mensajeExito:boolean=false;
loading:boolean=false;
error:string='';

productos:Producto[]=[];
displayedColumns:string[]=['nombre','precio','categoria','acciones'];
	constructor(private usuarioService: UsuarioService, private fb:FormBuilder,
          private apiService:ApiService,private productoService:ProductoService
  ) {
		this.usuarios = this.usuarioService.obtenerUsuarios();
 this.formulario=this.fb.group({
nombre:['',[Validators.required,Validators.minLength(3)]],
edad:[0,[Validators.required,Validators.min(1),Validators.max(60)]],
direccion:['',[Validators.required]]

  });

  this.formularioProducto=this.fb.group(
{
nombre:['',[Validators.required,Validators.minLength(3)]],
precio:[0,[Validators.required,Validators.min(1),Validators.max(60)]],
categoria:['',[Validators.required]]

}

  );
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
  this.loading=true;
      this.apiService.obtenerUsuarios().subscribe({
        
     next:   ( data: any[] ) => {
    
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
                  

              }  this.loading=false;
              },
      error:(err)=>{ this.mensaje="error algo paso en la api";
        this.loading=false;
      }
    
          });
}
cargarPoductos(){
this.apiService.obtnerProductos().subscribe({
next:(data: any[])=>{
          this.productoService.limpiar();
                          for(let i=0; i<data.length;i++)
                          {
                            const p=data[i];
                            const ptemporal:Producto={
                              nombre:p.title	,
                              precio:p.price	,
                              categoria:p.category
                            };
                            this.productoService.agregar(ptemporal);

                          }
                          setTimeout(() => {
                            this.productos=  this.productoService.obtnerProductos();
                            console.log(this.productos);
                          });
                        
                      }

});
 
}
eliminarProducto(producto:Producto):void{this.productoService.eliminar(producto);
    this.productos=  this.productoService.obtnerProductos();
}
guardarProducto(){
if(this.formularioProducto.invalid) return;
const nuevo:Producto={
  nombre:this.formularioProducto.value.nombre,
 
  precio:this.formularioProducto.value.precio,
 categoria:this.formularioProducto.value.categoria
};
this.productoService.agregar(nuevo);
this.productos=this.productoService.obtnerProductos();
this.formularioProducto.reset();
}



  ngOnInit(){

    this.cargarUsuariosApi();
    this.cargarPoductos();
  }
}