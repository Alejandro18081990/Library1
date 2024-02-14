import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  usuarioLogeado !: any;
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    //Utilizo split para recortar la cadena de texto de email usando un delimitador
    //y que aparezca solo la información anterior al @
    //Nos suscribimos a emailActual para poder observar los cambios de usuario en la toolbar
    this.authService.emailActual$.subscribe(email => {
      const recorte = email?.split("@", 1) || '';
      this.usuarioLogeado = recorte;
    })
  }

  async logOut() {
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }

}
