import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../shared/services/common.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  ContactFrom!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.ContactFrom = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.ContactFrom.valid) {
      console.log(this.ContactFrom.value);
      this.commonService
        .contactFormSend(this.ContactFrom.value)
        .subscribe((res: any) => {
          console.log('res', res);
        });
    }
  }
}
