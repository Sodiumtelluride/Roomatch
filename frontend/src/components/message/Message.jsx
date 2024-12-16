import './Message.css';

export default function Message(props) {
    return(
        <div className="message-container">
            <div className="message-content">
                <h1>{props.user}</h1>
                <p>{props.message}</p>
            </div>
            {/* <div className="message-info"> */}
                <div className="time">{props.timeDelivered}</div>
                <img className="pfp" src={props.pfp}></img>
            {/* </div> */}
        </div>
    )
}