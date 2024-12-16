import './MessageDashboard.css';
import Navbar from '../navbar/navbar';
import Message from '../message/Message';
import PFP from '../../assets/UserPhoto.png';
export default function MessageDashboard() {
    return(
        <div className="MessageDashboard">
            <Navbar/>
            <Message user="Alice" message="Hi my name is nate i was wondering if you wanted to be my roomate? I promise im normal! i only eat birds sometimes" timeDelivered="2:34 AM" pfp={PFP}/>
        </div>
    )
}