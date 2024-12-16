import './CardExpanded.css'
import { useState } from 'react'

export default function CardExpanded(props) {
  const extraversionFillInt = parseInt(props.extraversionFill, 10);
  const extraversionFillPercentage = (extraversionFillInt / 4) * 100;
  const cleanlinessFillInt = parseInt(props.cleanlinessFill, 10);
  const cleanlinessFillPercentage = (cleanlinessFillInt / 4) * 100;

    // const [modal, setModal] = useState(false)
    // let modalContent;
    // const toggleModal = () => {
    //     setModal(!modal)
    // }
    // if (modal) {
    //     modalContent=(
            
    //     )
    // }
    return (
        <div className="background">
            <div className="card-expanded">
                <div className="card-banner-expanded">
                    <div className="img-container">
                        <img src={props.img} alt="" className="card-img-expanded" />
                </div>
                
                    <div className="button-container">
                        <button className="back-button">Back</button>
                        <button className="foward-button">Forward</button>
                    </div>
                </div>

                <div className="card-details-expanded">
                    <div className="user-title-expanded">
                        <div>
                            <h1 className="user-name-expanded">{props.name}</h1>
                            <h2 className="pronouns-expanded">{props.pronouns}</h2>
                        </div>
                        <div>
                            <h4 className="des-txt-expanded">{props.major}</h4>
                            <h4 className="des-txt-expanded">{props.class}</h4>
                        </div>
                    </div>

                    <div className="user-info-expanded">
                        <div className="user-description-expanded">
                            <h3 className="info-heading-expanded">Description</h3>
                            <p className="des-txt-expanded">{props.description}</p>
                        </div>

                        <div
                        className="extraversion-expanded"
                        style={{
                            '--extraversion-fill': `${extraversionFillPercentage}%`, // Pass CSS variable
                        }}
                        >
                            <h3 className="info-heading-expanded">Extraversion</h3>
                            <div className="fill-bar">
                                <div className="fill" id="extraversion-fill"></div>
                            </div>
                        </div>

                        <div
                        className="cleanliness-expanded"
                        style={{
                            '--cleanliness-fill': `${cleanlinessFillPercentage}%`, // Pass CSS variable
                        }}
                        >
                            <h3 className="info-heading-expanded">Cleanliness</h3>
                            <div className="fill-bar">
                                <div className="fill" id="cleanliness-fill"></div>
                            </div>
                        </div>

                        <div>
                            <h3 className="info-heading-expanded">Sleep Schedule</h3>
                            <p className="des-txt-expanded">{props.sleepSchedule}</p>
                        </div>

                        <div>
                            <h3 className="info-heading-expanded">Using My Stuff</h3>
                            <p className="des-txt-expanded">{props.usingMyStuff}</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
}