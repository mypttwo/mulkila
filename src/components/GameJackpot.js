import React from 'react';

let jackpot = (props) => {
    let bidButton = (
        <button
        type="button"
        className="btn btn-shadow text-mono btn-primary"
        data-toggle="modal"
        data-target="#afterBidModalCenter"
        onClick={props.bid} >
        Bid {props.gameBidSize} wei now!
    </button>
    );
    
    if(props.bidDisabled) {
        bidButton = (<div className="alert alert-warning" role="alert">The game has ended.</div>);
    } 
    return (
        <div className="card text-center mt-3">
            <div className="card-header"><h5 className="card-title">Jackpot</h5></div>
            <div className="card-body">
                <h4 className="card-title">{props.jackpotValue} wei</h4>
                <p ><small>{props.jackpotOwner}</small></p>
                <p className="card-text">{props.timeRemaining}</p>
                {bidButton}
            </div>
            <div className="card-footer">
                <button
                    type="button"
                    className="btn btn-shadow text-mono btn-dark btn-sm"
                    onClick={props.getGameData}>
                    Refresh
                </button>
            </div>
        </div>
    );
}

export default jackpot;