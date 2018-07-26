import { Injectable } from '@angular/core';
import { CONFIG } from '../config/config';

@Injectable()
export class UtilsDateService {

  SECONDS:string = (CONFIG.LANGUAGE=="eng") ? "seconds" : "segundos";
  MINUTES:string = (CONFIG.LANGUAGE=="eng") ? "minutes" : "minutos";
  HOURS:string = (CONFIG.LANGUAGE=="eng") ? "hours" : "horas";
  DAYS:string = (CONFIG.LANGUAGE=="eng") ? "days" : "días";
  MONTHS:string = (CONFIG.LANGUAGE=="eng") ? "months" : "meses";
  YEARS:string = (CONFIG.LANGUAGE=="eng") ? "years" : "años";



  constructor() { }

  formatDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
  }

  formatDateNumeric(date){
    return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2) + "--" + (date.getHours()) + "_" + (date.getMinutes()) + "_" + (date.getSeconds());
  }
  
  public timeSince(date:Date) {
    var seconds = Math.floor(((new Date()).getTime() - (new Date(date)).getTime()) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " " + this.YEARS;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " " + this.MONTHS;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " " + this.DAYS;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " " + this.HOURS;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " " + this.MINUTES;
    }
    return Math.floor(seconds) +" " + this.SECONDS;
  }

}
