import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
usuarios:string[]= ['Emma','Carlos','Ana','Josseph'];
  obtenerUsuarios():string[]{
    return this.usuarios;
  }
  
  agregar(nombre:string){

this.usuarios.push(nombre);
  }
}
