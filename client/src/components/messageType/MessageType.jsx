import './messageType.css';
import Send from '../../assets/Send.png';
import Upload from '../../assets/Upload.png';
import React, { useState } from 'react';
import { io } from 'socket.io-client';
import Message from '../message/Message.jsx';
import PFP from '../../assets/UserPhoto.png';
import { useEffect } from 'react';



export default function MessageType({ socket, chat, chatId, username }) {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    useEffect(() => {
        if(chat) {
            setMessageList(chat.messages);
        }

    }, [chat]);

    
    const sendMessage = async () => {
        if (message && message !== "") {
            const messageData = {
                chatId: chatId,
                user: username,
                message: message,
                time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };
            
            await socket.emit("send_message", messageData);
            console.log("Message sent:", messageData);
            setMessageList((list) => [ ...list, messageData ]);
            setMessage("");
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };
    
    useEffect(() => {
        const handleMessage = (data) => {
            console.log("Message received:", data);
            setMessageList((list) => [...list, data]);
        };

        socket.on('receive_message', handleMessage);
        return () => {
            socket.off('receive_message', handleMessage);
        };

    }, [socket]);
    
    return (
        <div className='full-chat'>
            <div className="chat" key={messageList.length}>
                {messageList.map((message, index) => (
                    <Message
                    key={`${index}-${message.time}`}
                    user={message.user}
                    sentByUser={message.user === username}
                    message={message.message}
                    timeDelivered={message.time}
                    pfp={PFP}
                />
                ))}
            </div>
            <form onSubmit={handleSubmit} id="message-form">
                <button type="button" id="upload-button">
                    <img src={Upload} id='upload-icon' alt="Upload" />
                </button>
                <input 
                    type="text" 
                    id="message-input" 
                    placeholder="Type a message..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" id="send-button">
                    <img src={Send} id='send-icon' alt="Send" />
                </button>
            </form>
        </div>
    );
}
