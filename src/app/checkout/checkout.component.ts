import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../shared/services/product.service';
import { CommonService } from '../shared/services/common.service';
import { Router } from '@angular/router';

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

  couponTotal: any;
  total: any;
  subTotal: any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private commonService: CommonService,
    private router: Router
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

      // s_firstName: ['', Validators.required],
      // s_lastName: ['', Validators.required],
      // s_email: ['', Validators.required],
      // s_phoneno: ['', Validators.required],
      // s_companyName: [''],
      // s_address1: ['', Validators.required],
      // s_address2: [''],
      // s_state: ['', Validators.required],
      // s_postal: ['', Validators.required],
      // s_country: ['', Validators.required],
    });
    this.CouponForm = this.formBuilder.group({
      code: ['', Validators.required],
    });
  }

  getCart(): void {
    this.productService
      .getCartWithProductsDetails(this.userDetails.uid)
      .subscribe((res: any[]) => {
        if (res && res.length > 0) {
          this.cartItems = res;
          this.cartCalculation();
        } else {
          this.router.navigateByUrl('/cart');
        }
      });
  }

  cartCalculation(): void {
    let totalPrice = 0;
    for (const product of this.cartItems) {
      const productPrice = parseFloat(product.productDetails?.price);
      const productQty = parseInt(product.qty);
      totalPrice += productPrice * productQty;
    }
    this.subTotal = totalPrice.toFixed(2);
    this.couponTotal = (totalPrice * (this.couponPercent / 100)).toFixed(2);
    totalPrice -= this.couponTotal;
    this.total = totalPrice.toFixed(2);
  }

  applyCoupon(): void {
    if (this.CouponForm.valid) {
      this.commonService
        .applyCouponCode(this.CouponForm.value['code'])
        .subscribe((res: any) => {
          if (!res.expStatus) {
            this.couponPercent = res.discount;
            this.cartCalculation();
          } else {
            // set coupon expire or invalid code
          }
        });
    }
  }

  finalOrder() {
    if (this.BillingForm.valid) {
      const order = { ...this.BillingForm.value };
      order.userId = this.userDetails.uid;
      order.items = this.cartItems;
      order.total = this.total;
      order.subtotal = this.subTotal;
      order.couponInfo = {
        percent: this.couponPercent,
        code: this.CouponForm.value['code'],
      };
      order.couponTotal = this.couponTotal;
      order.status = 'Pending';
      this.productService.checkoutOrder(order).subscribe(() => {
        this.productService
          .removeCartItems(this.userDetails.uid)
          .subscribe((fc: any) => {
            console.log('fc', fc);
          });
      });
    }
  }
}
