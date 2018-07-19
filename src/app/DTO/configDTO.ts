export class ConfigDTO {
  app_id: string;
  app_name:string;
  app_owner:string;
  special_tags:string[];
  banners: string[];
  banner_color:string;
  mini_intro_color:string;
  navbar_background_color:string;
  show_banners:boolean;
  show_tags_banner:boolean;
  show_users_tab:boolean;
  show_pagination_in_home:boolean;
  show_twitter_feed:boolean;
  show_mini_intro_page:boolean;
  twitter_feed_url:string;
}
