import {system, name, datatype, random, date } from 'faker';
import {Review} from '../../../types/review';

export const makeFakeReview = (): Review => ({

  comment: random.words(20),
  date: `${date.past(1, '2020-01-01T00:00:00.000Z')}`,
  id: datatype.number(100),
  rating: datatype.float(5.00),
  user: {
    avatarUrl: system.filePath(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  }


});

export const makeFakeReviews = () => {
  new Array(6).fill(null).map(() => (
    makeFakeReview()
  ));
};

