import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../shared/services/common.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  NewLetterFrom!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.NewLetterFrom = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.NewLetterFrom.valid) {
      console.log(this.NewLetterFrom.value);
      this.commonService
        .subscribeNewsletter(this.NewLetterFrom.value)
        .subscribe((res: any) => {
          console.log('res', res);
        });
    }
  }
}
