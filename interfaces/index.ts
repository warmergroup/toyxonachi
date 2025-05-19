export interface IToyxonalar {
  id: string;
  admin_id: string;
  name: string;
  // image: string;
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
  rating?: number; // ixtiyoriy
  reviewCount?: number; // ixtiyoriy
  images?: string[]; // ixtiyoriy
  prices?: Array<{
    title: string;
    amount: number;
    currency: string;
    description: string;
  }>;
}

export interface IToyxona {
  id: string;
  name: string;
  image: string;
  description: string;
  min_price: string;
  max_price: string;
  address: string;
}

export interface Banner {
  id: string;
  photo: string;
  name: string;
  created_at: string;
}

