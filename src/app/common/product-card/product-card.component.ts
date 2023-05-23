import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { take } from 'rxjs';
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
  @Input() col = 3;

  userDetails: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private productService: ProductService
  ) {
    const userDetailsString = localStorage.getItem('user');
    this.userDetails =
      userDetailsString !== null ? JSON.parse(userDetailsString) : {};
  }

  addToCart(item: any): void {
    if (this.authService.isLoggedIn) {
      this.productService
        .addToCart(item.id, this.userDetails.uid)
        .pipe(take(1))
        .subscribe((res: any) => {
          this.productService
            .addUpdateCart(
              res ? res : item,
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
}
