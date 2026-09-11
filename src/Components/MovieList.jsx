import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Movie from './Movie';

import {
  getMovies,
  updateMovie as updateMovieApi,
  deleteMovie as deleteMovieApi
} from '../services/movieApi';

import {
  setMovies,
  updateMovie,
  deleteMovie,
  setEditingMovie
} from '../store/movieSlice';

const MovieList = () => {

  const dispatch = useDispatch();

  const movieList = useSelector(
    (state) => state.movies.movieList
  );

  const filter = useSelector(
    (state) => state.movies.filter
  );

  useEffect(() => {
    getMovies()
      .then((response) => {
        dispatch(setMovies(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const filteredMovies = movieList.filter((movie) => {
    if (filter === 'watched') {
      return movie.watched === true;
    }

    if (filter === 'toWatch') {
      return movie.watched === false;
    }

    return true;
  });

  const toggleWatched = (id) => {
    const movie = movieList.find(
      (movie) => movie._id === id
    );

    updateMovieApi(id, {
      watched: !movie.watched
    })
      .then((response) => {
        dispatch(updateMovie(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteMovie = (id) => {
    deleteMovieApi(id)
      .then(() => {
        dispatch(deleteMovie(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditMovie = (movie) => {
    dispatch(setEditingMovie(movie));
  };

  return (
    <div className="movies">

      {filteredMovies.map((movie) => (
        <Movie
          key={movie._id}
          movie={movie}
          toggleWatched={toggleWatched}
          editMovie={handleEditMovie}
          deleteMovie={handleDeleteMovie}
        />
      ))}

    </div>
  );
};

export default MovieList;