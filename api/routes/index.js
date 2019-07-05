import express from 'express';
const router = express.Router();
const app = express();
import * as db from '../utils/dbUtils';

// Setting up a connection with DB
db.setUpConnection();

app.use(express.json());

// List movies
router.get('/getMovies', (req, res) => {
    return db.listMovies()
        .then(movies => res.status(200).send({status: 'ok', movies: movies}))
        .catch(() => res.status(400).send({status: 'error', message: 'Cannot get movies'}));
  });

// Remove movie
router.delete('/removeMovie', (req, res) => {
    req.query.id
        ? db.removeMovie(req.query.id)
            .then((data) => data  ? res.status(200).send({status: 'ok'})
                                  : res.status(400).send({status: 'error', message: 'Movie not found'}))
            .catch(() => res.status(400).send({status: 'error', message: 'Cannot delete movie'}))
        : res.status(400).send({status: 'error', message: 'Wrong movie id'});
  });

// Add movie
router.post('/addMovie', (req, res) => {
    const {title, actors, year, format} = req.body;
    title && actors && year && format
        ? db.addMovie({title, actors, year, format})
            .then(() => res.status(200).send({status: "ok"}))
            .catch(() => res.status(400).send({status: 'error', message: 'Movie can not be added'}))
        : res.status(400).send({status: 'error', message: 'Wrong data to add a movie'});
  });

// Add movies
router.post('/addMovies', (req, res) => {
    Promise.all(db.addMovies(req.body))
        .then(() => res.status(200).send({status: "ok"}))
        .catch(() => res.status(400).send({status: "error", message: "Movies can not be added"}));

});

module.exports = router;
