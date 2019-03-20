// System includes
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Data models
import { ArmyListInterface } from '../datamodel/army.model';
import { ArmyListPage } from '../army/browse/armylist.page';

// Inject into root so can use it inside Component constructors
@Injectable({
    providedIn: 'root'
})

// ----------------------------------------------------------------------------
// Firebase Service class
// Include all helpers functions to access Firebase service

export class ArmyFirebaseService {

    // ------------------------------------------------------------------------
    // Setup relevant interface from Firebase
    // afs: Firestore DB
    // afAuth: Firebase authentication
    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth
    ) { }

    // ------------------------------------------------------------------------
    // CRUD call-back for ArmyList Management

    // Create new armylist
    public createCurrentUserArmyList(list: ArmyListInterface): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const currentUser = firebase.auth().currentUser;
            this.afs.collection('army').doc(currentUser.uid).collection('list').add(list)
                .then(
                    res => resolve(res),
                    err => reject(err)
                );
        });
    }

    // Retrieve army list for a given user
    // This is returning a promise which will resolve the data collecting from the collection
    // Resolve function is sending an array of ArmyListInterface object
    public getCurrentUserArmyList(): Observable<ArmyListInterface[]> {
        let armyLst: Observable<ArmyListInterface[]> = null;
        const currentUser = firebase.auth().currentUser;

        if (currentUser) {
            armyLst = this.afs.collection('army').doc(currentUser.uid).collection<ArmyListInterface>('list').
                snapshotChanges().pipe(
                    map(actions => {
                        return actions.map(a => {
                            const data = a.payload.doc.data();
                            const id = a.payload.doc.id;
                            return { id, ...data };
                        });
                    })
                );
        }
        return armyLst;
    }
}
