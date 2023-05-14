import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: Array<any> = [];
  couponPercent: number = 0;
  userDetails: any;
  constructor(private productService: ProductService) {
    const userDetailsString = localStorage.getItem('user');
    this.userDetails =
      userDetailsString !== null ? JSON.parse(userDetailsString) : {};
  }
  ngOnInit(): void {
    this.wishlist();
  }

  wishlist(): void {
    this.productService
      .getCartWithProductsDetails(this.userDetails.uid)
      .subscribe((res: any[]) => {
        this.cartItems = res;
      });
  }

  cartTotal(): string {
    let totalPrice = 0;
    for (const product of this.cartItems) {
      totalPrice +=
        parseFloat(product.productDetails.price) * parseInt(product.qty);
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

  couponTotal(): string {
    let totalAmount: number = 0;
    for (const item of this.cartItems) {
      const price: number = parseFloat(item.productDetails.price);
      const quantity: number = parseInt(item.qty);
      totalAmount += price * quantity;
    }
    const discountAmount: number = totalAmount * (this.couponPercent / 100);
    return discountAmount.toFixed(2);
  }

  removeFromCart(id: string): void {
    this.productService.removeFromCart(id).subscribe((res: any) => {
      console.log('deleted', res);
    });
  }

  updateCartItemQuantity(itemId: number, increment: boolean): void {
    const item = this.cartItems.find((item) => item.id === itemId);
    if (item) {
      item.qty = increment ? item.qty + 1 : Math.max(item.qty - 1, 1);
    }
  }

  checkout(): void {
    // this.dataService.setData(this.cartItems);
  }
}
