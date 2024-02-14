import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private emailActualSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  emailActual$: Observable<string | null> = this.emailActualSubject.asObservable();


  constructor(private auth: Auth) {

  }

  //Registro de usuario
  async register({ email, password }: any) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      //next actualiza los datos a los subscriptores
      //Emite un nuevo valor de email
      this.emailActualSubject.next(email);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }: any) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.emailActualSubject.next(email);
      return user;
    } catch (e) {
      return null;
    }
  }

  async logout() {
    return await signOut(this.auth);
  }}
