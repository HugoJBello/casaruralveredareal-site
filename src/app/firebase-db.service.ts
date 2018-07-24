import {Injectable} from '@angular/core';
import {CONFIG} from './config/config';
import {AngularFirestore , AngularFirestoreCollection} from 'angularfire2/firestore';
import {UserDTO} from './DTO/userDTO';
import {ConfigDTO} from './DTO/configDTO';
import {Observable} from 'rxjs/Observable';
import {EntryDTO} from './DTO/entryDTO';

@Injectable ( {
  providedIn: 'root'
} )
export class FirebaseDbService {
  private appId = CONFIG.APP_ID;
  private ENTRIES_COLLECTION = 'entries-' + this.appId;
  private FILES_COLLECTION = 'files-' + this.appId;
  private CONFIG_COLLECTION = 'config-' + this.appId;
  private USERS_COLLECTION = 'users';
  private VISIT_COUNT_COLLECTION = 'visit-count-' + this.appId;
  private CATEGORIES_COLLECTION = 'categories-' + this.appId;
  private ENTRIES_METADATA_COUNT_COLLECTION = 'entries-metadata-' + this.appId;

  constructor ( public db: AngularFirestore ) {
  }

  getEntry ( entryName: string ): Observable<any> {
    return this.db.collection<any> ( this.ENTRIES_COLLECTION , ref => ref.where ( 'app_id' , '==' , this.appId )
      .where ( 'name' , '==' , entryName ) ).valueChanges ();
  }

  deleteEntry ( entryDTO: EntryDTO ): Promise<any> {
    return this.db.collection ( this.ENTRIES_COLLECTION , ref => ref.where ( 'app_id' , '==' , this.appId ) )
      .doc ( entryDTO.name ).delete ();
  }

  postEntry ( entryDTO: EntryDTO ): Promise<any> {
    return this.db.collection ( this.ENTRIES_COLLECTION , ref => ref.where ( 'app_id' , '==' , this.appId ) )
      .doc ( entryDTO.name ).set ( Object.assign ( {} , entryDTO ) );
  }

  saveConfig ( configDTO: ConfigDTO ): Promise<any> {
    return this.db.collection ( this.CONFIG_COLLECTION ).doc ( this.appId ).set ( Object.assign ( {} , configDTO ) );
  }

  saveAdminUser ( user: UserDTO ): Promise<any> {
    return this.db.collection ( this.USERS_COLLECTION ).doc ( user.username ).set ( Object.assign ( {} , user ) );
  }

  getConfig (): Observable<any> {
    return this.db.collection<any> ( this.CONFIG_COLLECTION , ref => ref.where ( 'app_id' , '==' , this.appId ) )
      .valueChanges ();
  }

  getAdminList (): Observable<any> {
    return this.db.collection ( this.USERS_COLLECTION , ref => ref.where ( 'role' , '==' , 'admin' )
      .where ( 'app_id' , '==' , this.appId ) ).valueChanges ();
  }

  getUser ( email: string ): Observable<any> {
    return this.db.collection ( this.USERS_COLLECTION , ref => {
      return ref.where ( 'email' , '==' , email )
        .where ( 'app_id' , '==' , this.appId );
    } ).valueChanges ();
  }


}
