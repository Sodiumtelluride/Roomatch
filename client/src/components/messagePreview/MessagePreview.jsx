import './MessagePreview.css';

export default function MessagePreview(props) {
    return(
        <div className="message-preview-container">
            <img className='pfp-preview' src={props.pfp} />
            <h1 className='name-preview'>{props.name}</h1>
            {props.isTyping ? <p className='typing'>Typing...</p> : <p className='message-preview'>{props.lastMessage}</p>}
            <p className='lastSent'>{props.lastSent}</p>
            {props.numUnread>0 && <p className='unread'>{props.numUnread}</p>}
        </div>
    )
}