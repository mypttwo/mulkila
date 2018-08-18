import React, { Component } from 'react';

import HomePage from './containers/HomePage/HomePage';
import GamePage from './containers/GamePage/GamePage';

export const AuthContext = React.createContext(false);


class App extends Component {

  state = {
    authenticated: false,
    inGame: false,
    user: null
  }

  render() {
    return (
      <AuthContext.Provider value={this.state.authenticated}>
        <div className="App">
          {this.loadPage()}
        </div>
      </AuthContext.Provider>
    );
  }



  enterGame = (userData) => {
    this.setState({ 
      inGame : true,
      user : userData
    })
  }

  exitGame = () => {
    this.setState({ inGame: false })
  }

  loadPage = () => {
    if (this.state.inGame) {
      return this.getGamePage();
    } else {
      return this.getHomePage();
    }
  }

  getHomePage = () => {
    return <HomePage enterGame={this.enterGame} />
  }

  getGamePage = () => {
    return <GamePage userData={this.state.user} exitGame={this.exitGame} />
  }
}

export default App;
