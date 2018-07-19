import {Injectable} from '@angular/core';
import {DataServiceConfig} from './data-service-config.service';
import {ConfigDTO} from './DTO/configDTO';
import {UserDTO} from './DTO/userDTO';
import {FirebaseDbService} from './firebase-db.service';
import {CONFIG} from './config/config';
import {Observable} from 'rxjs/Observable';
import {config} from '@fortawesome/fontawesome-svg-core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable ()
export class InstallationService {
  configDTO: ConfigDTO;
  admins: UserDTO[];
  appIsUninstalled = false;

  appIsUninstalled$: BehaviorSubject<boolean> = new BehaviorSubject ( true );
  installationMessages$: BehaviorSubject<string> = new BehaviorSubject ( '' );

  constructor ( private dataServiceConfig: DataServiceConfig , public firebaseDb: FirebaseDbService ) {
    this.dataServiceConfig.getConfig ().then ( () => {
      this.configDTO = this.dataServiceConfig.configDTO;
      this.dataServiceConfig.getAdmins ().then ( () => {
        this.admins = this.dataServiceConfig.admins;
      } );
    } );
  }

  findOutIfUninstalled () {
    const uninst = !this.configDTO.app_id && ( !this.admins || ( this.admins.length === 0 ) );
    this.appIsUninstalled$.next ( uninst );
    return uninst;
  }

  installAdminDefaultUsersAndBasicConf () {
    for ( const user of CONFIG.APP_ADMIN_ACCOUNTS ) {
      const userDTO: UserDTO = new UserDTO;
      userDTO.username = user.username;
      userDTO.email = user.email;
      userDTO.role = 'admin';
      userDTO.app_id = CONFIG.APP_ID;

      const configDTO: ConfigDTO = new ConfigDTO;
      configDTO.app_id = CONFIG.APP_ID;
      configDTO.app_name = CONFIG.APP_NAME;
      configDTO.banner_color = CONFIG.DEFAULT_BANNER_COLOR;
      configDTO.navbar_background_color = CONFIG.DEFAULT_NAVBAR_COLOR;
      configDTO.app_owner = CONFIG.APP_NAME;
      configDTO.show_banners = false;
      configDTO.show_tags_banner = false;
      configDTO.special_tags = [];
      configDTO.banners = [];

      this.firebaseDb.saveAdminUser ( userDTO ).then ( () => {
        console.log ( 'admin user ' + userDTO.username + ' added' );
        this.installationMessages$.next ( 'admin user ' + userDTO.username + ' added' );

        this.firebaseDb.saveConfig ( configDTO ).then ( () => {
          console.log ( 'basic config added' );
          this.installationMessages$.next ( 'basic config added' );

          this.appIsUninstalled$.next ( false );
        } );
      } );
    }

  }

}
