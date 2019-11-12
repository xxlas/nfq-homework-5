export const toggleCards = (shouldShow) => ({
    type: 'toggleCards',
    shouldShow,
});

export const toggleDescription = (descShouldShowId) => ({
    type: 'toggleDescription',
    descShouldShowId
});

export const toggleLiked = (likedShouldShowId) => ({
    type: 'toggleLiked',
    likedShouldShowId,
});

export const setMostPopularMovies = (list) => ({
    type: 'setMostPopularMovies',
    list,
});

export const getGenres = (genresList) => ({
    type: 'getGenres',
    genresList,
});

export const getGenresById = (genresListById) => ({
    type: 'getGenresById',
    genresListById,
});

export const logEvents = (time, name) => ({
    type: 'logEvents',
    time, name
});
