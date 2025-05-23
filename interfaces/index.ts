export interface IWithId {
  id: string;
}

export interface IToyxonalar extends IWithId {
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
  images?: string[]; // ixtiyoriy
  prices?: Array<{
    title: string;
    amount: number;
    currency: string;
    description: string;
  }>;
}

export interface IToyxona extends IWithId {
  name: string;
  image: string;
  description: string;
  min_price: string;
  max_price: string;
  address: string;
}

export interface Banner extends IWithId {
  photo: string;
  name: string;
  created_at: string;
}

export interface IUser extends IWithId {
  name: string;
  phone: string;
  role: string;
  status: string;
}

export type AuthType = "register" | "login" | "forgot_password";

export interface ITarif {
  id: string;
  toyxona_id: string;
  people_count: string;
  total_price: string;
  foods: Array<{
    name: string;
    image: string;
    price: string;
    category: string;
  }>;
  created_at: string;
}