import './MessageDashboard.css';
import Navbar from '../navbar/navbar';
import Message from '../message/Message';
export default function MessageDashboard() {
    return(
        <div className="MessageDashboard">
            <Navbar/>
            <Message user="Alice" message="Hello Bob!"/>
        </div>
    )
}