import './MessageDashboard.css';
import Navbar from '../navbar/navbar';
import Message from '../message/Message';
import PFP from '../../assets/UserPhoto.png';
import MessagePreview from '../messagePreview/MessagePreview';
export default function MessageDashboard() {
    return(
        <>
            <Navbar/>
            <div className="MessageDashboard">
                <Message user="Nate" message="Hi my name is nate i was wondering if you wanted to be my roomate? I promise im normal! i only eat birds sometimes" timeDelivered="2:34 AM" pfp={PFP}/>
                <MessagePreview name="Nate" lastMessage="Hi my name is nate..." lastSent="10m" numUnread="1" pfp={PFP}/>
            </div>
        </>
    )
}