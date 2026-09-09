import { useState, useEffect  } from 'react';

const MovieForm = ({ addMovie, editingMovie, updateMovie }) => {

    const initialState = {
      title: '',
      year: '',
      genre: '',
      rating: ''
    }

  const [formData, setFormData] = useState(initialState)

  const handleChange = (e) => {
  const { name, value } = e.target

  setFormData({
    ...formData,
    [name]: value
    })
  }

  useEffect(() => {
  if (editingMovie) {
    setFormData({
        title: editingMovie.title,
        year: editingMovie.year,
        genre: editingMovie.genre,
        rating: editingMovie.rating
    })
  }
}, [editingMovie])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newMovie = {
      title: formData.title,
      year: Number(formData.year),
      genre: formData.genre,
      rating: Number(formData.rating),
      watched: editingMovie ? editingMovie.watched : false
    }

    if (editingMovie) {
    updateMovie(newMovie)
    } else {
    addMovie(newMovie)
    }

   setFormData(initialState)
  }

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

      <button type="submit"> {editingMovie ? 'Update Movie' : 'Add Movie'}</button>
    </form>
 
  )
}

export default MovieForm;