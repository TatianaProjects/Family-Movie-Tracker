import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addMovie as addMovieApi,
  updateMovie as updateMovieApi
} from '../services/movieApi';

import {
  addMovie,
  updateMovie,
  setEditingMovie
} from '../store/movieSlice';

const initialState = {
  title: '',
  year: '',
  genre: '',
  rating: ''
};

const MovieForm = () => {

  const dispatch = useDispatch();

  const editingMovie = useSelector(
    (state) => state.movies.editingMovie
  );

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title,
        year: editingMovie.year,
        genre: editingMovie.genre,
        rating: editingMovie.rating
      });
    } else {
      setFormData(initialState);
    }
  }, [editingMovie]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const movieData = {
      title: formData.title,
      year: Number(formData.year),
      genre: formData.genre,
      rating: Number(formData.rating),
      watched: editingMovie ? editingMovie.watched : false
    };

    if (editingMovie) {
      updateMovieApi(editingMovie._id, movieData)
        .then((response) => {
          dispatch(updateMovie(response.data));
          dispatch(setEditingMovie(null));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      addMovieApi(movieData)
        .then((response) => {
          dispatch(addMovie(response.data));
          setFormData(initialState);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>

      <input
        type="text"
        name="title"
        placeholder="Movie title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
      />

      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
      />

      <input
        type="number"
        name="rating"
        step="0.1"
        placeholder="Rating"
        value={formData.rating}
        onChange={handleChange}
      />

      <button type="submit">
        {editingMovie ? 'Update Movie' : 'Add Movie'}
      </button>

    </form>
  );
};

export default MovieForm;