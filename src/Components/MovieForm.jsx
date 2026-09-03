import { useState, useEffect  } from 'react';

const MovieForm = ({ addMovie, editingMovie, updateMovie }) => {

    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [genre, setGenre] = useState('')
    const [rating, setRating] = useState('')

  useEffect(() => {
  if (editingMovie) {
    setTitle(editingMovie.title)
    setYear(editingMovie.year)
    setGenre(editingMovie.genre)
    setRating(editingMovie.rating)
  }
}, [editingMovie])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newMovie = {
      title: title,
      year: Number(year),
      genre: genre,
      rating: Number(rating),
      watched: editingMovie ? editingMovie.watched : false
    }

    if (editingMovie) {
    updateMovie(newMovie)
    } else {
    addMovie(newMovie)
    }

    setTitle('')
    setYear('')
    setGenre('')
    setRating('')
  }

  return (
    
    <form className="movie-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <input
        type="number"
        step="0.1"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <button type="submit"> {editingMovie ? 'Update Movie' : 'Add Movie'}</button>
    </form>
 
  )
}

export default MovieForm;