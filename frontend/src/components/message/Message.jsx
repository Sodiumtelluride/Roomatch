import './Message.css';

export default function Message(props) {
    return(
        <div className="Message">
            <div className="message-content">
                <h1>{props.user}</h1>
                <p>{props.message}</p>
            </div>
            
        </div>
    )
}