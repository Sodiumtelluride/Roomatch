import './messageType.css';
import Send from '../../assets/Send.png';
import Upload from '../../assets/Upload.png';

export default function MessageType() {
    return(
        <form action="" id="message-form">
            <button type="button" id="upload-button">
                <img src={Upload} id='upload-icon'/>
            </button>
            <input type="text" id="message-input" placeholder="Type a message..."/>
            <button type="submit" id="send-button">
                <img src={Send} id='send-icon'/>
            </button>
        </form>
    )
}