import './MessageDashboard.css';
import Message from '../message/Message.jsx';
import MessagePreview from '../messagePreview/MessagePreview.jsx';
import MessageType from '../messageType/MessageType.jsx';
import PFP from '../../assets/UserPhoto.png';
import logo from '../../assets/logo.svg'
import Profile from '../../assets/Profile.png'
export default function MessageDashboard() {
    const messages = [
        { name: "Nate", lastMessage: "Hi my name is Nate...", lastSent: "10m", numUnread: "1", pfp: PFP },
        { name: "Alice", lastMessage: "Are you available for a call?", lastSent: "15m", numUnread: "2", pfp: PFP },
        { name: "Bob", lastMessage: "Let's catch up soon!", lastSent: "1h", numUnread: "0", pfp: PFP },
        { name: "Charlie", lastMessage: "Can you send me the document?", lastSent: "2h", numUnread: "3", pfp: PFP },
        { name: "David", lastMessage: "Thanks for the help!", lastSent: "3h", numUnread: "0", pfp: PFP },
        { name: "Eve", lastMessage: "See you tomorrow!", lastSent: "5h", numUnread: "1", pfp: PFP },
        { name: "Frank", lastMessage: "Good morning!", lastSent: "8h", numUnread: "0", pfp: PFP },
        { name: "Grace", lastMessage: "Can we reschedule?", lastSent: "1d", numUnread: "4", pfp: PFP },
        { name: "Hank", lastMessage: "Happy Birthday!", lastSent: "2d", numUnread: "0", pfp: PFP },
        { name: "Ivy", lastMessage: "Let's meet at 5 PM.", lastSent: "3d", numUnread: "2", pfp: PFP },
        { name: "Jack", lastMessage: "I'll be there in 10 minutes.", lastSent: "4d", numUnread: "1", pfp: PFP },
        { name: "Karen", lastMessage: "Can you review this?", lastSent: "5d", numUnread: "0", pfp: PFP },
        { name: "Leo", lastMessage: "Thanks!", lastSent: "6d", numUnread: "0", pfp: PFP },
        { name: "Mia", lastMessage: "See you soon!", lastSent: "1w", numUnread: "3", pfp: PFP },
        { name: "Nina", lastMessage: "Good night!", lastSent: "2w", numUnread: "0", pfp: PFP },
    ];

    return(
        <>
            <div className="MessageDashboard">
                <div className="Contacts">
                    <div className="contact-header">
                        <a href="../../../index.html">
                            <img src={logo} id='contact-back-arrow' />
                        </a>
                        {/* <img src={logo} id='contact-logo' /> */}
                        <a href="../../../pages/userPage/userPage.html">
                            <img src={Profile} id='contact-profile-icon' />
                        </a>
                    </div>
                    <div className="contact-cards">
                        {messages.map((message, index) => (
                            <MessagePreview 
                                key={index}
                                name={message.name} 
                                lastMessage={message.lastMessage} 
                                lastSent={message.lastSent} 
                                numUnread={message.numUnread} 
                                pfp={message.pfp}
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