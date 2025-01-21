import './MessageDashboard.css';
import Navbar from '../navbar/navbar.jsx';
import Message from '../message/Message.jsx';
import MessagePreview from '../messagePreview/MessagePreview.jsx';
import MessageType from '../messageType/MessageType.jsx';
import PFP from '../../assets/UserPhoto.png';
import BackArrow from '../../assets/BackArrow.png'
import logo from '../../assets/ROOMME.png'
import Profile from '../../assets/Profile.png'
import { useState, useEffect } from 'react';
import Chat from '../chat/Chat.jsx';
export default function MessageDashboard() {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [displayName, setDisplayName] = useState("");
    const [wantedChats, setWantedChats] = useState([]);
    const [chatData, setChatData] = useState([]);
    console.log(wantedChats);
    // const sendMessage = async () => {
    //   if (currentMessage !== "") {
    //     const messageData = {
    //       room: room,
    //       author: username,
    //       message: currentMessage,
    //       time:
    //         new Date(Date.now()).getHours() +
    //         ":" +
    //         new Date(Date.now()).getMinutes(),
    //     };
  
    //     await socket.emit("send_message", messageData);
    //     setMessageList((list) => [...list, messageData]);
    //     setCurrentMessage("");
    //   }
    // };
  
    useEffect(() => {
        fetch('http://localhost:5174/getMe/me', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            setDisplayName(data.user_info.display_name);
            setWantedChats(data.chat_ids);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if (wantedChats) {
            // console.log('Wanted chats:', wantedChats);
            // console.log(JSON.stringify(wantedChats));
            fetch('http://localhost:5174/chat/get', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(wantedChats),
            })
                .then(response => response.json())
                .then(data => {
                    // console.log('Fetched data:', data);
                    setChatData(data);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [wantedChats]);

    console.log("chat: " + JSON.stringify(chatData));
    console.log("display name: " + displayName);
    console.log("wnated: " + JSON.stringify(wantedChats));
    return(
        <>
            <div className="MessageDashboard">
                <div className="Contacts">
                    <div className="contact-header">
                        <a href="../../../index.html">
                            <img src={BackArrow} id='contact-back-arrow' />
                        </a>
                        <img src={logo} id='contact-logo' />
                        <a href="../../../pages/userPage/userPage.html">
                            <img src={Profile} id='contact-profile-icon' />
                        </a>
                    </div>
                    <div className="contact-cards">
                        {chatData.map((chat, index) => (
                            <MessagePreview 
                                key={index}
                                name={chat.users[0] == displayName ? chat.users[1] : chat.users[0]} 
                                lastMessage={chat.messages && chat.messages[0] ? chat.messages[0].message : ''} 
                                lastSent={chat.messages && chat.messages[0] ? chat.messages[0].time : ''} 
                                numUnread={0} 
                                // pfp={message.pfp}
                            />
                        ))}
                    </div>
                </div>
                <Chat chat={chatData[0]} user={displayName}/>
                <div className="send">
                    <MessageType/>
                </div>
            </div>
        </>
    )
}