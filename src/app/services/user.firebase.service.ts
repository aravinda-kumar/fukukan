// System includes
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';

// Data models
import { UserProfileInterface } from '../datamodel/user-profile.model';

// Inject into root so can use it inside Component constructors
@Injectable({
    providedIn: 'root'
})

// ----------------------------------------------------------------------------
// Firebase Service class
// Include all helpers functions to access Firebase service

export class UserFirebaseService {

    // ------------------------------------------------------------------------
    // Setup relevant interface from Firebase
    // afs: Firestore DB
    // afAuth: Firebase authentication
    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth
    ) { }

    // ------------------------------------------------------------------------
    // CRUD call-back for User Profile Management

    // Create new user
    public createUserProfile(profile: UserProfileInterface): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const currentUser = firebase.auth().currentUser;
            this.afs.collection('userProfile').doc(currentUser.uid).set(profile)
                .then(
                    res => resolve(res),
                    err => reject(err)
                );
        });
    }

    // Retrieve user profile
    // This is returning a promise which will resolve the data collecting from the collection
    // Resolve function is sending an UserProfileInterface object
    public getUserProfile(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    this.afs.collection('userProfile').doc<UserProfileInterface>(currentUser.uid).valueChanges().subscribe(snapshots => {
                        resolve(snapshots);
                    }, err => {
                        reject(err);
                    });
                }
            });
        });
    }

}
