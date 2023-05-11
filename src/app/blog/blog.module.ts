import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { AppCommonModule } from '../common/app-common.module';

const router: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
];

@NgModule({
  declarations: [BlogComponent],
  imports: [CommonModule, RouterModule.forChild(router), AppCommonModule],
})
export class BlogModule {}
