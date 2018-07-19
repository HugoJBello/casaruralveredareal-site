import {Injectable} from '@angular/core';
import {FirebaseDbService} from './firebase-db.service';
import {UserDTO} from './DTO/userDTO';
import {ConfigDTO} from './DTO/configDTO';
import {UtilsParseFromFirebaseService} from './utils-services/util-parse-firebase.service';
import {Observable} from 'rxjs/Observable';

@Injectable ()
export class DataServiceConfig {
  admins: UserDTO[];
  configDTO: ConfigDTO;
  configDTO$: Observable<ConfigDTO>;

  user: string;
  userDTO: UserDTO;

  constructor ( public firebaseDb: FirebaseDbService, public utilsService: UtilsParseFromFirebaseService ) {
    this.getConfigAndUsers ();
  }

  getConfigAndUsers () {
  }

  getConfig (): Promise<any> {
    return new Promise<any> ( ( resolve ) => {
      if ( !this.configDTO ) {
        console.log ( this.configDTO );
        var obsConfig: Observable<any>;
        obsConfig = this.firebaseDb.getConfig ();
        obsConfig.subscribe ( ( data ) => {
          this.setConfigDTO ( data );
          return resolve ();
        } );
      } else {
        return resolve ();
      }
    } );
  }

  getAdmins () {
    return new Promise<any> ( ( resolve ) => {
      if ( !this.admins ) {
        var obsAdmins: Observable<any>;
        obsAdmins = this.firebaseDb.getAdminList ();
        obsAdmins.subscribe ( ( data ) => {
          this.setAdmins ( data );
          return resolve ();
        } );
      }
    } );
  }

  setConfigDTO ( data ) {
    this.configDTO = this.utilsService.parseConfigFromFirebase ( data );
  }

  setAdmins ( data ) {
    this.admins = this.utilsService.parseListUsersFirebase ( data );
  }
}
