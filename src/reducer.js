import {combineReducers} from 'redux';

const initialState = {
    showCards: true,
    showDescriptionIds: [],
    hearted: [],
};


const componentState = (state = initialState, action) => {
    switch (action.type) {
        case 'toggleCards':
            return {
                ...state,
                showCards: action.shouldShow,
            };
        case 'toggleDescription':
            let showDescriptionIds = state.showDescriptionIds.slice();
            let indexOf = showDescriptionIds.indexOf(action.descShouldShowId);
            if (indexOf > -1) {
                showDescriptionIds.splice(indexOf, 1);
            } else {
                showDescriptionIds.push(action.descShouldShowId);
            }
            return {
                ...state,
                showDescriptionIds,
            };
        case 'toggleLiked':
            let hearted = state.hearted.slice();
            let indexOfLiked = hearted.indexOf(action.likedShouldShowId);
            if (indexOfLiked > -1) {
                hearted.splice(indexOfLiked, 1);
            } else {
                hearted.push(action.likedShouldShowId);
            }
            return {
                ...state,
                hearted,
            };
        default:
            return state;
    }
};

const initialStateOfCards = {
    mostPopular: [],
};

const cards = (state = initialStateOfCards, action) => {
    switch (action.type) {
        case 'setMostPopularMovies':
            return {
                ...state,
                mostPopular: action.list,
            };
        case 'getGenresById':
            return {
                ...state,
                mostPopular: action.genresListById
            };
        default:
            return state;
    }
};

const initialGenreList = {
    genreList: [],
};

const genreList = (state = initialGenreList, action) => {
    switch (action.type) {
        case 'getGenres':
            return {
                ...state,
                genreList: action.genresList,
            };
        default:
            return state;
    }
};

const initialLogsList = {
    logs: [],
};

const logs = (state = initialLogsList, action) => {
    switch (action.type) {
        case 'logEvents':
            let logs = state.logs.slice();
            logs.push(action.time + ": " + action.name);
            return {
                ...state,
                logs,
            };
        default:
            return state;
    }
};
export const rootReducer = combineReducers({
    componentState,
    cards,
    genreList,
    logs
});
