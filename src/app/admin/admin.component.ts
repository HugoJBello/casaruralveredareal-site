import {Component , OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {ConfigDTO} from '../DTO/configDTO';
import {CONFIG} from '../config/config';
import {FirebaseDbService} from '../firebase-db.service';
import {DataServiceConfig} from '../data-service-config.service';
import {Router , ActivatedRoute} from '@angular/router';
import {InstallationService} from '../installation.service';

@Component ( {
  selector: 'app-admin' ,
  templateUrl: './admin.component.html' ,
  styleUrls: [ './admin.component.css' ]
} )
export class AdminComponent implements OnInit {

  constructor ( private router: Router , private route: ActivatedRoute ,
                public authService: AuthService , private dataServiceConfig: DataServiceConfig ,
                public firebaseDb: FirebaseDbService , public installationService: InstallationService) {
  }

  appId: string = CONFIG.APP_ID;
  configDTO: ConfigDTO;
  specialTags: string;
  banners: string;
  showBanners: boolean;
  showTagsBanner: boolean;
  showTwitterFeed: boolean;
  showPaginationInHome: boolean;
  showMiniIntroPage: boolean;
  twitterFeedUrl: string;

  appIsUninstalled: boolean;
  adminAccounts: any = CONFIG.APP_ADMIN_ACCOUNTS;
  installationMessages: string;

  ngOnInit () {
    this.dataServiceConfig.getConfig ().then ( () => {
      this.configDTO = this.dataServiceConfig.configDTO;
      this.installationService.findOutIfUninstalled ();
      this.installationService.appIsUninstalled$.subscribe ( ( uninst ) => {
        this.appIsUninstalled = uninst;
      } );
      this.setConfigInputs ();
    } );
  }

  setConfigInputs () {
    if ( this.configDTO.special_tags ) this.specialTags = this.configDTO.special_tags.join ( ';' );
    if ( this.configDTO.banners ) this.banners = this.configDTO.banners.join ( ';' );
    if ( this.configDTO.show_banners ) this.showBanners = this.configDTO.show_banners;
    if ( this.configDTO.show_tags_banner ) this.showTagsBanner = this.configDTO.show_tags_banner;
    if ( this.configDTO.show_twitter_feed ) this.showTwitterFeed = this.configDTO.show_twitter_feed;
    if ( this.configDTO.show_mini_intro_page ) this.showMiniIntroPage = this.configDTO.show_mini_intro_page;

    // else this.configDTO.show_tags_banner=false;

    if ( !this.configDTO.app_id ) this.configDTO.app_id = CONFIG.APP_ID;
    if ( !this.configDTO.app_name ) this.configDTO.app_name = CONFIG.APP_NAME;
    if ( !this.configDTO.banner_color || this.configDTO.banner_color == '' ) this.configDTO.banner_color = CONFIG.DEFAULT_BANNER_COLOR;
    if ( !this.configDTO.mini_intro_color || this.configDTO.mini_intro_color == '' ) this.configDTO.mini_intro_color = CONFIG.DEFAULT_BANNER_COLOR;
    if ( !this.configDTO.navbar_background_color || this.configDTO.navbar_background_color == '' ) this.configDTO.navbar_background_color = CONFIG.DEFAULT_NAVBAR_COLOR;
  }

  onChangeShowBanners () {
    this.showBanners = !this.showBanners;
  }

  onChangeShowTagsBanner () {
    this.showTagsBanner = !this.showTagsBanner;
  }

  onChangeShowMiniIntroPage () {
    this.showMiniIntroPage = !this.showMiniIntroPage;
  }

  onChangeShowTwitterFeed () {
    this.showTwitterFeed = !this.showTwitterFeed;
  }

  onPostButton () {
    if ( this.configDTO.special_tags ) this.configDTO.special_tags = this.specialTags.split ( ';' );
    else this.configDTO.special_tags = [];
    this.configDTO.show_banners = this.showBanners;
    this.configDTO.show_tags_banner = this.showTagsBanner;
    this.configDTO.show_twitter_feed = this.showTwitterFeed;
    this.configDTO.show_mini_intro_page = this.showMiniIntroPage;

    if ( this.configDTO.banners ) this.configDTO.banners = this.banners.split ( ';' );
    else this.configDTO.banners = [];

    if ( !this.configDTO.show_banners ) this.configDTO.show_banners = false;
    if ( !this.configDTO.show_tags_banner ) this.configDTO.show_tags_banner = false;
    if ( !this.configDTO.show_twitter_feed ) this.configDTO.show_twitter_feed = false;
    if ( !this.configDTO.show_pagination_in_home ) this.configDTO.show_pagination_in_home = false;

    if ( !this.configDTO.twitter_feed_url ) this.configDTO.twitter_feed_url = '';

    if ( !this.configDTO.app_owner ) this.configDTO.app_owner = CONFIG.APP_NAME;
    if ( !this.configDTO.banner_color ) this.configDTO.banner_color = CONFIG.DEFAULT_BANNER_COLOR;
    if ( !this.configDTO.mini_intro_color ) this.configDTO.mini_intro_color = CONFIG.DEFAULT_BANNER_COLOR;
    if ( !this.configDTO.navbar_background_color ) this.configDTO.navbar_background_color = CONFIG.DEFAULT_NAVBAR_COLOR;

    this.firebaseDb.saveConfig ( this.configDTO ).then ( () => {
      this.dataServiceConfig.configDTO = this.configDTO;
      this.router.navigate ( [ './home' ] );
    } );
  }

  installAdminUsers () {
    this.installationService.installAdminDefaultUsersAndBasicConf ();
  }

}
