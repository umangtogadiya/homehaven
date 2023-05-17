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
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsCollection = collection(this.firestore, 'products');
  wishlistCollection = collection(this.firestore, 'wishlist');
  cartCollection = collection(this.firestore, 'cart');

  constructor(public firestore: Firestore, private router: Router) {}

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

  addToCart(productId: string, userId: string): Observable<any> {
    const cartItemQuery = query(
      this.cartCollection,
      where('productId', '==', productId),
      where('userId', '==', userId),
      limit(1)
    );

    return collectionData(cartItemQuery, { idField: 'id' }).pipe(
      map((cartItems: any[]) => {
        if (cartItems.length > 0) {
          return cartItems[0];
        }
        return null;
      })
    );
  }

  addUpdateCart(
    cartItem: any,
    userId: string,
    status: boolean
  ): Observable<any> {
    if (status) {
      const newQuantity = cartItem.qty + 1;
      const cartItemDoc = doc(this.cartCollection, cartItem.id);
      return from(updateDoc(cartItemDoc, { qty: newQuantity }));
    } else {
      const newCartItem = {
        productId: cartItem.id,
        userId,
        price: cartItem.price,
        qty: 1,
      };
      const cartItemDoc = doc(this.cartCollection);
      return from(setDoc(cartItemDoc, newCartItem));
    }
  }

  updateQty(cartItem: any) {
    const cartItemDoc = doc(this.cartCollection, cartItem.id);
    return from(updateDoc(cartItemDoc, { qty: cartItem.qty }));
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
