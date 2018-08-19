import React, { Component } from "react";
import { Modal, ModalBody } from 'reactstrap';

import axios from 'axios';

import GameRules from '../../components/Rules';

import { darcha } from '../../config';
import loadWeb3 from '../../ethUtils/loadWeb3';
import getNetwork from '../../ethUtils/getNetwork';
import {withContext} from '../../ContextProvider';

class HomePage extends Component {

  HOME = 1;
  RULES = 2;
  ATTRIBUTIONS = 5;

  state = {
    display: this.HOME,
    metamaskModal: false
  }

  display = () => {
    switch (this.state.display) {
      case this.RULES:
        return this.getRules();
      case this.ATTRIBUTIONS:
        return this.getAttributions();
      default:
        return this.getHome();
    }
  }

  displayHome = () => {
    this.setState({
      display: this.HOME
    })
  }

  displayRules = () => {
    this.setState({
      display: this.RULES
    })
  }

  displayAttributions = () => {
    this.setState({
      display: this.ATTRIBUTIONS
    })
  }

  toggleMetamaskModal = () => {
    this.setState({
      metamaskModal: !this.state.metamaskModal
    });
  }

  enterGame = () => {
    loadWeb3(this.handleWeb3NotAvailable, this.handleWeb3Available);
  }

  handleWeb3NotAvailable = () => {
    console.log('Metamask is not available!');
    this.toggleMetamaskModal();
  }

  handleWeb3Available = (accounts) => {
    console.log('web3,version', window.web3.version);
    getNetwork().then((networkName) => {
      console.log(networkName);
    });

    let address = accounts[0];
    console.log('add', address);
    axios.get(`${darcha}/user?address=${address}`)
      .then((response) => {
        console.log('response_', response);
        this.props.enterGame(response.data);
      })
      .catch((error) => {
        console.log('Error', error);
        if (error.response.status === 404) {
          console.log(`User ${accounts} not found`);
          axios.post(`${darcha}/user`, { ethAddress: address }).then((response) => {
            console.log('new user ', response);
            this.props.enterGame();
          }).catch((error) => {
            console.log('Error', error);
          })
        }
      });
  }

  render() {
    return this.getJumbotron();
  }

  getHome = () => {
    return (
      <main role="main" className="inner  mt-3">
        <h1 className="">{this.props.dictionary.get('home-banner')}</h1>      
      <p className="lead mt-3">{this.props.dictionary.get('home-line1')}</p>
      <p className="lead mt-3">{this.props.dictionary.get('home-line2')}</p>
        <p className="lead">
          <button className="btn btn-primary btn-lg" onClick={this.enterGame}>{this.props.dictionary.get('play-the-game')}</button>
        </p>
        {this.getLanguageBar()}        
      </main>
    );
  }

  getLanguageBar = () => {
    return (
      <div className="container-fluid pt-5">
        <div className="row">
          <div className="col-md" onClick={() => this.props.setLang('en')}><a href="#" className="text-muted">EN</a></div>
          <div className="col-md" onClick={() => this.props.setLang('zh')}><a href="#"  className="text-muted">中文</a></div>
          <div className="col-md" onClick={() => this.props.setLang('jp')}><a href="#"  className="text-muted">日本</a></div>
          <div className="col-md" onClick={() => this.props.setLang('th')}><a href="#"  className="text-muted">ไทย</a></div>
          <div className="col-md" onClick={() => this.props.setLang('ko')}><a href="#"  className="text-muted">한국어</a></div>
          <div className="col-md" onClick={() => this.props.setLang('fr')}><a href="#"  className="text-muted">FR</a></div>
          <div className="col-md" onClick={() => this.props.setLang('ru')}><a href="#"  className="text-muted">РУ</a></div>
          <div className="col-md" onClick={() => this.props.setLang('de')}><a href="#"  className="text-muted">DE</a></div>
          <div className="col-md" onClick={() => this.props.setLang('pt')}><a href="#"  className="text-muted">POR</a></div>
        </div>
      </div>
    )
  }

  getRules = () => {
    return (
      <main role="main" className="inner  mt-3">
        <h1 className="">Rules</h1>
        <GameRules />
      </main>
    );
  }

  getTerms = () => {
    return (
      <main role="main" className="inner  mt-3">
        <h1 className="">Terms</h1>
      </main>
    );
  }

  getPrivacy = () => {
    return (
      <main role="main" className="inner  mt-3">
        <h1 className="">Privacy</h1>
      </main>
    );
  }

  getAttributions = () => {
    return (
      <main role="main" className="inner  mt-3">
        <h1 className="">Attributions</h1>
      </main>
    );
  }

  getMetamaskModal = () => {
    return (
      <Modal centered={true} isOpen={this.state.metamaskModal} toggle={this.toggleMetamaskModal} className={this.props.className}>
        <ModalBody>
          <img src='favicon.ico' className="rounded mx-auto d-block mt-3" alt="Makhno" />
          <div className="text-center">
            <p className="text-mono mt-3">You will need to login to <a href='https://metamask.io/' target="_newtab"> MetaMask </a> to continue.</p>
            <button type="button" className="btn btn-dark btn-shadow my-2 ml-0 text-left mr-1" onClick={this.toggleMetamaskModal}>I understand</button>
          </div>
        </ModalBody>
      </Modal>
    );
  }

  getJumbotron = () => {
    return (
      <div>
        {this.getMetamaskModal()}
        <div className="text-center">
          <div className="container d-flex h-100 p-3 mx-auto flex-column">
            <header className="mb-auto">
              <div className="inner">
                <h3 className="">{this.props.dictionary.get('product-name')}</h3>
                <nav className="nav justify-content-center">

                  <a className="nav-link active" href="#" onClick={this.displayHome}>{this.props.dictionary.get('home-nav-home')}</a>
                  <a className="nav-link" href="#" onClick={this.displayRules}>{this.props.dictionary.get('home-nav-rules')}</a>
                </nav>
              </div>
            </header>
            {this.display()}
          </div>
        </div>
        <footer className="footer">
          <div className="container text-center">
            <nav className="nav justify-content-center">
              <a className="nav-link small" href="#" onClick={this.displayAttributions}>Attributions</a>
            </nav>
          </div>
        </footer>
      </div>
    );
  }
}

export default withContext(HomePage);