export interface IWithId {
  id: string | number;
}

export interface IToyxonalar extends IWithId {
  user_id: string;
  name: string;
  description: string;
  status: string;
  longitude: string;
  latitude: string;
  address: string;
  tariff_count: string;
  region_id: null | string;
  district_id: null | string;
  quarter_id: null | string;
  phone1: null | string;
  phone2: null | string;
  telegram: null | string;
  instagram: null | string;
  reject_reason: null | string;
  created_at: string;
  updated_at: string;
  wedding_hall_pictures: Array<{
    id: number;
    wedding_hall_id: string;
    image_url: string;
    created_at: string;
    updated_at: string;
  }>;
  tariffs: ITarif;
  // Eski API formati uchun qo'shimcha maydonlar (qiymatlar bo'lmasa ham xato bermasligi uchun)
  telegram_link?: string;
  instagram_link?: string;
  min_price?: string;
  max_price?: string;
  admin_id?: string;
  tarif_count?: string;
  images?: string[];
  prices?: Array<{
    title: string;
    amount: number;
    currency: string;
    description: string;
  }>;
}

export interface ITarif {
    id: number;
    name: string;
    wedding_hall_id: string;
    created_at: string;
    updated_at: string;
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
export type Role = "user" | "admin" | "super_admin";
export type ComponentType =
  "tarif"
  | "changeLanguage"
  | "showTariff"
  | "editProfile"
  | "register"
  | "cancel"
  | "notification"
  | "about"
  | "myVenues"
  | "admins"
  | "discounts"
  | "addLocation"
  | "selectLocation";

