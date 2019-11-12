import React from 'react';
import {connect} from 'react-redux';
import {logEvents, toggleCards} from '../actions';
import {getGenresList, getMostPopularMovies, getMostPopularMoviesByGenres} from '../thunks';
import Card from './Card';
import {getImageUrl} from '../config';

class App extends React.Component {

    componentDidMount() {
        this.props.onGetMostPopularMovies();
        this.props.onGetGenreList();
        this.props.onLogEvent(this.getDateTime(), "Aplikacija užkrauta");
    }

    getDateTime() {
        let date = new Date();
        let options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return date.toLocaleDateString('lt-LT', options);
    }

    render() {
        return (
            <div className="container">
                <header>
                    <button
                        style={{display: 'block', margin: '0 auto'}}
                        onClick={() => this.props.onToggleCards(!this.props.showCards)}
                    >
                        Hide movies
                    </button>
                </header>

                <div className="genres">
                    {this.props.genreList.map((genre) => (
                        <button className="genre"
                                id={genre.id}
                                key={genre.id}
                                onClick={() => {
                                  this.props.onGetGenresById(genre.id);
                                  this.props.onLogEvent(this.getDateTime(), "Pakeistas žanras į " +genre.name)}}
                        > {genre.name}</button>
                    ))}
                    <button className="genre" onClick={() => this.props.onGetMostPopularMovies()}> Visi</button>
                </div>

                {this.props.showCards
                    ? (
                        <div className="cards">
                            {
                                this.props.mostPopularMovies.map((card) => (
                                    <Card
                                        id={card.id}
                                        key={card.id}
                                        backgroundImage={getImageUrl(card.backdrop_path)}
                                        date={card.release_date}
                                        rating={card.vote_average}
                                        votes={card.vote_count}
                                        description={card.overview}
                                        title={card.original_title}
                                    />
                                ))

                            }
                        </div>
                    )
                    : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    showCards: state.componentState.showCards,
    mostPopularMovies: state.cards.mostPopular,
    genreList: state.genreList.genreList,
});


const mapDispatchToProps = (dispatch) => ({
    onToggleCards: (shouldShow) => dispatch(toggleCards(shouldShow)),
    onGetMostPopularMovies: () => dispatch(getMostPopularMovies()),
    onGetGenreList: () => dispatch(getGenresList()),
    onGetGenresById: (genresListById) => dispatch(getMostPopularMoviesByGenres(genresListById)),
    onLogEvent: (time, name) => dispatch(logEvents(time, name)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
