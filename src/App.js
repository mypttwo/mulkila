import React, { Component } from 'react';

import HomePage from './containers/HomePage/HomePage';
import GamePage from './containers/GamePage/GamePage';

import {ContextProvider} from './ContextProvider';
import getDictionary from './lang/getDictionary';


class App extends Component {

  state = {
    lang : 'en',
    inGame: false,
    user: null,
    networkName : null
  }

  render() {
    return (
      <ContextProvider dictionary={getDictionary(this.state.lang)}>
        <div className="App">
          {this.loadPage()}
        </div>
      </ContextProvider>  
    );
  }

  enterGame = (userData, networkName) => {
    this.setState({ 
      inGame : true,
      user : userData,
      networkName : networkName
    })
  }

  exitGame = () => {
    this.setState({ inGame: false })
  }

  setLang = (lng) => {
    this.setState({
      lang : lng
    })
  }

  loadPage = () => {
    if (this.state.inGame) {
      return this.getGamePage();
    } else {
      return this.getHomePage();
    }
  }

  getHomePage = () => {
    return <HomePage enterGame={this.enterGame} setLang={this.setLang}/>
  }

  getGamePage = () => {
    return <GamePage userData={this.state.user} networkName={this.state.networkName} exitGame={this.exitGame} />
  }
}

export default App;
