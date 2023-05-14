import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  query,
  collectionData,
  setDoc,
  limit,
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

  limitedBlog(lim: number): Observable<any[]> {
    const limitedBlogQuery = query(this.blogsCollection, limit(lim));
    return collectionData(limitedBlogQuery, { idField: 'id' });
  }
}
