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
export default function MessageDashboard() {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [displayName, setDisplayName] = useState("");
    const [wantedChats, setWantedChats] = useState([]);
    const [chatData, setChatData] = useState([]);
    const sendMessage = async () => {
      if (currentMessage !== "") {
        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
  
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    };
  
    useEffect(() => {
        fetch('http://localhost:5174/getMe/me', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
            setDisplayName(data.user_info.display_name);
            setWantedChats(data.chat_ids);
            
          
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        if (wantedChats.length>0) {
            //console.log('Wanted chats:', wantedChats);
            console.log(JSON.stringify(wantedChats));
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
                    console.log('Fetched data:', data);
                    setChatData(data);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [wantedChats]);

    // const messages = [
    //     { name: "Nate", lastMessage: "Hi my name is Nate...", lastSent: "10m", numUnread: "1", pfp: PFP },
    //     { name: "Alice", lastMessage: "Are you available for a call?", lastSent: "15m", numUnread: "2", pfp: PFP },
    //     { name: "Bob", lastMessage: "Let's catch up soon!", lastSent: "1h", numUnread: "0", pfp: PFP },
    //     { name: "Charlie", lastMessage: "Can you send me the document?", lastSent: "2h", numUnread: "3", pfp: PFP },
    //     { name: "David", lastMessage: "Thanks for the help!", lastSent: "3h", numUnread: "0", pfp: PFP },
    //     { name: "Eve", lastMessage: "See you tomorrow!", lastSent: "5h", numUnread: "1", pfp: PFP },
    //     { name: "Frank", lastMessage: "Good morning!", lastSent: "8h", numUnread: "0", pfp: PFP },
    //     { name: "Grace", lastMessage: "Can we reschedule?", lastSent: "1d", numUnread: "4", pfp: PFP },
    //     { name: "Hank", lastMessage: "Happy Birthday!", lastSent: "2d", numUnread: "0", pfp: PFP },
    //     { name: "Ivy", lastMessage: "Let's meet at 5 PM.", lastSent: "3d", numUnread: "2", pfp: PFP },
    //     { name: "Jack", lastMessage: "I'll be there in 10 minutes.", lastSent: "4d", numUnread: "1", pfp: PFP },
    //     { name: "Karen", lastMessage: "Can you review this?", lastSent: "5d", numUnread: "0", pfp: PFP },
    //     { name: "Leo", lastMessage: "Thanks!", lastSent: "6d", numUnread: "0", pfp: PFP },
    //     { name: "Mia", lastMessage: "See you soon!", lastSent: "1w", numUnread: "3", pfp: PFP },
    //     { name: "Nina", lastMessage: "Good night!", lastSent: "2w", numUnread: "0", pfp: PFP },
    // ];
    console.log("chat: " + JSON.stringify(chatData));
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
                                lastMessage={chat.messages[0].message} 
                                lastSent={chat.messages[0].time} 
                                numUnread={0} 
                                // pfp={message.pfp}
                            />
                        ))}
                    </div>
                </div>
                <div className="chat">
                    <Message user="Nate" sentByUser={true} message="Hi my name is Nate. I was wondering if you wanted to be my roommate? I promise I'm normal! I only eat birds sometimes." timeDelivered="2:34 AM" pfp={PFP}/>
                    <Message user="Nate" sentByUser={false} message="Hi my name is Nate. I was wondering if you wanted to be my roommate? I promise I'm normal! I only eat birds sometimes." timeDelivered="2:34 AM" pfp={PFP}/>
                </div>
                <div className="send">
                    <MessageType/>
                </div>
            </div>
        </>
    )
}