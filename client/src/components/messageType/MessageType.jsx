import './messageType.css';
import Send from '../../assets/Send.png';
import Upload from '../../assets/Upload.png';
import React, { useState } from 'react';
import { io } from 'socket.io-client';
import Message from '../message/Message.jsx';
import PFP from '../../assets/UserPhoto.png';
import { useEffect } from 'react';


export default function MessageType({ socket, chat, chatId, username, id }) {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    useEffect(() => {
        if(chat) {
            setMessageList(chat.messages);
        }

    }, [chat]);

    const createRequest = async () => {
        try {
            const response = await fetch('http://localhost:5174/roomRequest/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                id: id,
                request_sent_to: chat.users[0] === username ? chat.users[1] : chat.users[0],
            }),
            });

            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Request sent successfully:', data);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

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
    
    const chatRef = React.useRef(null);
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messageList]);

    return (
        <div className='full-chat'>
            {/* <ScrollToBottom className="chat"> */}
            <div className="chat" key={messageList.length} ref={chatRef}>
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
            {/* </ScrollToBottom> */}
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
                <button className="request-btn" onClick={createRequest}>Request</button>
            </form>
        </div>
    );
}
