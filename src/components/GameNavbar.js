import React from 'react';

import {withContext} from '../ContextProvider';

let gameNavbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" onClick={props.exitGame}>{props.dictionary.get('product-name')}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" focusable="false"><title>Menu</title><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path></svg></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="#" onClick={props.displayGame} >Game <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" href="#" onClick={props.displayRules} >How to play</a>
                    <a className="nav-item nav-link" href="#" onClick={props.displaySettings} >My Settings</a>
                    <a className="nav-item nav-link" href="#" onClick={props.exitGame}>Exit Game</a>
                </div>
            </div>
        </nav>
    );
}

export default withContext(gameNavbar);