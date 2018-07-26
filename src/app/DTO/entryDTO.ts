export class EntryDTO {
  _id: string;
  name: string;
  title: string;
  updated_at: Date;
  created_at: Date;
  content: string;
  categories: string[];
  // categories_object: any;
  edited_by: string;
  created_by: string;
  hidden: boolean;
  blog_version: boolean;
  app_id: string;
  include_front_image: boolean;
}
