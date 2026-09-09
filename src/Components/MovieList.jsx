import Movie from './Movie';

const MovieList = ({
  movies,
  toggleWatched,
  editMovie,
  deleteMovie
}) => {

  return (
    <div className="movies">
      {movies.map((movie) => (
        <Movie
          key={movie._id}
          movie={movie}
          toggleWatched={toggleWatched}
          editMovie={editMovie}
          deleteMovie={deleteMovie}
        />
      ))}
    </div>
  )
}

export default MovieList;