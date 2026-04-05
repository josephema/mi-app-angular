import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuarios: Usuario[] = [
    { nombre: 'Emma', edad: 35, direccion: 'Antigua' },
    { nombre: 'Carlos', edad: 28, direccion: 'Zona 1' },
    { nombre: 'Ana', edad: 30, direccion: 'Mixco' },
    { nombre: 'Josseph', edad: 32, direccion: 'Guatemala' }
  ];
//usuarios:string[]= ['Emma','Carlos','Ana','Josseph'];
  obtenerUsuarios():Usuario[]{
    return this.usuarios;
  }

  agregar(usuario:Usuario){

this.usuarios.push(usuario);
  }
}
