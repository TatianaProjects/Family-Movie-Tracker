import { useState, useEffect } from 'react';
import { getMovies, addMovie, updateMovie, deleteMovie} from '../services/movieApi';

const useMovies = () => {

  const [filter, setFilter] = useState('all');
  const [movieList, setMovieList] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    getMovies()
      .then((response) => {
        setMovieList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddMovie = (newMovie) => {
    addMovie(newMovie)
      .then((response) => {
        setMovieList([...movieList, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editMovie = (movie) => {
    setEditingMovie(movie);
  };

  const handleUpdateMovie = (updatedMovie) => {
    updateMovie(editingMovie._id, updatedMovie)
      .then((response) => {
        setMovieList(
          movieList.map((movie) =>
            movie._id === editingMovie._id
              ? response.data
              : movie
          )
        );

        setEditingMovie(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleWatched = (id) => {
    const movie = movieList.find((movie) => movie._id === id);

    updateMovie(id, {
      watched: !movie.watched
    })
      .then((response) => {
        setMovieList(
          movieList.map((movie) =>
            movie._id === id
              ? response.data
              : movie
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteMovie = (id) => {
    deleteMovie(id)
      .then(() => {
        setMovieList(
          movieList.filter((movie) => movie._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredMovies = movieList.filter((movie) => {
    if (filter === 'watched') {
      return movie.watched === true;
    }

    if (filter === 'toWatch') {
      return movie.watched === false;
    }

    return true;
  });

  return {
    filter,
    setFilter,
    editingMovie,
    handleAddMovie,
    editMovie,
    handleUpdateMovie,
    toggleWatched,
    filteredMovies,
    handleDeleteMovie
  };
};

export default useMovies;