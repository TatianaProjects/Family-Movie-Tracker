import './App.css';
import MovieForm from './Components/MovieForm';
import MovieFilters from './Components/MovieFilters';
import MovieList from './Components/MovieList';
import useMovies from './hooks/useMovies';


function App() {

  const {
    filter,
    setFilter,
    editingMovie,
    handleAddMovie,
    editMovie,
    handleUpdateMovie,
    toggleWatched,
    filteredMovies,
    handleDeleteMovie
  } = useMovies();

  return (
    <div className="App">
      <h1>Family Movie Tracker</h1>

      <p className="subtitle">Movies to watch, movies we loved, and everything in between.</p>


    <MovieFilters
      filter={filter}
      setFilter={setFilter}
    />
      
    <MovieForm 
      addMovie={handleAddMovie}
      editingMovie={editingMovie}
      updateMovie={handleUpdateMovie} 
    />

    <MovieList
      movies={filteredMovies}
      toggleWatched={toggleWatched}
      editMovie={editMovie}
      deleteMovie={handleDeleteMovie}
    />
       
    </div>
  )
}

export default App;