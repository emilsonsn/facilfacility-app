import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { SessionService } from '@store/session.service';
import { SessionQuery } from '@store/session.query';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;
  private user;

  constructor(
    private fb: FormBuilder,
    private readonly _router: Router,
    private readonly _sessionService : SessionService,
    private readonly _sessionQuery : SessionQuery
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  togglePasswordVisibility() {
    this.hide = !this.hide; // Alterna a visibilidade da senha
  }

  getEmailErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'You must enter an email';
    }
    return this.loginForm.get('email')?.hasError('email') ? 'Invalid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.get('password')?.hasError('required')) {
      return 'Você deve inserir uma senha';
    }
    return this.loginForm.get('password')?.hasError('minlength') ? 'Password must be at least 6 characters long' : '';
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();
      await this._sessionService.login(email, password);

      await lastValueFrom(this._sessionService.getUserFromBack());

      this._sessionQuery.user$.subscribe((user) => {
        this.user = user;
      });

      if(this.user?.company_position?.position === 'Requester')
        this._router.navigate(['/painel/orders']);
      else
        this._router.navigate(['/painel/home']);
    }
  }

}
