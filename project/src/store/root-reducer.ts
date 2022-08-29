import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { userProcess } from './user-process/user-process';
import {offersProcess} from './offers-process/offers-process';
import {propertyProcess} from './property-process/property-process';


export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Property]: propertyProcess.reducer,
  [NameSpace.User]: userProcess.reducer,

});
