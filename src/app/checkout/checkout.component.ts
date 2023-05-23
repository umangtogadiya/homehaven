import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: Array<any> = [];
  couponPercent = 0;
  userDetails: any;
  BillingForm!: FormGroup;
  CouponForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private commonService: CommonService
  ) {
    const userDetailsString = localStorage.getItem('user');
    this.userDetails =
      userDetailsString !== null ? JSON.parse(userDetailsString) : {};
  }

  ngOnInit(): void {
    this.getCart();
    this.BillingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneno: ['', Validators.required],
      companyName: [''],
      address1: ['', Validators.required],
      address2: [''],
      state: ['', Validators.required],
      postal: ['', Validators.required],
      country: ['', Validators.required],

      shippingAddress: [false, Validators.required],
      orderNotes: [''],

      s_firstName: ['', Validators.required],
      s_lastName: ['', Validators.required],
      s_email: ['', Validators.required],
      s_phoneno: ['', Validators.required],
      s_companyName: [''],
      s_address1: ['', Validators.required],
      s_address2: [''],
      s_state: ['', Validators.required],
      s_postal: ['', Validators.required],
      s_country: ['', Validators.required],
    });
    this.CouponForm = this.formBuilder.group({
      code: ['', Validators.required],
    });
  }

  getCart(): void {
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

  placeOrder() {
    console.log('t', this.BillingForm.value);
  }
}
