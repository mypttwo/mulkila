import React, { Component } from 'react';
import socketioClient from 'socket.io-client';

import Jackpot from '../../components/GameJackpot';
import GameSettings from '../../components/GameSettings';
import AfterBidModal from '../../components/GameAfterBidModal';
import HowToPlay from '../../components/GameHowToPlay';
import GameNavbar from '../../components/GameNavbar';
import PlayerArea from '../../components/GamePlayerArea';
import UserSettings from '../../components/GameUserSettings';

import secondsToHms from '../../utils/secondsConverter';
import { darcha } from '../../config';
import gameData from '../../gameData';

import {withContext} from '../../ContextProvider';

class GamePage extends Component {
    GAME = 1;
    HOWTOPLAY = 2;
    MYSETTINGS = 3;
    state = {
        display: this.GAME,
        timeRemaining: ' ',
        endTime: 0,
        jackpotValue: 0,
        jackpotOwner: '',
        gameBidSize: 0,
        gameStatus: 0, 
        email: '',
        userName: '',
        chatPayload: [],
        recentBidList : [],
        chatMessage: ''
    }

    gameAddress = gameData.address;
    gameJsonInterface = gameData.jsonInterface;

    contractInstance;

    socket;  
    
    getGameData = () => {
        this.contractInstance.methods.getCurrentGame.call().call()
        .then((response) => {
            //const hexToAscii = window.web3.utils.hexToAscii;
            console.log('response getCurrentGame : ',response);
           
            this.setState({
                gameStatus : parseInt(response[0]),
                jackpotValue : response[1],
                jackpotOwner: response[2],
                gameBidSize: response[3]
            })
        })
    }

    bid = () => {
        // this.contractInstance.events.BidPlaced((error, response) => {
        //     if(error){
        //         console.log('Bid Placed error', error);
                
        //     } else {
        //         console.log('BidPLaced response : ',response);
                
        //     }

        // });
        
        this.contractInstance.methods.bid().send({ from: this.props.userData.ethAddress, 
                gas: 3000000, value: this.state.gameBidSize
            }, function(err, res){
            if(err){
                console.log(err);
            } 
            console.log(res);
        });
    }

    setEndTime = () => {
        clearInterval(this.intervalID);

        let minutes = Math.round(120 / 60);
        this.setState({
            endTime: new Date(new Date().getTime() + minutes * 60000)
        });

        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick = () => {
        let secsRemaining = Math.round((this.state.endTime - new Date().getTime()) / 1000);
        if (secsRemaining < 0) {
            clearInterval(this.intervalID);
            secsRemaining = 0;
        }
        let timeRemaining = secondsToHms(secsRemaining);
        this.setState({
            timeRemaining: timeRemaining
        });
    }

    componentWillUnmount() {
        console.log('chat disconnected from client');
        this.socket.disconnect();
        clearInterval(this.intervalID);
        clearInterval(this.intervalRefresh);
    }


    componentDidMount() {
        this.contractInstance = new window.web3.eth.Contract(JSON.parse(this.gameJsonInterface), this.gameAddress);

        this.getGameData();

        this.intervalRefresh = setInterval(
            () => this.getGameData(),
            5000
        );
        
        console.log('chat connected from client');
        this.socket = socketioClient(darcha);

        this.socket.on('newMessage', payload => {
            let _chatPayload = [...this.state.chatPayload];
            _chatPayload.unshift(payload);
           
            this.setState({
                chatPayload: _chatPayload
            });
        });
        this.socket.on('disconnect', () => {
            console.log('chat disconnected from server');
        })
    }

    displayRules = () => {
        this.setState({
            display: this.HOWTOPLAY
        })
    }

    displaySettings = () => {
        this.setState({
            display: this.MYSETTINGS
        })
    }

    displayGame = () => {
        this.setState({
            display: this.GAME
        })
    }

    updateEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    updateUserName = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    updateChatMessage = (event) => {
        this.setState({
            chatMessage: event.target.value
        })
    }

    sendMessage = () => {
        let chatPayload = {
            name : this.props.userData.ethAddress,
            says : this.state.chatMessage
        }
        this.setState({chatMessage : ''});
        this.socket.emit('createMessage', chatPayload);
    }

    saveMySettings = () => {
        console.log('NOT IMPLEMENTED!!!!!!!');
    }

    render() {
        return (
            <div>
                <GameNavbar exitGame={this.props.exitGame} displayGame={this.displayGame} 
                displayRules={this.displayRules} displaySettings={this.displaySettings}/>
                {this.getMainArea()}
            </div>
        )
    }

    getMainArea = () => {
        switch (this.state.display) {
            case this.HOWTOPLAY: {
                return (
                    <div className="container-fluid">
                        <HowToPlay displayGame={this.displayGame} />
                    </div>
                );
            }
            case this.MYSETTINGS: {
                return (
                    <div className="container-fluid">
                        <UserSettings email={this.state.email} updateEmail={this.updateEmail} userName={this.state.userName} 
                        updateUserName={this.updateUserName} saveMySettings={this.saveMySettings} />
                    </div>
                );
            }
            default: {
                return (
                    <div className="container-fluid">
                        {this.getGameArea()}
                    </div>
                );
            }
        }
    }

    getGameArea = () => {
        
        let disabled = false;
        if(this.state.gameStatus === 0){
            disabled = true;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <Jackpot jackpotValue = {this.state.jackpotValue} jackpotOwner = {this.state.jackpotOwner} timeRemaining = {this.state.timeRemaining} 
                        bid = {this.bid} gameBidSize = {this.state.gameBidSize} getGameData = {this.getGameData} bidDisabled = {disabled}/>
                        <GameSettings gameBidSize={this.state.gameBidSize} gameStatus={this.state.gameStatus} ethAddress={this.props.userData.ethAddress} networkName={this.props.networkName} />                        
                        <AfterBidModal />
                    </div>
                    <div className="col-sm-6">
                        <PlayerArea chatPayload={this.state.chatPayload} recentBidList={this.state.recentBidList}
                        chatMessage={this.state.chatMessage} updateChatMessage={this.updateChatMessage}
                        sendMessage={this.sendMessage}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withContext(GamePage);