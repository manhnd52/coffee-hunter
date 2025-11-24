export interface Review {
  id: number;
  user_id: number;
  store_id: number;
  rating: number; // 1-5
  comment: string;
  created_at: string;
  
  user_name: string;
  user_avatar?: string;
  images: string[]; // URL hình ảnh review
}
