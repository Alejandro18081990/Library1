import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Libro } from '../interfaces/libro';
import { AuthService } from './auth.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usuario !: string;

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  addLibro(libro: Libro) {
    this.authService.emailActual$.pipe(take(1)).subscribe(email => {
      this.usuario = email || '';
    });
    const idDocumento = this.firestore.createId();
    return this.firestore.collection(this.usuario).doc(idDocumento).set({
      id: libro.id,
      titulo: libro.titulo,
      sinopsis: libro.sinopsis,
      autor: libro.autor,
      anioPublicacion: libro.anioPublicacion,
      idFB: idDocumento
    })
  }

  getAll(): Observable<Libro[]> {
    this.authService.emailActual$.pipe(take(1)).subscribe(email => {
      this.usuario = email || '';
    });
    return this.firestore.collection<Libro>(this.usuario).valueChanges();
  }

  deleteLibro(idFB: string) {
    this.authService.emailActual$.pipe(take(1)).subscribe(email => {
      this.usuario = email || '';
    });
    const productoDoc = this.firestore.collection(this.usuario).doc(idFB);
    return productoDoc.delete();
  }

  get(idFB: string): Observable<Libro | undefined> {
    this.authService.emailActual$.pipe(take(1)).subscribe(email => {
      this.usuario = email || '';
    });
    return this.firestore.collection<Libro>(this.usuario).doc(idFB).valueChanges();
  }

  set(libroAModificar: Libro) {
    this.authService.emailActual$.pipe(take(1)).subscribe(email => {
      this.usuario = email || '';
    });
    return this.firestore.collection<Libro>(this.usuario).doc(libroAModificar.idFB).update(libroAModificar);
  }
}
