
import { CONFIG_SITE } from "./configSite";


export interface Config {
  MAIN_PAGE_NAME:string;
  ABOUT_PAGE_NAME:string;
  MINI_INTRO_PAGE_NAME:string;
  PERSONAL_INFO_PAGE_NAME:string;
  BLOG_VERSION:boolean,
  APP_ID:string,
  APP_NAME:string,
  APP_ADMIN_ACCOUNTS:any[],
  LOGO_NAME:string;
  FIREBASE_CONFIG:any;
  DEFAULT_BANNER_COLOR:string;
  DEFAULT_NAVBAR_COLOR:string;
  GOOGLE_ANALYTICS_ID:string;
  LANGUAGE:string;

}

//ng serve --aot --i18nFile=src/locale/messages.es.xlf --i18nFormat=xlf --locale=es
//ng build --aot --i18nFile=src/locale/messages.es.xlf --i18nFormat=xlf --locale=es
//ng xi18n --locale es

var currentConfig:Config = CONFIG_SITE;
//var currentConfig:Config = CONFIG_HJBELLO_BLOG;
//var currentConfig:Config = CONFIG_HJBELLO_SITE;



export var CONFIG: Config = currentConfig;
