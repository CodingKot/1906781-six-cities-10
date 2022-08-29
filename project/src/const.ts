export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '/404',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorites = '/favorite',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortingType {
  Populap = 'Popular',
  PriceToHigh = 'Price: low to high',
  PriceToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum NameSpace {
  User = 'USER',
  Property = 'PROPERTY',
  Offers = 'OFFERS',
}

export const enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',

}

export const CITIES = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 13,
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.93753,
      longitude: 6.96028,
      zoom: 13,
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.8504,
      longitude: 4.34878,
      zoom: 13,
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 13,
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.5753,
      longitude: 10.0153,
      zoom: 13,
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 	51.2217,
      longitude: 6.77616,
      zoom: 13,
    }
  },
];

export const RATING_MARKS = [
  {
    emotion: 'perfect',
    mark: 5,
  },
  {
    emotion: 'good',
    mark: 4,
  },
  {
    emotion: 'not bad',
    mark: 3,
  },
  {
    emotion: 'badly',
    mark: 2,
  },
  {
    emotion: 'terribly',
    mark: 1,
  }
];

export const SORTING_ITEMS = [
  {value: SortingType.Populap, label: 'Popular' },
  {value: SortingType.PriceToHigh, label: 'Price: low to high'},
  {value: SortingType.PriceToLow, label: 'Price: high to low'},
  {value: SortingType.TopRated, label: 'Top rated first'},
];

export const PICTURES_MAX_NUMBER = 6;
export const REVIEWS_MAX_NUMBER = 10;
export const DEFAULT_CITY_NAME = 'Paris';


