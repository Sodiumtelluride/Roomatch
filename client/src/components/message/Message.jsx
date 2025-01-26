import './Message.css';

export default function Message(props) {
    if (props.isRequest === true) {
        return(
            <div className={props.sentByUser ? "message-container sent-by-user" : "message-container not-sent-by-user"}>
                <div className={props.sentByUser ? "message-content-SBU": "message-content-NSBU"}>
                    <h1>{props.user}</h1>
                    <p>Let's become roomates!</p>
                    {!props.sentByUser && <button className="accept-btn">Accept</button>}
                </div>
                {/* <div className="message-info"> */}
                    <div className={props.sentByUser ? "time-SBU" : "time-NSBU"}>{props.timeDelivered}</div>
                    <img className={props.sentByUser ? "pfp-SBU" : "pfp-NSBU"} src={props.pfp}></img>
                {/* </div> */}
            </div>
        )
    }
    return(
        <div className={props.sentByUser ? "message-container sent-by-user" : "message-container not-sent-by-user"}>
            <div className={props.sentByUser ? "message-content-SBU": "message-content-NSBU"}>
                <h1>{props.user}</h1>
                <p>{props.message}</p>
            </div>
            {/* <div className="message-info"> */}
                <div className={props.sentByUser ? "time-SBU" : "time-NSBU"}>{props.timeDelivered}</div>
                <img className={props.sentByUser ? "pfp-SBU" : "pfp-NSBU"} src={props.pfp}></img>
            {/* </div> */}
        </div>
    )
}