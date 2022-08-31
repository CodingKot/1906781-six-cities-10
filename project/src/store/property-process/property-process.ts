import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { PropertyProcess } from '../../types/state';
import { fetchNearbyOffers, fetchReviews, addComment, changeFavorite} from '../api-actions';
import {updateItem} from '../../utils/utils';


const initialState: PropertyProcess = {
  isPropertyLoading: false,
  reviews: [],
  nearbyOffers: [],
};

export const propertyProcess = createSlice({
  name: NameSpace.Property,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.isPropertyLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isPropertyLoading = false;
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isPropertyLoading = true;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isPropertyLoading = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.reviews = action.payload;

      })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        if(state.nearbyOffers.find((offer) => offer.id === action.payload.id)) {
          state.nearbyOffers = updateItem(state.nearbyOffers, action.payload);
        }
      });
  }
});
