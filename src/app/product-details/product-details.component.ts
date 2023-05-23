import { Component, AfterViewInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements AfterViewInit {
  productDetails: any;
  userDetails: any;
  isExpanded = false;
  wordThreshold = 220;

  constructor(
    private productService: ProductService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const userDetailsString = localStorage.getItem('user');
    this.userDetails =
      userDetailsString !== null ? JSON.parse(userDetailsString) : {};
    const id: string = this.route.snapshot.paramMap.get('id');
    this.getProduct(id);
  }

  ngAfterViewInit(): void {
    const squares = Array.from(document.querySelectorAll('.square'));
    const gradientColors = [
      '#455C53',
      '#505C57',
      '#275C57',
      '#3B5D50',
      '#3B5D50',
      '#3B5D50',
      '#275C57',
      '#505C57',
      '#455C53',
    ];
    squares.forEach((square: HTMLElement, index: number) => {
      Object.assign(square.style, {
        backgroundColor: gradientColors[index],
        animationDelay: `${index * 0.125}s`,
      });
    });
  }

  getProduct(id: string): void {
    this.productService.getProductDetails(id, this.userDetails.uid).subscribe({
      next: (res: any) => {
        if (res) {
          this.productDetails = res;
        } else {
          this.router.navigateByUrl('/shop');
        }
      },
      error: (err: any) => {
        console.log('err', err);
      },
    });
  }

  addToCart(): void {
    if (this.authService.isLoggedIn) {
      this.productService
        .addToCart(this.productDetails.id, this.userDetails.uid)
        .pipe(take(1))
        .subscribe((res: any) => {
          this.productService
            .addUpdateCart(
              res ? res : this.productDetails,
              this.userDetails.uid,
              res ? true : false
            )
            .subscribe((added: any) => {
              this.router.navigate(['/cart']);
            });
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateCartItemQuantity(productId: string, increment: boolean): void {
    this.productService
      .addToCart(productId, this.userDetails.uid)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res) {
          const updatedQty = increment ? res.qty + 1 : Math.max(res.qty - 1, 1);
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

  // Set the product description
  setProductDescription(description: string) {
    this.productDetails.description = description;
  }

  // Toggle the expanded state
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  // Check if the description exceeds the word threshold
  isDescriptionLong(): boolean {
    return this.productDetails.description.length > this.wordThreshold;
  }
}
