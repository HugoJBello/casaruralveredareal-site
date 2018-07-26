import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EntryDTO} from '../DTO/entryDTO';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../auth/auth.service';

import {Observable} from 'rxjs/Observable';
import {UtilsParseFromFirebaseService} from '../utils-services/util-parse-firebase.service';
import {FirebaseDbService} from '../firebase-db.service';
import {CONFIG} from '../config/config';
import {DataServiceConfig} from '../data-service-config.service';
import {ConfigDTO} from '../DTO/configDTO';
import {Title} from '@angular/platform-browser';

import {Meta} from '@angular/platform-browser';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit, OnDestroy {
  entryName: string;
  contentHtml: string;
  entryDTO: EntryDTO;
  backgroundColor = CONFIG.DEFAULT_BANNER_COLOR;
  configDTO: ConfigDTO;

  headImage: string;
  error: any;

  private sub: any;

  constructor(private route: ActivatedRoute, public utilsService: UtilsParseFromFirebaseService,
              private dataServiceConfig: DataServiceConfig, public authService: AuthService,
              public firebaseDb: FirebaseDbService, private meta: Meta, private titleService: Title) {
  }

  ngOnInit() {
    this.dataServiceConfig.getConfig().then(() => {
      this.configDTO = this.dataServiceConfig.configDTO;
      this.backgroundColor = this.configDTO.banner_color;

    });
    this.sub = this.route.params.subscribe(params => {
      this.entryName = params['id'].toString();
      this.getEntryAndExtractHeadImage();
    });
  }


  addMetaTags() {
    this.meta.addTag({name: 'twitter:card', content: 'summary'});
    this.meta.addTag({property: 'og:image', itemprop: 'image', content: this.headImage});
    this.meta.addTag({name: 'twitter:image', content: this.headImage});

    this.meta.addTag({name: 'twitter:image:src', content: this.headImage});
    if (this.entryDTO) {
      this.meta.addTag({name: 'twitter:title', content: this.entryDTO.title});
    }
    if (this.entryDTO) {
      this.meta.addTag({name: 'og:title', content: this.entryDTO.title});
    }
    if (this.entryDTO) {
      this.meta.addTag({name: 'og:updated_time', content: '' + this.entryDTO.updated_at.valueOf()});
    }
    this.meta.addTag({name: 'og:site_name', content: CONFIG.APP_NAME});
    this.meta.addTag({name: 'og:type', content: 'article'});
  }
  getEntryAndExtractHeadImage() {
    let entriesObs: Observable<any>;
    entriesObs = this.firebaseDb.getEntry(this.entryName);
    entriesObs.subscribe((data) => {
      console.log(data);
      this.contentHtml = data.content;

      this.setEntryDTOAndGetImage(data);
      this.addMetaTags();
      if (this.entryDTO) {
        this.titleService.setTitle(this.entryDTO.title);
      }
    });
  }

  setEntryDTOAndGetImage(data) {
    this.entryDTO = this.utilsService.parseEntryFromFirebase(data);
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
    this.titleService.setTitle(CONFIG.APP_NAME);
  }

  formatDate(date) {
    date = (!date) ? new Date() : new Date(date);
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

}
