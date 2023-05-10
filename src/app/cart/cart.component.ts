import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: Array<any> = [
    {
      id: 1,
      name: 'Product 1',
      img: 'product-1.png',
      description: 'lorem ipsum dolor sit amet, consectetur adip',
      originalPrice: {
        quantity: 2,
        price: '49.00',
      },
      quantity: 2,
      price: '98.00',
    },
    {
      id: 2,
      name: 'Product 2',
      img: 'product-3.png',
      description: 'lorem ipsum dolor sit amet, consectetur adip',
      originalPrice: {
        quantity: 4,
        price: '23.00',
      },
      quantity: 4,
      price: '92.00',
    },
  ];
  couponPercent: number = 0;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {}

  cartTotal(): string {
    let totalPrice = 0;
    for (const product of this.cartItems) {
      totalPrice += parseInt(product.price);
    }
    if (this.couponPercent > 0) {
      const discount = totalPrice * (this.couponPercent / 100);
      totalPrice -= discount;
    }
    return totalPrice.toFixed(2);
  }

  applyCoupon(): void {
    this.couponPercent = 20;
  }

  removeFromCart(id: number): void {
    const index = this.cartItems.findIndex((item) => item.id === id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  updateCartItemQuantity(itemId: number, increment: boolean): void {
    const item = this.cartItems.find((item) => item.id === itemId);
    if (item) {
      if (increment) {
        item.quantity++;
      } else {
        item.quantity--;
        if (item.quantity < 1) {
          item.quantity = 1;
        }
      }
      const originalPrice = parseFloat(item.originalPrice.price);
      item.price = (originalPrice * item.quantity).toFixed(2);
    }
  }

  checkout(): void {
    this.dataService.setData(this.cartItems);
  }
}
