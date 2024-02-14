import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from '../interfaces/libro';
import { LibreriaService } from '../services/libreria.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.page.html',
  styleUrls: ['./detalle-libro.page.scss'],
})
export class DetalleLibroPage implements OnInit {

  idRecibida !: number;
  libroRecibido !: Libro;

  constructor(private route: ActivatedRoute, private libreriaService: LibreriaService, private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => { this.idRecibida = params['libro.id'] });
    this.get();
  }

  get() {
    this.libreriaService.getOne(this.idRecibida).subscribe(libro => {
      this.libroRecibido = libro
    });
  }

  addLibro() {
    this.firebaseService.addLibro(this.libroRecibido);
    this.router.navigate(['mis-libros']);
  }
}
