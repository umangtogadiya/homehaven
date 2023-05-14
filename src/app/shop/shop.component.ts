import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

interface items {
  id: number;
  title: string;
  description: string;
  price: string;
  img: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  productItems: Array<items> = [
    {
      id: 1,
      title: 'Nordic Chair',
      description:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio',
      price: '50.00',
      img: 'product-3.png',
    },
    {
      id: 2,
      title: 'Kruzo Aero Chair',
      description:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio',
      price: '78.00',
      img: 'product-1.png',
    },
    {
      id: 3,
      title: 'Ergonomic Chair',
      description:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio',
      price: '43.00',
      img: 'product-2.png',
    },
    {
      id: 4,
      title: 'Ergonomic Chair',
      description:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio',
      price: '43.00',
      img: 'product-1.png',
    },
    {
      id: 5,
      title: 'Ergonomic Chair',
      description:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio',
      price: '43.00',
      img: 'product-3.png',
    },
    {
      id: 6,
      title: 'Ergonomic Chair',
      description:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio',
      price: '43.00',
      img: 'product-2.png',
    },
    {
      id: 7,
      title: 'Ergonomic Chair',
      description:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio',
      price: '43.00',
      img: 'product-3.png',
    },
    {
      id: 8,
      title: 'Ergonomic Chair',
      description:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio',
      price: '43.00',
      img: 'product-1.png',
    },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.allProducts().subscribe((res: any[]) => {
      this.productItems = res;
    });
  }
}
