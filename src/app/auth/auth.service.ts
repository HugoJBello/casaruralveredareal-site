import {Injectable} from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AngularFirestore} from 'angularfire2/firestore';
import {FirebaseDbService} from '../firebase-db.service';
import {UserDTO} from '../DTO/userDTO';
import {UtilsParseFromFirebaseService} from '../utils-services/util-parse-firebase.service';
import {DataServiceConfig} from '../data-service-config.service';

import {Observable} from 'rxjs/Observable';
import {CONFIG} from '../config/config';

@Injectable ()
export class AuthService {
  user: Observable<firebase.User>;
  userName: string;
  admins: UserDTO[];

  constructor ( private firebaseAuth: AngularFireAuth , public utilsService: UtilsParseFromFirebaseService ,
                public firebaseDb: FirebaseDbService , private dataServiceConfig: DataServiceConfig ) {

    this.dataServiceConfig.getAdmins ().then ( () => {
      this.admins = this.dataServiceConfig.admins;
    } );
    this.user = firebaseAuth.authState;
  }

  get authenticated () {
    this.userName = this.firebaseAuth.auth.currentUser.displayName;
    if ( this.firebaseAuth.auth.currentUser ) {
      const userDTO = new UserDTO;
      userDTO.email = this.firebaseAuth.auth.currentUser.displayName;
      userDTO.username = this.firebaseAuth.auth.currentUser.displayName;
      userDTO.app_id = CONFIG.APP_ID;
      userDTO.role = 'user';
      this.dataServiceConfig.userDTO = userDTO;

      return true;
    } else {
      return false;
    }
  }

  get isAdmin () {
    if ( this.firebaseAuth.auth.currentUser && this.admins ) {
      return this.userIsAdmin ( this.firebaseAuth.auth.currentUser.email );
    } else {
      return false;
    }
  }

  userIsAdmin ( email: string ) {
    for ( const user of this.admins ) {
      if ( user.email === email ) {
        this.dataServiceConfig.userDTO = user;
        return true;
      }
    }

    const userDTO = new UserDTO;
    userDTO.email = email;
    userDTO.username = this.firebaseAuth.auth.currentUser.displayName;
    userDTO.app_id = CONFIG.APP_ID;
    userDTO.role = 'user';
    this.dataServiceConfig.userDTO = userDTO;
    return false;
  }

  signup ( email: string , password: string ) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword ( email , password )
      .then ( value => {
        console.log ( 'Success!' , value );
      } )
      .catch ( err => {
        console.log ( 'Something went wrong:' , err.message );
      } );
  }

  login () {
    return this.firebaseAuth.auth.signInWithPopup (
      new firebase.auth.GoogleAuthProvider ()
    );

  }

  logout () {
    console.log ( 'user logged out' );
    this.firebaseAuth
      .auth
      .signOut ().then ( function () {
      localStorage.clear ();
    } );
  }
}
