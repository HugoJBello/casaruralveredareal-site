import {Component, OnInit, Inject, HostListener} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {EntryDTO} from '../DTO/entryDTO';
import {UtilsDateService} from '../utils-services/utils-date.service';
import {CONFIG} from '../config/config';
import {Observable} from 'rxjs/Observable';
import {UtilsParseFromFirebaseService} from '../utils-services/util-parse-firebase.service';
import {ConfigDTO} from '../DTO/configDTO';
import {FirebaseDbService} from '../firebase-db.service';
import {DataServiceConfig} from '../data-service-config.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  entryName: string = CONFIG.MAIN_PAGE_NAME;
  contentHtml: string;
  entryTitle: EntryDTO;
  miniIntroDTO: EntryDTO;
  appName = CONFIG.APP_NAME;
  mainPageName: string = CONFIG.MAIN_PAGE_NAME;
  miniIntroPageName: string = CONFIG.MINI_INTRO_PAGE_NAME;
  blogVersion = false;
  configDTO: ConfigDTO;
  appId: string = CONFIG.APP_ID;
  showBanners = false;
  innerWidth: number = window.innerWidth;
  maxInnerWidth = 900;
  backgroundColor = CONFIG.DEFAULT_BANNER_COLOR;
  miniIntroColor = CONFIG.DEFAULT_BANNER_COLOR;
  headImage: string = CONFIG.HEAD_IMAGE;

  obs: Observable<any[]>;

  constructor(public utilsService: UtilsParseFromFirebaseService, public authService: AuthService,
              private dataServiceConfig: DataServiceConfig,
              public utilsDate: UtilsDateService, public firebaseDb: FirebaseDbService, private titleService: Title) {
    this.titleService.setTitle(CONFIG.APP_NAME);
  }

  ngOnInit() {
    this.blogVersion = CONFIG.BLOG_VERSION;
    this.innerWidth = window.innerWidth;


    this.dataServiceConfig.getConfig().then(() => {
      this.configDTO = this.dataServiceConfig.configDTO;
      this.backgroundColor = this.configDTO.banner_color;
      this.miniIntroColor = this.configDTO.mini_intro_color;
    });
    this.getMainPage();
    this.getMiniIntroPage();
  }

  getMainPage() {
    let entriesObs: Observable<any>;
    entriesObs = this.firebaseDb.getEntry(this.entryName);
    entriesObs.subscribe((data) => {
      this.setEntryDTO(data);
    });
  }

  getMiniIntroPage() {
    let entriesObs: Observable<any>;
    entriesObs = this.firebaseDb.getEntry(this.miniIntroPageName);
    entriesObs.subscribe((data) => {
      this.setMiniIntroDTO(data);
    });
  }

  setEntryDTO(data) {
    this.entryTitle = this.utilsService.parseEntryFromFirebase(data);
  }

  setMiniIntroDTO(data) {
    this.miniIntroDTO = this.utilsService.parseEntryFromFirebase(data);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.setShowBanners();
  }

  setShowBanners() {
    if (this.configDTO) {
      this.showBanners = (this.innerWidth > this.maxInnerWidth) && this.configDTO.show_banners;
    } else {
      this.showBanners = false;
    }
  }
}
