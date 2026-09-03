const Movie = require('../models/Movie')

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body)
    res.status(201).json(movie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    res.json(movie)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id)

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    res.json({ message: 'Movie deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { getMovies,  createMovie, updateMovie, deleteMovie }