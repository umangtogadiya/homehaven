import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersCollection = collection(this.firestore, 'users');
  constructor(public firestore: Firestore) {}
  /**
   * where query parameters
   * const q = query(this.usersCollection, where('email', '==', emailId));
   */

  profileDetailsById(userId: string): Observable<any> {
    const userDocRef = doc(this.usersCollection, userId);
    return from(getDoc(userDocRef)).pipe(
      map((snapshot) => {
        const userData: any = snapshot.data();
        const projectedData: any = { id: snapshot.id };
        const keys: any[] = [
          'firstName',
          'lastName',
          'email',
          'emailVerified',
          'photoURL',
          'phoneNo',
          'address1',
          'address2',
          'townCity',
          'postCode',
          'country',
          'state',
        ];
        keys.forEach((key) => {
          projectedData[key] = userData[key];
        });
        return projectedData;
      })
    );
  }

  profileUpdate(userId: string, newData: any): Observable<void> {
    const userDocRef = doc(this.usersCollection, userId);
    return from(setDoc(userDocRef, newData));
  }
}
