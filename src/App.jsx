import './App.css';
import Movie from './Components/Movie';
import MovieForm from './Components/MovieForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [filter, setFilter] = useState('all');
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
  axios.get('https://family-movie-tracker.onrender.com/movies')
    .then((response) => {
      setMovieList(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const addMovie = (newMovie) => {
  axios.post('https://family-movie-tracker.onrender.com/movies', newMovie)
    .then((response) => {
      setMovieList([...movieList, response.data])
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const [editingMovie, setEditingMovie] = useState(null);

  const editMovie = (movie) => {
  setEditingMovie(movie)}

  const updateMovie = (updatedMovie) => {
    axios.put(
      `https://family-movie-tracker.onrender.com/movies/${editingMovie._id}`,
      updatedMovie
    )
      .then((response) => {
        setMovieList(
          movieList.map((movie) =>
            movie._id === editingMovie._id ? response.data : movie
          )
        )

        setEditingMovie(null)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const toggleWatched = (id) => {
    const movie = movieList.find((movie) => movie._id === id)

    axios.put(`https://family-movie-tracker.onrender.com/movies/${id}`, {
      watched: !movie.watched
    })
      .then((response) => {
        setMovieList(
          movieList.map((movie) =>
            movie._id === id ? response.data : movie
          )
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const filteredMovies = movieList.filter((movie) => {
  if (filter === 'watched') {
    return movie.watched === true
  }

  if (filter === 'toWatch') {
    return movie.watched === false
  }

  return true
})

const deleteMovie = (id) => {
  axios.delete(`https://family-movie-tracker.onrender.com/movies/${id}`)
    .then(() => {
      setMovieList(
        movieList.filter((movie) => movie._id !== id)
      )
    })
    .catch((error) => {
      console.log(error)
    })
}

  return (
    <div className="App">
      <h1>Family Movie Tracker</h1>
      <p className="subtitle">Movies to watch, movies we loved, and everything in between.</p>

      <div className="filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >All
        </button>

        <button
          className={filter === 'toWatch' ? 'active' : ''}
          onClick={() => setFilter('toWatch')}
        >To Watch
        </button>

        <button
          className={filter === 'watched' ? 'active' : ''}
          onClick={() => setFilter('watched')}
        >Watched
        </button>
      </div>

      <MovieForm 
      addMovie={addMovie}
      editingMovie={editingMovie}
      updateMovie={updateMovie} 
      />

      <div className="movies">
      {filteredMovies.map((movie) => (
        <Movie
          key={movie.title}
          movie={movie}
          toggleWatched={toggleWatched}
          editMovie={editMovie}
          deleteMovie={deleteMovie}
        />
      ))}
      </div>
       
    </div>
  )
}

export default App