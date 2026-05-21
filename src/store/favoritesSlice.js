import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],

  reducers: {
    toggleFavorite(state, action) {
      const exists = state.find((id) => id === action.payload);

      if (exists) {
        return state.filter((id) => id !== action.payload);
      }

      state.push(action.payload);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;