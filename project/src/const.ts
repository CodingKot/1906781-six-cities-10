export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

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
