import React from 'react';

import secondsToHms from '../utils/secondsConverter';

let gameSettings = (props) => {
    return (
        <div className="card text-center mt-3">
            <div className="card-header">Game Settings</div>
            <p className="mt-3">Bid Value (Fixed) : {props.gameBidSize}</p>
            <p >Interval : {secondsToHms(props.gameInterval)}</p>
        </div>
    );
}

export default gameSettings;