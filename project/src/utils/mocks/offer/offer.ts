import {system, name, address, datatype, random } from 'faker';
import {Offer} from '../../../types/offer';

export const makeFakeOffer = (): Offer => ({

  bedrooms: datatype.number(5),
  city: {
    location:
      {
        latitude: Number(address.latitude),
        longitude: Number(address.longitude),
        zoom: datatype.number(13),
      },
    name: address.cityName(),
  },
  description: random.words(10),
  goods: Array.from(random.words(6)),
  host: {
    avatarUrl: system.filePath(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.title(),
  },
  id: datatype.number(),
  images: new Array(6).fill(null).map(() => (
    system.filePath()
  )),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude),
    longitude: Number(address.longitude),
    zoom: datatype.number(10),
  },
  maxAdults: datatype.number(),
  previewImage: system.filePath(),
  price: datatype.number(1000),
  rating: datatype.float(5.000),
  title: datatype.string(),
  type: datatype.string(),

} as Offer);


export const makeFakeOffers = () => {
  const offers = new Array(6).fill(null).map(() => (
    makeFakeOffer()
  ));
  return offers;
};

export const makeFakeNearbyOffers = () => {
  const offers = new Array(3).fill(null).map(() => (
    makeFakeOffer()
  ));
  return offers;
};

