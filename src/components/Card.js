import React from 'react';
import {connect} from 'react-redux';
import {logEvents, toggleDescription, toggleLiked} from "../actions";

export class Card extends React.Component {

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
        const {id, title, backgroundImage, date, rating, votes, description} = this.props;
        return (
            <div className="card">
                <div
                    className="card__image"
                    style={{
                        backgroundImage: `url(${backgroundImage})`
                    }}/>

                <div className="card__title">
                    {title}
                </div>

                <div className="card__like" onClick={() => {
                    this.props.onToggleLiked(id);
                    this.props.hearted.indexOf(id) > -1
                        ? this.props.onLogEvent(this.getDateTime(), 'Nuimta širdelė filmui ' + title)
                        : this.props.onLogEvent(this.getDateTime(), 'Uždėta širdelė ' + title);
                }}>
                    {this.props.hearted.indexOf(id) > -1 ? <i className="fa fa-heart"/> :
                        <i className="fa fa-heart-o"/>}
                </div>

                <div className="card__subtitle">
                    <span>{date}</span>
                    <span>{rating} ({votes} votes)</span>
                </div>

                <div className="card-info">
                    <div className="card-info__header">Summary</div>
                    <button onClick={() => {
                        this.props.onToggleDescription(id)
                    }}>Toggle
                    </button>
                    <div className="card-info__description">
                        {this.props.showDescriptionIds.indexOf(id) > -1 ? description : null}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    showDescriptionIds: state.componentState.showDescriptionIds,
    hearted: state.componentState.hearted,
});


const mapDispatchToProps = (dispatch) => ({
    onToggleDescription: (descShouldShowId) => dispatch(toggleDescription(descShouldShowId)),
    onToggleLiked: (likedShouldShowId) => dispatch(toggleLiked(likedShouldShowId)),
    onLogEvent: (time, name) => dispatch(logEvents(time, name)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Card);
