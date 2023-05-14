import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
  categories: any[] = [];
  loginForm!: FormGroup;
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    const signUpButton: any = document.getElementById('signUp');
    const signInButton: any = document.getElementById('signIn');
    const container: any = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        Validators.required,
        // Validators.minLength(8),
        // Validators.pattern(
        //   /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
        // ),
      ],
    });
  }

  signIn(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const { email, password } = this.loginForm.value;
      this.authService.SignIn(email, password);
    }
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      this.authService
        .SignUp(this.signUpForm.value)
        .then((res: any) => {
          console.log('res', res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }
}
