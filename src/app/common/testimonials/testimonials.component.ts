import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  Items: Array<any> = [];

  constructor(private commonService: CommonService) {
    this.getTestimonials();
  }

  getTestimonials() {
    this.commonService.getTestimonialsList().subscribe((res) => {
      this.Items = res;
    });
  }

  prevSlide() {
    const slider = document.querySelector('.testimonial-slider') as HTMLElement;
    slider.scrollBy({ left: -slider.offsetWidth, behavior: 'smooth' });
  }

  nextSlide() {
    const slider = document.querySelector('.testimonial-slider') as HTMLElement;
    slider.scrollBy({ left: slider.offsetWidth, behavior: 'smooth' });
  }
}
