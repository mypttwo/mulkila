import React from 'react';

let rules = () => {
    return (
        <div>
        <p className="card-text">You can only bid a fixed value.</p>
        <p className="card-text">Your bid will be live for a fixed interval of time.</p>
        <p className="card-text">If no other player bids in the interval you have won the Jackpot.</p>
        <p className="card-text">If another player bids in the interval your bid is added to the Jackpot. Your bid will not be refunded.</p>
        <p className="card-text">At some unknown point of time the bidding will cease. The player with the latest bid will win the Jackpot.</p>
        <p className="card-text">Thats it.</p>
        </div>
    );
}

export default rules;