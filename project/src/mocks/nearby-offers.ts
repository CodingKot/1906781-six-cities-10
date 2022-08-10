import {Offers} from '../types/offer';

export const nearbyOffers: Offers = [
  {
    id: 56,
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/studio-01.jpg'],
    title: 'Studio',
    description: 'Luxurious studio at great location. Luxurious studio at great location. Luxurious studio at great location. Luxurious studio at great location.',
    isPremium: true,
    isFavorite: true,
    type: 'Flat',
    rating: 1.4,
    bedrooms: 3,
    maxAdults: 3,
    price: 150,
    goods: ['Wi-Fi', 'Washing machine', 'Heating', 'Coffee machine'],
    host: {
      id: 1,
      avatarUrl: 'img/avatar-angelina.jpg',
      name: 'Angelina',
      isPro: true,
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      }
    },
    location: {
      latitude: 52.4119553943508,
      longitude: 4.89409666406198,
      zoom: 8
    },
    previewImage: 'img/room.jpg',
  },
  {
    id: 57,
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/studio-01.jpg'],
    title: 'Luxurious room',
    description: 'Luxurious studio at great location. Luxurious studio at great location. Luxurious studio at great location. Luxurious studio at great location.',
    isPremium: false,
    isFavorite: true,
    type: 'Room',
    rating: 5,
    bedrooms: 2,
    maxAdults: 2,
    price: 100,
    goods: ['Wi-Fi', 'Washing machine', 'Heating', 'Coffee machine', 'Kitchen', 'Dishwasher'],
    host: {
      id: 2,
      avatarUrl: 'img/avatar-angelina.jpg',
      name: 'Johan',
      isPro: true,
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      }
    },
    location: {
      latitude: 52.339553943508,
      longitude: 4.81509666406198,
      zoom: 8
    },
    previewImage: 'img/apartment-03.jpg',
  },
  {
    id: 58,
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/studio-01.jpg', 'img/apartment-03.jpg'],
    title: 'Beautiful house',
    description: 'Luxurious studio at great location. Luxurious studio at great location. Luxurious studio at great location. Luxurious studio at great location.',
    isPremium: false,
    isFavorite: false,
    type: 'House',
    rating: 4.3,
    bedrooms: 1,
    maxAdults: 2,
    price: 50,
    goods: ['Heating', 'Coffee machine', 'Kitchen', 'Dishwasher'],
    host: {
      id: 3,
      avatarUrl: 'img/avatar-angelina.jpg',
      name: 'Christina',
      isPro: true,
    },
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10,
      }
    },
    location: {
      latitude: 52.3589553943508,
      longitude: 4.889309666406198,
      zoom: 8
    },
    previewImage: 'img/apartment-01.jpg',
  },
];
