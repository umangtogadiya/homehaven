import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
  },
];

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CartModule {}
