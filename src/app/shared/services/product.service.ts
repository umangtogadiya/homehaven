import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  collectionData,
  limit,
  doc,
  where,
  deleteDoc,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsCollection = collection(this.firestore, 'products');
  wishlistCollection = collection(this.firestore, 'wishlist');
  cartCollection = collection(this.firestore, 'cart');

  constructor(public firestore: Firestore) {}

  allProducts(): Observable<any[]> {
    return collectionData(this.productsCollection, { idField: 'id' });
  }

  limitedProducts(lim: number): Observable<any[]> {
    const limitedProductsQuery = query(this.productsCollection, limit(lim));
    return collectionData(limitedProductsQuery, { idField: 'id' });
  }

  getCartWithProductsDetails(userId: string): Observable<any[]> {
    const cartQuery = query(this.cartCollection, where('userId', '==', userId));
    return collectionData(cartQuery, { idField: 'id' }).pipe(
      switchMap((cartItems: any[]) => {
        return collectionData(this.productsCollection, { idField: 'id' }).pipe(
          map((products: any[]) => {
            return cartItems.map((item: any) => ({
              ...item,
              productDetails: products.find(
                (p: any) => p.id === item.productId
              ),
            }));
          })
        );
      })
    );
  }

  removeFromCart(itemId: string): Observable<void> {
    const cartItemRef = doc(this.firestore, 'cart', itemId);
    return from(deleteDoc(cartItemRef));
  }

  getWishlistWithProductDetails(userId: string): Observable<any[]> {
    const wishlistQuery = query(
      this.wishlistCollection,
      where('userId', '==', userId)
    );
    return collectionData(wishlistQuery, { idField: 'id' }).pipe(
      switchMap((wishlistItems: any[]) => {
        return collectionData(this.productsCollection).pipe(
          map((products: any[]) => {
            return wishlistItems.map((item: any) => {
              const product = products.find(
                (p: any) => p.id === item.productId
              );
              return {
                ...item,
                productDetails: product,
              };
            });
          })
        );
      })
    );
  }
}
