export interface IToyxonalar {
  id: string;
  admin_id: string;
  name: string;
  image: string;
  description: string;
  tarif_count: string;
  min_price: string;
  max_price: string;
  phone1: string;
  phone2: string;
  telegram_link: string;
  instagram_link: string;
  address: string;
  longitude: string;
  latitude: string;
  status: string;
  rating: number;
  reviewCount: number;
  images: string[];
  prices: Array<{
    title: string;
    amount: number;
    currency: string;
    description: string;
  }>;
}
export interface Banner {
  id: string;
  photo: string;
  name: string;
  created_at: string;
}

