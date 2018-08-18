import React from 'react';

let jackpot = (props) => {
    return (
        <div className="card text-center mt-3">
            <div className="card-header"><h5 className="card-title">Jackpot</h5></div>
            <div className="card-body">
                <h5 className="card-title">{props.jackpotValue} eth</h5>
                <p className="card-text">{props.timeRemaining}</p>
                <button
                    type="button"
                    className="btn btn-shadow text-mono btn-primary"
                    data-toggle="modal"
                    data-target="#afterBidModalCenter"
                    onClick={props.bid}>
                    Bid {props.gameBidSize} eth now!
                </button>
            </div>
            <div className="card-footer">
                <button
                    type="button"
                    className="btn btn-shadow text-mono btn-dark btn-sm"
                    onClick={props.setEndTime}>
                    Refresh
                </button>
            </div>
        </div>
    );
}

export default jackpot;