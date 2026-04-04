import { Component,Input ,OnInit,Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-saludo',
  standalone:true,
  imports: [],
  templateUrl: './saludo.html',
  styleUrl: './saludo.css',
})
export class Saludo implements OnInit{
 @Input() nombre!:string;
  @Input() edad!:number;
  @Input() direccion!:string;
  @Output() enviarNombre= new EventEmitter<string>();
  enviar(){
      this.enviarNombre.emit(this.nombre.toUpperCase());

  }
ngOnInit(): void {
  
  console.log(this.nombre,this.edad,this.direccion);
}
}

 
