import { CONFIG } from './config/config';

import { AppComponent } from './app.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

import { NavbarComponent } from './navbar/navbar.component';
import { SpecialMenuComponent } from './special-menu/special-menu.component';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material';

import {AuthService} from './auth/auth.service';
import {DataServiceConfig} from './data-service-config.service';
import {UtilsParseFromFirebaseService} from './utils-services/util-parse-firebase.service';
import { InstallationService } from './installation.service';
import {UtilsDateService} from './utils-services/utils-date.service';

import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule, MatSortModule} from '@angular/material';

import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SpecialMenuComponent,
    HomeComponent,
    EditorComponent,
    AdminComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(CONFIG.FIREBASE_CONFIG),
    // AngularFireModule.initializeApp(FirebaseConfigPod3c.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatMenuModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    Angular2FontawesomeModule,
    FormsModule,
    MatFormFieldModule,
  ],
  providers: [AuthService,
    DataServiceConfig,
    UtilsParseFromFirebaseService,
    InstallationService,
    UtilsDateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
