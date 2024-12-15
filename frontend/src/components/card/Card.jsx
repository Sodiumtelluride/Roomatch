import './Card.css'

export default function Card(props){
    return(
        <div className="card">
            <div className="card-banner">
                <img src={props.img} alt="" className="card-img"/>
            </div>
            <div className="card-details">
                <div className="user-title">
                    <h1 className="user-name">{props.name}</h1> 
                    <h2 className="pronouns">{props.pronouns}</h2>
                </div>
                <div className="user-info">
                    <h3 className="info-heading">Description</h3>
                    <p className="des-txt">
                        {props.description}
                    </p>
                    <h3 className="info-heading">Major</h3>
                    <p className="des-txt">
                        {props.major}
                    </p>
                    <h3 className="info-heading">Class</h3>
                    <p className="des-txt">
                        {props.class}
                    </p>
                </div>
            </div>
        </div>
    )
}