import React from 'react';

let playerArea = (props) => {

    let getChatLi = (props) =>{
        return props.chatPayload.map((chat, index) => {
            return (
                <div className="text-justify ml-3 mr-3 mt-1" key={index} >
                <p className="text-truncate small">{chat.name}</p>
                <p>{chat.says}</p>
                <hr/>
                </div>
            )
        });
    }

    let getRecentBidLi = (props) => {
        return props.recentBidList.map((bid, index) => {
            return (
                <li className="list-group-item text-truncate" key={index}>{bid}</li>
            )
        });
    }

    return (
        <div>
        <div className="card text-center mt-3">
            <div className="card-header">Recent Bids</div>
            <ul className="list-group">
                {getRecentBidLi(props)}
            </ul>
        </div>
        <div className="card text-center mt-3">
        <div className="card-header">Chat</div>
        <div className="input-group m-3 pr-5">
            <input id="btn-input" type="text" className="form-control input-sm" placeholder="Type your message here..." value={props.chatMessage} onChange={props.updateChatMessage}/>
            <span className="input-group-append">
                <button className="btn btn-warning btn-sm" id="btn-chat" onClick={props.sendMessage}>Send</button>
            </span>
        </div>
        <div className="scrolling-wrapper">{getChatLi(props)}</div>                
    </div>  
    </div>  

    );
}

export default playerArea;