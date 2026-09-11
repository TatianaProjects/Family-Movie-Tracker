import './App.css';
import MovieForm from './Components/MovieForm';
import MovieFilters from './Components/MovieFilters';
import MovieList from './Components/MovieList';



function App() {

  return (
    <div className="App">
      <h1>Family Movie Tracker</h1>

      <p className="subtitle">Movies to watch, movies we loved, and everything in between.</p>


    <MovieFilters/>
      
    <MovieForm />

    <MovieList/>
       
    </div>
  )
}

export default App;