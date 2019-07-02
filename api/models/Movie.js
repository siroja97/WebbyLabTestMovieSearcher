import mongoose from 'mongoose';

export const Schema = mongoose.Schema;

export const MovieSchema = Schema({
  _id: {type: Schema.ObjectId, required: false},
  title: {type: String, required: true},
  actors: {type: String, required: true},
  year: {type: Number, required: true},
  format: {type: String, required: true}
});

export const Movie = mongoose.model("Movie", MovieSchema);
