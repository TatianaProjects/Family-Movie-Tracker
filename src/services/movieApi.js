import axios from 'axios';

const baseUrl = 'https://family-movie-tracker.onrender.com';

export const getMovies = () => {
  return axios.get(`${baseUrl}/movies`);
};

export const addMovie = (movie) => {
  return axios.post(`${baseUrl}/movies`, movie);
};

export const updateMovie = (id, movie) => {
  return axios.put(`${baseUrl}/movies/${id}`, movie);
};

export const deleteMovie = (id) => {
  return axios.delete(`${baseUrl}/movies/${id}`);
};