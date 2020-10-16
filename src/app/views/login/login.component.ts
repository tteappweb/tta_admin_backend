import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(private authService: AuthService) {

  }

  email: string = "";
  password: string = "";
  isLoading: boolean = false;
  async handleLogin() {
    this.isLoading = true;
    await this.authService.login(this.email, this.password);
    this.isLoading = false;
  }

}
