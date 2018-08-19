import React from 'react';

let rules = () => {
    return (
        <div>
        <p className="card-text">Every game starts with a Jackpot. </p>
        <p className="card-text">You can only bet a fixed value to win the Jackpot.</p>
        <p className="card-text">Your bet will be live for a fixed interval of time.</p>
        <p className="card-text">If no other player bets in the interval you have won the Jackpot.</p>
        <p className="card-text">If another player bets in the interval your bet is added to the Jackpot. Your bet will not be refunded.</p>
        <p className="card-text">Dont worry. You can bet as many times as you wish!</p>
        <p className="card-text">At some unknown point of time the betting will cease. The player with the latest bet will win the Jackpot.</p>
        <p className="card-text">Thats it.</p>
        </div>
    );
}

export default rules;