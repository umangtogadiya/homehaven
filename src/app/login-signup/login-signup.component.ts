import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
  categories: any[] = [];
  loginForm!: FormGroup;
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
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
      // Perform login logic here
    }
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      // Perform login logic here
    }
  }
}
