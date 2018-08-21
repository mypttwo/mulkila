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
        jackpotValue: 0.054,
        gameBidSize: 0.0039,
        gameInterval: 120,
        gameEndsAt: 'unknown',
        email: '',
        userName: '',
        chatPayload: [],
        recentBidList : [
            'Fragment (FR46M3N7)',
            'Grim (6R1M)',
            'Cryptonic (CRYP70N1C)',
            'Perplex (P3RPL3X)',
            'Moonshine(M00N5H1N3)Moonshine(M00N5H1N3)Moonshine(M00N5H1N3)Moonshine(M00N5H1N3)Moonshine(M00N5H1N3)Moonshine(M00N5H1N3)Moonshine(M00N5H1N3)Moonshine(M00N5H1N3)Moonshine(M00N5H1N3)'            
        ],
        chatMessage: ''
    }

    gameAddress = gameData.address;
    gameJsonInterface = gameData.jsonInterface;

    socket;  
    
    getGameData = () => {
        console.log('gameJsonInterface : ',this.gameJsonInterface);
        
        let contractInstance = new window.web3.eth.Contract(JSON.parse(this.gameJsonInterface), this.gameAddress);
        //set (uint _bidSize, uint _interval, uint _jackpot) 
        contractInstance.methods.set(0.003, 2000).call().then((response) => {
            console.log('response set : ',response);
            contractInstance.methods.jackpotOwner().call().then((response) => {
                    console.log('response jackpotOwner : ',response);            
                })
            //start (uint _jackpot)
            contractInstance.methods.start(0.003).call().then((response) => {
                console.log('response start : ',response);
                contractInstance.methods.owner().call().then((response) => {
                    console.log('response owner : ',response);            
                })                 
                contractInstance.methods.jackpotOwner().call().then((response) => {
                    console.log('response jackpotOwner : ',response);            
                })                
                // contractInstance.methods.getCurrentGame.call().call().then((response) => {
                //     const hexToAscii = window.web3.utils.hexToAscii;
                //     console.log('response getCurrentGame : ',response);
            })                
            })

           
        }

    

    bid = () => {
        console.log('NOT IMPLEMENTED!!!!!!!');
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
    }

    componentDidMount() {

        this.getGameData();
        
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
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <Jackpot jackpotValue = {this.state.jackpotValue} timeRemaining = {this.state.timeRemaining} 
                        bid = {this.bid} gameBidSize = {this.state.gameBidSize} getGameData = {this.getGameData}/>
                        <GameSettings gameBidSize={this.state.gameBidSize} gameInterval={this.state.gameInterval} />
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