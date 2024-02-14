import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from '../interfaces/libro';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  idRecibida !: string;
  libroConsultado !: Libro ;
  //Propiedas a editar del libro
  titulo !: string;
  autor !: string;
  sinopsis !: string;
  anioPublicacion !: number;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => { this.idRecibida = params['libro.idFB'] 
    console.log(this.idRecibida);
  });
    
    this.get();
  }


  get() {
    this.firebaseService.get(this.idRecibida).subscribe(libro => {
      this.libroConsultado = libro!;
      console.log(this.libroConsultado);
    });
  }

  set() {
    if (!this.libroConsultado || this.libroConsultado.id === undefined || this.libroConsultado.idFB === undefined) {
      console.error("Error: El libro consultado no tiene un ID definido.");
      return;
    }
    const libroModificado = {
      id: this.libroConsultado.id,
      idFB: this.libroConsultado?.idFB,
      titulo: this.titulo,
      autor: this.autor,
      sinopsis: this.sinopsis,
      anioPublicacion: this.anioPublicacion
    }
    this.firebaseService.set(libroModificado)
  }
}
