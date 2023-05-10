import { Component, Input } from '@angular/core';

interface items {
  id: number;
  title: string;
  description: string;
  price: string;
  img: string;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() Items: Array<items> = [];
  @Input() col: number = 3;
}
