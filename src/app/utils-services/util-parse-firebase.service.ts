import {Injectable} from '@angular/core';
import {UserDTO} from '../DTO/userDTO';
import {ConfigDTO} from '../DTO/configDTO';

@Injectable ()
export class UtilsParseFromFirebaseService {

  constructor () {
  }


  parseListUsersFirebase ( data ) {
    const admins = [];
    if ( data ) {
      for ( const userFire of data ) {
        const userDTO: UserDTO = new UserDTO;
        userDTO.username = userFire.username;
        userDTO.email = userFire.email;
        userDTO.role = userFire.role;
        console.log ( userDTO );
        admins.push ( userDTO );
      }
    }
    return admins;
  }

  parseUserFromFirebase ( data ) {
    data = data[ 0 ];
    const userDTO: UserDTO = new UserDTO;
    if ( data ) {
      userDTO.username = data.username;
      userDTO.email = data.email;
      userDTO.role = data.role;
    }
    return userDTO;
  }

  parseConfigFromFirebase ( data ) {
    data = data[ 0 ];
    const configDTO: ConfigDTO = new ConfigDTO;
    if ( data ) {
      configDTO.app_id = data.app_id;
      configDTO.app_name = data.app_name;
      configDTO.app_owner = data.app_owner;
      configDTO.special_tags = data.special_tags;
      configDTO.banners = data.banners;
      configDTO.mini_intro_color = data.mini_intro_color;
      configDTO.show_banners = data.show_banners;
      configDTO.show_tags_banner = data.show_tags_banner;
      configDTO.navbar_background_color = data.navbar_background_color;
      configDTO.banner_color = data.banner_color;
      configDTO.show_pagination_in_home = data.show_pagination_in_home;
      configDTO.show_mini_intro_page = data.show_mini_intro_page;
      configDTO.twitter_feed_url = data.twitter_feed_url;
      configDTO.show_twitter_feed = data.show_twitter_feed;

    }
    return configDTO;
  }
}
