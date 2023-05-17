import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { take } from 'rxjs';
import { CommonService } from '../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: Array<any> = [];
  couponPercent: number = 0;
  userDetails: any;
  CouponForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) {
    const userDetailsString = localStorage.getItem('user');
    this.userDetails =
      userDetailsString !== null ? JSON.parse(userDetailsString) : {};
  }

  ngOnInit(): void {
    this.wishlist();
    this.CouponForm = this.formBuilder.group({
      code: ['', Validators.required],
    });
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
      const productPrice = parseFloat(product.productDetails?.price);
      const productQty = parseInt(product.qty);
      totalPrice += productPrice * productQty;
    }
    const discount = totalPrice * (this.couponPercent / 100);
    totalPrice -= discount;
    return totalPrice.toFixed(2);
  }

  applyCoupon(): void {
    if (this.CouponForm.valid) {
      this.commonService
        .applyCouponCode(this.CouponForm.value['code'])
        .subscribe((res: any) => {
          if (!res.expStatus) {
            this.couponPercent = res.discount;
          } else {
            // set coupon expire or invalid code
          }
        });
    }
  }

  couponTotal(): string {
    let totalAmount = 0;
    for (const item of this.cartItems) {
      const price = parseFloat(item.productDetails.price);
      const quantity = parseInt(item.qty);
      totalAmount += price * quantity;
    }
    const discountAmount = (totalAmount * this.couponPercent) / 100;
    return discountAmount.toFixed(2);
  }

  removeFromCart(id: string): void {
    this.productService.removeFromCart(id).subscribe((res: any) => {
      console.log('deleted', res);
    });
  }

  updateCartItemQuantity(productId: string, increment: boolean): void {
    this.productService
      .addToCart(productId, this.userDetails.uid)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res) {
          var updatedQty = increment ? res.qty + 1 : Math.max(res.qty - 1, 1);
          this.updateCart({ ...res, qty: updatedQty });
        } else {
          // item removed from cart
        }
      });
  }

  updateCart(res: any) {
    this.productService.updateQty(res).subscribe((added: any) => {
      console.log('added', added);
    });
  }

  checkout(): void {
    // this.dataService.setData(this.cartItems);
  }
}
