import './MessagePreview.css';

export default function MessagePreview(props) {
    // const handleClick = () => {
    //     props.onClick();
    //     const parentDiv = document.querySelector('.message-preview-container');
    //     parentDiv.classList.add('selected');
    // };
    const parentDiv = document.querySelector('.message-preview-container');
    if (parentDiv) {
        if (props.isActive) {
            parentDiv.classList.add('selected');
        } else {
            parentDiv.classList.remove('selected');
        }
    }

    return(
        <div className="message-preview-container" onClick={props.onClick}>
            <img className='pfp-preview' src={props.pfp} />
            <h1 className='name-preview'>{props.name}</h1>
            {props.isTyping ? <p className='typing'>Typing...</p> : <p className='message-preview'>{props.lastMessage}</p>}
            <p className='lastSent'>{props.lastSent}</p>
            {props.numUnread>0 && <p className='unread'>{props.numUnread}</p>}
        </div>
    )
}