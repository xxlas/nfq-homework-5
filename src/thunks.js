import axios from 'axios';
import {setMostPopularMovies, getGenres, getGenresById} from './actions';
import { endpoints } from './config';

export const getMostPopularMovies = () => (dispatch) => {
  axios
    .get(endpoints.mostPopularMovies())
    .then((data) => {
      dispatch(setMostPopularMovies(data.data.results));
    });
};

export const getGenresList = () => (dispatch) => {
    axios
        .get(endpoints.genres())
        .then((data) => {
        dispatch(getGenres(data.data.genres));
    });
};
export const getMostPopularMoviesByGenres = (id) => (dispatch) => {
    axios
        .get(endpoints.genreMovies(id))
        .then((data) => {
            dispatch(getGenresById(data.data.results));
    });
};
