import { Component, OnInit } from '@angular/core';
import { LibreriaService } from '../services/libreria.service';
import { Libro } from '../interfaces/libro';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  catalogo !: Libro[];

  constructor(private libreriaService: LibreriaService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.libreriaService.getAll().subscribe(libros => {
      this.catalogo = libros
    });
  }

}
