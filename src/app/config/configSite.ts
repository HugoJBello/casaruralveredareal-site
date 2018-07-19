import {Config} from './config';

export const CONFIG_SITE: Config = {
  MAIN_PAGE_NAME: 'main_page' ,
  ABOUT_PAGE_NAME: 'about_page' ,
  MINI_INTRO_PAGE_NAME: 'mini_intro_page' ,
  PERSONAL_INFO_PAGE_NAME: 'personal_info_page' ,
  BLOG_VERSION: false ,
  APP_ID: 'cr-site' ,
  APP_NAME: 'Casa Rural Vereda Real' ,
  APP_ADMIN_ACCOUNTS: [ {'email': 'hugo.bello.gu@gmail' , 'username': 'Hugo J. Bello'} ] ,
  LOGO_NAME: 'logo_site_small.png' ,
  FIREBASE_CONFIG: {
    apiKey: 'AIzaSyAM6e283nQYQ5nVJl0zzM6DTJQfYJCacy8' ,
    authDomain: 'hjbello-site.firebaseapp.com' ,
    databaseURL: 'https://hjbello-site.firebaseio.com' ,
    projectId: 'hjbello-site' ,
    storageBucket: 'hjbello-site.appspot.com' ,
    messagingSenderId: '454182348266'
  } ,
  DEFAULT_BANNER_COLOR: '#252A25' ,
  DEFAULT_NAVBAR_COLOR: '#252A25' ,
  GOOGLE_ANALYTICS_ID: 'UA-120714108-1' ,
  LANGUAGE: 'eng'
};

