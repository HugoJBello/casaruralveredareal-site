import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';
import { AdminComponent } from './admin/admin.component';
import { SpecialMenuComponent } from './special-menu/special-menu.component'
import { AuthGuard } from './auth/auth.guard';
import { EntryComponent } from './entry/entry.component';
import { CONFIG } from './config/config';

const newRoutes: Routes = [];

const routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {path: 'st/:id',
    component: SpecialMenuComponent
  },
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'edit/:id',
    component: EditorComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'edit/:id/:hidden',
    component: EditorComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'edit-with-tag/:id/:tag',
    component: EditorComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'entry/:id',
    component: EntryComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(newRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
