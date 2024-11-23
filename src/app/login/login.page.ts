import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService, IUser } from '../services/authentication/auth.service';
import { IonicModule } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule
  ]
})

export class LoginPage implements OnInit {

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  user: Partial<IUser> = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}



  async login() {
    this.errorMessage = '';
    try {
      await this.authService.signInWithEmailAndPassword(this.user);
      this.router.navigate(['/car-list']);
    } catch (error) {
      this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
      console.error(error);
    }
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }
}
