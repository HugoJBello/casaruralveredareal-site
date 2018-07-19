import {Component , OnInit , HostListener} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {CONFIG} from '../config/config';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ConfigDTO} from '../DTO/configDTO';
import {UtilsParseFromFirebaseService} from '../utils-services/util-parse-firebase.service';
import {Title} from '@angular/platform-browser';
import {DataServiceConfig} from '../data-service-config.service';

@Component ( {
  selector: 'app-navbar' ,
  templateUrl: './navbar.component.html' ,
  styleUrls: [ './navbar.component.scss' ]
} )
export class NavbarComponent implements OnInit {

  constructor ( public authService: AuthService , public router: Router , private dataServiceConfig: DataServiceConfig ,
                public utilsService: UtilsParseFromFirebaseService , private titleService: Title ) {
  }

  innerWidth: number = window.innerWidth;
  maxInnerWidth = 1000;
  showMenus = false;
  navBarToggled = false;
  navBarClass = '';
  blogVersion = false;
  specialTags: string[] = [];
  appId: string = CONFIG.APP_ID;
  appName: string = CONFIG.APP_NAME;
  configDTO: ConfigDTO;
  logo: string = CONFIG.LOGO_NAME;

  backgroundColor = CONFIG.DEFAULT_NAVBAR_COLOR;
  defaultBackgroundColor = CONFIG.DEFAULT_NAVBAR_COLOR;

  ngOnInit () {
    this.blogVersion = CONFIG.BLOG_VERSION;
    this.innerWidth = window.innerWidth;
    this.showMenus = ( this.innerWidth > this.maxInnerWidth );
    this.dataServiceConfig.getConfig ().then ( () => {
      this.configDTO = this.dataServiceConfig.configDTO;
      this.specialTags = this.configDTO.special_tags;
      if ( this.configDTO.app_name ) {
        this.titleService.setTitle ( this.configDTO.app_name );
      }
    } );
  }

  onNabvarClick () {
    this.navBarToggled = !this.navBarToggled;
    this.navBarClass = ( this.navBarToggled ) ? 'collapse' : 'shown';
  }

  redirect ( pagename: string ) {
    this.router.navigate ( [ '/' + pagename ] );
  }

  setConfigDTO ( data ) {
    this.configDTO = this.utilsService.parseConfigFromFirebase ( data );
    this.backgroundColor = !( this.configDTO.navbar_background_color ) ? this.defaultBackgroundColor : this.configDTO.navbar_background_color;
  }

  @HostListener ( 'window:resize' , [ '$event' ] )
  onResize ( event ) {
    this.innerWidth = window.innerWidth;
    console.log ( this.innerWidth );
    this.setShowMenus ();
  }

  public setShowMenus () {
    this.showMenus = ( this.innerWidth > this.maxInnerWidth );
    console.log ( this.showMenus );
  }

}
