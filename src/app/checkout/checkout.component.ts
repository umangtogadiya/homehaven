import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any;
  couponPercent: number = 0;
  constructor() {
    // this.cartItems = this.dataService.getData();
  }
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
}
