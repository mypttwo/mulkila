import React from 'react';
import GameRules from './Rules';

let howToPlay = (props) => {
    return (
        <div className="card">
            <div className="card-header">How To Play</div>
            <div className="card-body">
                <GameRules />
                <button className="btn btn-primary mt-3" onClick={props.displayGame}>Close</button>
            </div>
        </div>
    );
}

export default howToPlay;