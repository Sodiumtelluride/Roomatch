import './MessageDashboard.css';
import Navbar from '../navbar/navbar.jsx';
import Message from '../message/Message.jsx';
import MessagePreview from '../messagePreview/MessagePreview.jsx';
import PFP from '../../assets/UserPhoto.png';
import BackArrow from '../../assets/BackArrow.png'
import logo from '../../assets/ROOMME.png'
import Profile from '../../assets/Profile.png'
export default function MessageDashboard() {
    return(
        <>
            {/* <Navbar/> */}
            <div className="MessageDashboard">
                <div className="Contacts">
                    <div className="contact-header">
                        <a href="../../../index.html">
                            <img src={BackArrow} id='contact-back-arrow' />
                        </a>
                        <img src={logo} id='contact-logo' />
                        <a href="">
                            <img src={Profile} id='contact-profile-icon' />
                        </a>
                    </div>
                    <div className="contact-cards">
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                        <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
                    </div>
                </div>
                {/* <Message user="Nate" message="Hi my name is nate i was wondering if you wanted to be my roomate? I promise im normal! i only eat birds sometimes" timeDelivered="2:34 AM" pfp={PFP}/> */}
            </div>
        </>
    )
}