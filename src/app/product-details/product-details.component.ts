import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  productDetails: any = {
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
  };

  updateCartItemQuantity(increment: boolean): void {
    if (this.productDetails) {
      if (increment) {
        this.productDetails.quantity++;
      } else {
        this.productDetails.quantity--;
        if (this.productDetails.quantity < 1) {
          this.productDetails.quantity = 1;
        }
      }
      const originalPrice = parseFloat(this.productDetails.originalPrice.price);
      this.productDetails.price = (
        originalPrice * this.productDetails.quantity
      ).toFixed(2);
    }
  }
}
