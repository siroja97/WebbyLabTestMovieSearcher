import mongoose from 'mongoose';
import '../models/Movie';

const Movie = mongoose.model('Movie');

export function setUpConnection() {
  mongoose.connect(`mongodb://localhost:27017/movie`, { useNewUrlParser: true })
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

export function addMovies(movies) {
  return movies.map(movie => {
    const {Title: title, 'Release Year': year, Format: format, Stars: actors} = movie;
    const movieModel = new Movie({
      _id: mongoose.Types.ObjectId(),
      title,
      actors,
      year,
      format,
    });
    return movieModel.save();
  });
}


export function removeMovie(id) {
  return Movie.findByIdAndRemove(id);
}
