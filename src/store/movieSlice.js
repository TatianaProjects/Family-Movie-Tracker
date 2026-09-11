import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movieList: [],
  filter: 'all',
  editingMovie: null
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movieList = action.payload;
    },

    addMovie: (state, action) => {
      state.movieList.push(action.payload);
    },

    updateMovie: (state, action) => {
      const index = state.movieList.findIndex(
        (movie) => movie._id === action.payload._id
      );

      if (index !== -1) {
        state.movieList[index] = action.payload;
      }
    },

    deleteMovie: (state, action) => {
      state.movieList = state.movieList.filter(
        (movie) => movie._id !== action.payload
      );
    },

    setFilter: (state, action) => {
        state.filter = action.payload;
    },

    setEditingMovie: (state, action) => {
      state.editingMovie = action.payload;
    }
  }
});

export const {
  setMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  setFilter,
  setEditingMovie
} = movieSlice.actions;

export default movieSlice.reducer;