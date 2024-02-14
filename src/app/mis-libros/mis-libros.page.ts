import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { LoadingController } from '@ionic/angular';
import { Libro } from '../interfaces/libro';

@Component({
  selector: 'app-mis-libros',
  templateUrl: './mis-libros.page.html',
  styleUrls: ['./mis-libros.page.scss'],
})
export class MisLibrosPage implements OnInit {

  misLibros !: Libro[];

  constructor(private firebaseService: FirebaseService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    const loading = await this.loadingCtrl.create({ message: "Cargando espero por favor...", duration: 6000 });
    loading.present();
    this.firebaseService.getAll().subscribe(libros => {
      this.misLibros = libros;
      this.loadingCtrl.dismiss();
    });
  }

  deleteLibro(idFB: string) {
    this.firebaseService.deleteLibro(idFB);
  }
}
