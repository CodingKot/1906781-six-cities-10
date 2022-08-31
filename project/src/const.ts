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

export enum ResponseStatus {
  Initial = 'Initial',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
}

export enum FavoriteOfferStatus {
  FavoriteDelete = 0,
  FavoriteAdd = 1,
}
export const CITIES = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 	51.225402,
      longitude: 6.776314,
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
export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 300;

