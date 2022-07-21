export type Host = {
  id: number;
  avatarUrl: string;
  name: string;
  isPro: boolean;
};

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  location: Location;
  name: string;
};


export type Offer = {
  city: City;
  location: Location;
  id: number;
  images: string[];
  title: string;
  description: string;
  isPremium: boolean;
  isFavorite: boolean;
  type: string;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Host;
  previewImage: string;
};

export type OffersByCity = {
  city: [
    Offer,
  ]
};

export type Offers = Offer[];
