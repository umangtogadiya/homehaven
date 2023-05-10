import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { BlogCardComponent } from './blog-card/blog-card.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    TestimonialsComponent,
    BlogCardComponent,
    BlogCardComponent,
  ],
  imports: [CommonModule],
  exports: [
    ProductCardComponent,
    TestimonialsComponent,
    BlogCardComponent,
    CommonModule,
  ], // export both the SliderComponent and CommonModule
})
export class AppCommonModule {}
