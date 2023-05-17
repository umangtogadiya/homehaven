import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  query,
  collectionData,
  setDoc,
  limit,
  where,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  contactCollection = collection(this.firestore, 'contact');
  newsCollection = collection(this.firestore, 'newsLetter');
  blogsCollection = collection(this.firestore, 'blogs');
  couponCollection = collection(this.firestore, 'coupons');
  testimonialsCollection = collection(this.firestore, 'testimonials');

  constructor(public firestore: Firestore) {}

  contactFormSend(data: any): Observable<void> {
    const contactDocRef = doc(this.contactCollection);
    return from(setDoc(contactDocRef, data));
  }

  subscribeNewsletter(data: any): Observable<any> {
    const contactDocRef = doc(this.newsCollection);
    return from(setDoc(contactDocRef, data));
  }

  getBlogList(): Observable<any[]> {
    return collectionData(this.blogsCollection, { idField: 'id' });
  }

  getTestimonialsList(): Observable<any[]> {
    return collectionData(this.testimonialsCollection, { idField: 'id' });
  }

  limitedBlog(lim: number): Observable<any[]> {
    const limitedBlogQuery = query(this.blogsCollection, limit(lim));
    return collectionData(limitedBlogQuery, { idField: 'id' });
  }

  applyCouponCode(code: string): Observable<any> {
    const couponQuery = query(this.couponCollection, where('code', '==', code));
    return collectionData(couponQuery, { idField: 'id' }).pipe(
      map((coupons: any[]) => {
        if (coupons.length > 0) {
          const coupon = coupons[0];
          const currentDate = new Date();
          const startDate = coupon.startDate.toDate();
          const endDate = coupon.endDate.toDate();

          if (currentDate >= startDate && currentDate <= endDate) {
            return { ...coupon, expStatus: false };
          } else {
            return { ...coupon, expStatus: true };
          }
        } else {
          return { expStatus: true };
        }
      })
    );
  }
}
