import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IUser } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  redirectUrl: string | null = null;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.usersCollection = db.collection("users")
    this.isAuthenticated$ = auth.authState.pipe(
      map(user => !!user)
    );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    );
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error("Password not provided");
    }

    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );

      if (!userCred.user) {
        throw new Error("User not found");
      }

      await this.usersCollection.doc(userCred.user.uid).set({
        name: userData.name,
        email: userData.email,
        age: userData.age,
        phoneNumber: userData.phoneNumber,
      });

      await userCred.user.updateProfile({
        displayName: userData.name,
      });

      // Navigate to the redirect URL or a default route
      this.router.navigate([this.redirectUrl || '/']);

    } catch (error) {
      console.error("Error creating user:", error); // Log the error for debugging
      throw error; // Re-throw the error to be handled by the calling component
    }
  }

  public async logout() {
      await this.auth.signOut();
      // Optional: Redirect to a specific route after logout
      this.router.navigate(['/']);
  }


  // Store the redirect URL
  storeRedirectUrl(url: string) {
    this.redirectUrl = url;
  }
}
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IUser } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  redirectUrl: string | null = null;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.usersCollection = db.collection("users")
    this.isAuthenticated$ = auth.authState.pipe(
      map(user => !!user)
    );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    );
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error("Password not provided");
    }

    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );

      if (!userCred.user) {
        throw new Error("User not found");
      }

      await this.usersCollection.doc(userCred.user.uid).set({
        name: userData.name,
        email: userData.email,
        age: userData.age,
        phoneNumber: userData.phoneNumber,
      });

      await userCred.user.updateProfile({
        displayName: userData.name,
      });

      // Navigate to the redirect URL or a default route
      this.router.navigate([this.redirectUrl || '/']);

    } catch (error) {
      console.error("Error creating user:", error); // Log the error for debugging
      throw error; // Re-throw the error to be handled by the calling component
    }
  }

  public async logout() {
      await this.auth.signOut();
      // Optional: Redirect to a specific route after logout
      this.router.navigate(['/']);
  }


  // Store the redirect URL
  storeRedirectUrl(url: string) {
    this.redirectUrl = url;
  }
}
//     )
//   }
//   public async createUser(userData: IUser) {
//     if (!userData.password) {
//       throw new Error("Password not provided")
//     }
//     const userCred = await this.auth.createUserWithEmailAndPassword(
//       userData.email,
//       userData.password
//     )
//     if (!userCred.user?.uid) {
//       throw new Error("User not found")
//     }
//     await this.usersCollection.doc(userCred.user?.uid).set({
//       name: userData.name,
//       email: userData.email,
//       age: userData.age,
//       phoneNumber: userData.phoneNumber,
//     })
//     await userCred.user.updateProfile({
//       displayName: userData.name,
//     })
//   }
// }
