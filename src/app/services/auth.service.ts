import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(public auth: AngularFireAuth, public router: Router) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }


  async login(email: string, password: string) {
    var result = await this.auth.signInWithEmailAndPassword(email, password);
    //TODO:Verificar tipo de usuario 
    this.router.navigate(['/afiliados']);
    return result;
  }

  async logout() {
    await this.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

}
