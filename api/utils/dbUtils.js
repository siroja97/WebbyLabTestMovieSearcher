import mongoose from 'mongoose';
import '../models/Movie';

const Movie = mongoose.model('Movie');

export function setUpConnection() {
  mongoose.connect(`mongodb://localhost:27017/movie`)
}

export function listMovies() {
  return Movie.find();
}

export function addMovie({title, actors, year, format}) {
  const movie = new Movie({
    _id: mongoose.Types.ObjectId(),
    title,
    actors,
    year,
    format,
  });

  return movie.save();
}


export function removeMovie(id) {
  return Movie.findByIdAndRemove(id);
}
