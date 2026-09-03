const Movie = ({ movie, toggleWatched, editMovie, deleteMovie  }) => {
  return (
    <div className="movie">
        <h2>{movie.title}</h2>
        <p>{movie.year} • {movie.genre}</p>
        <p className="rating">⭐ {movie.rating}</p>

        {movie.watched && (
        <p className="watched-status">✓ Watched</p>
        )}

        <button onClick={() => toggleWatched(movie._id)}>
            {movie.watched ? 'Mark as To Watch' : 'Mark as Watched'}</button>

        <button onClick={() => editMovie(movie)}>Edit</button>
        <button onClick={() => deleteMovie(movie._id)}>Delete</button>

    </div>
  )
}

export default Movie;