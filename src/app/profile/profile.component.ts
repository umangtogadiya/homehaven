import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userId: string = '';
  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService
      .profileDetailsById('EGK3TS5yJ7N5fp2CUAbBB1CXvSE2')
      .subscribe((data) => {
        console.log('Projected user data:', data);
        this.userId = data.id;
        this.profileForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNo: data.phoneNo,
          address1: data.address1,
          address2: data.address2,
          townCity: data.townCity,
          postCode: data.postCode,
          country: data.country,
          state: data.state,
        });
      });
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      townCity: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  profileSave(): void {
    if (this.profileForm.valid) {
      this.userService
        .profileUpdate(this.userId, this.profileForm.value)
        .subscribe((res: any) => {
          console.log('res', res);
        });
    }
  }
}
