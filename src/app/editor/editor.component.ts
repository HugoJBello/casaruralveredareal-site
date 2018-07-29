import {Component, OnInit, OnDestroy} from '@angular/core';
import {EntryDTO} from '../DTO/entryDTO';
import {Subscription} from 'rxjs/Subscription';
import {Router, ActivatedRoute} from '@angular/router';
import {CONFIG} from '../config/config';
import {Observable} from 'rxjs/Observable';
import {UtilsParseFromFirebaseService} from '../utils-services/util-parse-firebase.service';
import {FirebaseDbService} from '../firebase-db.service';
import {DataServiceConfig} from '../data-service-config.service';
import {Title} from '@angular/platform-browser';
import {UtilsDateService} from '../utils-services/utils-date.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit, OnDestroy {
  subs: Subscription;
  text: string;
  entryName: string;
  hidden = false;

  title = 'title';
  entryDTO: EntryDTO = new EntryDTO();
  entryFinderSubscription: Subscription;
  error: any;

  userName: string;
  private sub: any;

  constructor(private router: Router, private route: ActivatedRoute,
              private dataServiceConfig: DataServiceConfig, public utilsDateService: UtilsDateService,
              public utilsService: UtilsParseFromFirebaseService, public firebaseDb: FirebaseDbService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.entryName = params['id'].toString();
      }
      if (params['hidden']) {
        this.hidden = (params['hidden'].toString() === 'hidden');
      }

      this.title = this.entryName;
      if (this.title) {
        this.titleService.setTitle('Editing ' + this.title);
      } else {
        this.titleService.setTitle('Editing');
      }
      this.userName = this.dataServiceConfig.userDTO.username;
      this.getEntry();
    });
  }

  ngOnChange() {
  }


  onChangeHidden() {
    this.hidden = !this.hidden;
  }

  titleToFilename(title) {
    let name = '';
    if (title) {
      name = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    }
    return name;
  }


  public onPostButton(): void {
    this.constructEntryDTO();

    // here we update the document in the db
    this.firebaseDb.postEntry(this.entryDTO).then(() => {
      this.router.navigate(['./entry/' + this.entryDTO.name]);
    });
  }

  public constructEntryDTO() {
    if (!this.entryDTO) {
      this.entryDTO = new EntryDTO;
    }
    if (!this.entryDTO.created_by) {
      this.entryDTO.created_by = this.userName;
    }
    if (!this.entryDTO.created_at) {
      this.entryDTO.created_at = new Date();
    }
    if (!this.entryDTO.content) {
      this.entryDTO.content = '';
    }
    if (!this.entryDTO.categories) {
      this.entryDTO.categories = [];
    }
    if (!this.entryDTO.include_front_image) {
      this.entryDTO.include_front_image = false;
    }
    if (!this.entryDTO.hidden) {
      this.entryDTO.hidden = false;
    }
    if (!this.entryDTO.blog_version) {
      this.entryDTO.blog_version = false;
    }

    this.entryDTO.hidden = this.hidden;

    this.entryDTO.title = this.title;
    this.entryDTO.updated_at = new Date();

    if (this.hidden) {
      if ((this.entryDTO.name) && (this.entryDTO.name.indexOf('--') > -1)) {
        this.entryDTO.name = this.titleToFilename(this.title) + '--'
          + this.utilsDateService.formatDateNumeric(this.entryDTO.created_at);
      } else {
        this.entryDTO.name = this.titleToFilename(this.title);
      }
    } else {
      this.entryDTO.name = this.titleToFilename(this.title) + '--' + this.utilsDateService.formatDateNumeric(this.entryDTO.created_at);
    }
    this.entryDTO._id = this.entryDTO.name;

    this.entryDTO.edited_by = this.userName;
    this.entryDTO.blog_version = CONFIG.BLOG_VERSION;
    this.entryDTO.app_id = CONFIG.APP_ID;
  }

  public onDeleteButton(): void {
    if (window.confirm('Are sure you want to delete this item ?')) {
      // const oldCategoriesObject = this.entryTitle.categories_object;
      this.firebaseDb.deleteEntry(this.entryDTO).then(() => {
        this.router.navigate(['./entries']);
      });
    }
  }


  getEntry() {
    if (this.entryName) {
      let entriesObs: Observable<any>;
      const name = (this.entryName) ? this.entryName : '';
      entriesObs = this.firebaseDb.getEntry(this.entryName);
      entriesObs.subscribe((data) => {
        this.setEntryDTO(data);
        if (this.entryDTO) {
          this.title = this.entryDTO.title;
          this.text = this.entryDTO.content;
          this.hidden = this.entryDTO.hidden;
        }
      });

    }

  }

  setEntryDTO(data) {
    this.entryDTO = this.utilsService.parseEntryFromFirebase(data);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.titleService.setTitle(CONFIG.APP_NAME);
  }

}
