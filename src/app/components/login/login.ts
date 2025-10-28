import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,  FormGroup,  FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
loginForm: FormGroup;
  signupForm: FormGroup;
  message: string = '';
  isLoading: boolean = false;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

   this.signupForm = this.fb.group({
  nom:      ['', Validators.required],
  prenom:   ['', Validators.required],
  genre:    ['', Validators.required],
  email:    ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  role:     ['', Validators.required]
});
  }

  ngOnInit(): void {}

  // Basculer entre login et signup
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
  }

  // Connexion
  async onLogin() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.message = '';

    try {
      const { email, password } = this.loginForm.value;
     // await this.authService.Login(email, password);
     // this.router.navigate(['/home']); // Redirection après connexion réussie
    } catch (error: any) {
      this.message = this.getErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  // Inscription
  async onSignup() {
    if (this.signupForm.invalid) return;

    this.isLoading = true;
    this.message = '';

    try {
      const { email, password, username } = this.signupForm.value;
      await this.authService.signUp(email, password, username);
      this.message = 'Inscription réussie! Vous pouvez maintenant vous connecter.';
      this.isLoginMode = true; // Basculer vers le mode login après inscription
    } catch (error: any) {
      this.message = this.getErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  // Réinitialisation du mot de passe
  async resetPassword() {
    const email = this.loginForm.get('email')?.value;
    if (!email) {
      this.message = 'Veuillez entrer votre email';
      return;
    }

    this.isLoading = true;
    try {
    await this.authService.resetPassword(email);
      this.message = 'Un email de réinitialisation a été envoyé. Vérifiez votre boîte mail.';
    } catch (error: any) {
      this.message = this.getErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  // Gestion des messages d'erreur
  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Email ou mot de passe incorrect';
      case 'auth/email-already-in-use':
        return 'Cet email est déjà utilisé';
      case 'auth/weak-password':
        return 'Le mot de passe doit faire au moins 6 caractères';
      case 'auth/invalid-email':
        return 'Email invalide';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Veuillez réessayer plus tard.';
      default:
        return 'Une erreur est survenue. Veuillez réessayer.';
    }
  }
}


