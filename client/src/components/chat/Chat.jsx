import React from 'react';
import Message from '../message/Message.jsx';
import './Chat.css';
import PFP from '../../assets/UserPhoto.png';

function Chat(props){
    console.log(props);
    return(
        <div className="chat">
            {props.chat.messages.map((message, index) => (
                <Message
                key={index}
                user={message.user}
                sentByUser={message.user === props.user}
                message={message.message}
                timeDelivered={message.time}
                pfp={PFP}
               />
            ))}
        </div>
    );
}

export default Chat;