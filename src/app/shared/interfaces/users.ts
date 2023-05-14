export interface User {
  uid: string;
  firstName?: string;
  lastName?: string;
  email: string;
  emailVerified: boolean;
  phoneNo?: string;
  displayName?: string;
  photoURL?: string;
  address1?: string;
  address2?: string;
  townCity?: string;
  postCode?: string;
  country?: string;
  state?: string;
}
