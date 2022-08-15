export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 10,
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
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

export enum SortingType {
  Populap = 'Popular',
  PriceToHigh = 'Price: low to high',
  PriceToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const SORTING_ITEMS = [
  {value: SortingType.Populap, label: 'Popular' },
  {value: SortingType.PriceToHigh, label: 'Price: low to high'},
  {value: SortingType.PriceToLow, label: 'Price: high to low'},
  {value: SortingType.TopRated, label: 'Top rated first'},
];

