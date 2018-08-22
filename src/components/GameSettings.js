import React from 'react';

import secondsToHms from '../utils/secondsConverter';

let gameSettings = (props) => {
    let gameStatus = 'Ended';
    if(props.gameStatus === 1){
        gameStatus = 'Started'
    }

    return (
        <div className="card mt-3">
          <div className="card-header">Game ({gameStatus})</div>
            <div className="card-body align-items-start">
            <h6 className="card-subtitle mb-2 text-muted">Account</h6>
                <p className="card-text text-truncate">{props.ethAddress}</p>
                <h6 className="card-subtitle mb-2 text-muted">Network</h6>    
                <p className="card-text text-truncate">{props.networkName}</p>  
                <h6 className="card-subtitle mb-2 text-muted">Bid Value (Fixed) </h6>    
                <p className="card-text text-truncate">{props.gameBidSize}</p>                  
            </div>
        </div>
    );
}

export default gameSettings;