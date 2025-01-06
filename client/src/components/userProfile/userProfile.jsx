import './userProfile.css'
import { useState, useEffect } from 'react'

export default function UserProfile(props) {
    const [selectedEmailValue, setEmailValue] = useState(props.email);
    const [selectedPasswordValue, setPasswordValue] = useState(props.password);
    const [selectedDisplayNameValue, setDisplayNameValue] = useState(props.displayName);
    const [selectedPronounsValue, setPronounsValue] = useState(props.pronouns);
    const [selectedMajorValue, setMajorValue] = useState(props.major);
    const [selectedClassValue, setClassValue] = useState(props.class);
    const [selectedOriginValue, setOriginValue] = useState(props.origin);
    const [selectedDescriptionValue, setDescriptionValue] = useState(props.description);
    const [selectedExtraversionValue, setExtraversionValue] = useState(props.extraversionValue);
    const [selectedCleanlinessValue, setCleanlinessValue] = useState(props.cleanlinessValue);
    const [selectedUsingMyStuffValue, setUsingMyStuffValue] = useState(props.usingMyStuffValue);
    const [selectedStartTimeValue, setStartTimeValue] = useState(props.startTimeValue);
    const [selectedEndTimeValue, setEndTimeValue] = useState(props.endTimeValue);
    const [data, setData] = useState([]);


    useEffect(() =>{
        fetch('http://localhost:5174/getMe/me', {
            method: 'GET',
            credentials: 'include'
        })
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log("data: " + JSON.stringify(data));
    return (
        <>
            <div className="login-info">
                <div className="email field">
                    <h3 className="email heading">Email:</h3>
                    <textarea 
                        value={data.email} 
                        onChange={(e) => setEmailValue(e.target.value)} 
                        className="email-text"
                    ></textarea>
                </div>
                <div className="password field">
                    <h3 className="password heading">Password:</h3>
                    <textarea 
                        value={selectedPasswordValue} 
                        onChange={(e) => setPasswordValue(e.target.value)} 
                        className="password-text"
                    ></textarea>
                </div>
                
            </div>

            <div className="profile-info">
                <div className="column-one">
                    <div className="display-name field">
                        <h3 className="display-name heading">Display Name:</h3>
                        <textarea 
                            value={data.display_name ? data.display_name : data.first_name + " " + data.last_name} 
                            onChange={(e) => setDisplayNameValue(e.target.value)} 
                            className="display-name-text"
                        ></textarea>
                    </div>
                    <div className="pronouns field">
                        <h3 className="pronouns heading">Pronouns:</h3>
                        <textarea 
                            value={data.pronouns} 
                            onChange={(e) => setPronounsValue(e.target.value)} 
                            className="pronouns-text"
                        ></textarea>
                    </div>
                    <div className="major field">
                        <h3 className="major heading">Major:</h3>
                        <textarea 
                            value={data.major} 
                            onChange={(e) => setMajorValue(e.target.value)} 
                            className="major-text"
                        ></textarea>
                    </div>
                    <div className="class field">
                        <h3 className="class heading">Class:</h3>
                        <textarea 
                            value={data.class} 
                            onChange={(e) => setClassValue(e.target.value)} 
                            className="class-text"
                        ></textarea>
                    </div>
                    <div className="origin field">
                        <h3 className="origin heading">Origin:</h3>
                        <textarea 
                            value={data.origin} 
                            onChange={(e) => setOriginValue(e.target.value)} 
                            className="origin-text"
                        ></textarea>
                    </div>
                    <div className="description field">
                        <h3 className="description heading">Description:</h3>
                        <textarea 
                            value={data.description} 
                            onChange={(e) => setDescriptionValue(e.target.value)} 
                            className="description-text"
                        ></textarea>
                    </div>
                </div>
                <div className="column-two">
                    <div className="extraversion field">
                        <h3 className="extraversion heading">Extraversion:</h3>
                        
                        <select  
                            value={data.extraversion} 
                            onChange={(e) => setExtraversionValue(e.target.value)}
                            id="extraversion" className="extraversion-dropdown" name="extraversion"
                        >
                            <option value="none">None</option>
                            <option value="low">Low</option>
                            <option value="average">Average</option>
                            <option value="above-average">Above Average</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="cleanliness field">
                        <h3 className="cleanliness heading">Cleanliness:</h3>
                        
                        <select 
                            value={data.cleanliness} 
                            onChange={(e) => setCleanlinessValue(e.target.value)}
                            id="cleanliness" className="cleanliness-dropdown" name="cleanliness"
                        >
                            <option value="none">None</option>
                            <option value="low">Low</option>
                            <option value="average">Average</option>
                            <option value="above-average">Above Average</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="using-my-stuff field">
                        <h3 className="using-my-stuff heading">Using My Stuff:</h3>
                        
                        <select 
                            value={data.using_my_stuff} 
                            onChange={(e) => setUsingMyStuffValue(e.target.value)}
                            id="using-my-stuff" className="using-my-stuff-dropdown" name="using-my-stuff"
                        >
                            <option value="not-allowed">Not Allowed</option>
                            <option value="allowed-if-ask">Allowed If You Ask</option>
                            <option value="allowed">Always Allowed</option>
                        </select>
                        
                    </div>
                    <div className="bedtime field"> 
                        <h3 className="bedtime heading">Bedtime:</h3>
                        <select 
                            value={data.start_time} 
                            onChange={(e) => setStartTimeValue(e.target.value)}
                            id="start-time" className="start-time-dropdown" name="start-time"
                        >
                            <option value="twelve-AM">12:00 AM</option>
                            <option value="one-AM">1:00 AM</option>
                            <option value="two-AM">2:00 AM</option>
                            <option value="three-AM">3:00 AM</option>
                            <option value="four-AM">4:00 AM</option>
                            <option value="five-AM">5:00 AM</option>
                            <option value="six-AM">6:00 AM</option>
                            <option value="seven-AM">7:00 AM</option>
                            <option value="eight-AM">8:00 AM</option>
                            <option value="nine-AM">9:00 AM</option>
                            <option value="ten-AM">10:00 AM</option>
                            <option value="eleven-AM">11:00 AM</option>
                            <option value="twelve-PM">12:00 PM</option>
                            <option value="one-PM">1:00 PM</option>
                            <option value="two-PM">2:00 PM</option>
                            <option value="three-PM">3:00 PM</option>
                            <option value="four-PM">4:00 PM</option>
                            <option value="five-PM">5:00 PM</option>
                            <option value="six-PM">6:00 PM</option>
                            <option value="seven-PM">7:00 PM</option>
                            <option value="eight-PM">8:00 PM</option>
                            <option value="nine-PM">9:00 PM</option>
                            <option value="ten-PM">10:00 PM</option>
                            <option value="eleven-PM">11:00 PM</option>
                            
                        </select>
                        <h4>-</h4>
                        <select 
                            value={data.end_time} 
                            onChange={(e) => setEndTimeValue(e.target.value)}
                            id="start-time" className="start-time-dropdown" name="start-time"
                        >
                            <option value="twelve-AM">12:00 AM</option>
                            <option value="one-AM">1:00 AM</option>
                            <option value="two-AM">2:00 AM</option>
                            <option value="three-AM">3:00 AM</option>
                            <option value="four-AM">4:00 AM</option>
                            <option value="five-AM">5:00 AM</option>
                            <option value="six-AM">6:00 AM</option>
                            <option value="seven-AM">7:00 AM</option>
                            <option value="eight-AM">8:00 AM</option>
                            <option value="nine-AM">9:00 AM</option>
                            <option value="ten-AM">10:00 AM</option>
                            <option value="eleven-AM">11:00 AM</option>
                            <option value="twelve-PM">12:00 PM</option>
                            <option value="one-PM">1:00 PM</option>
                            <option value="two-PM">2:00 PM</option>
                            <option value="three-PM">3:00 PM</option>
                            <option value="four-PM">4:00 PM</option>
                            <option value="five-PM">5:00 PM</option>
                            <option value="six-PM">6:00 PM</option>
                            <option value="seven-PM">7:00 PM</option>
                            <option value="eight-PM">8:00 PM</option>
                            <option value="nine-PM">9:00 PM</option>
                            <option value="ten-PM">10:00 PM</option>
                            <option value="eleven-PM">11:00 PM</option>
                            
                        </select>
                    </div>
                    <button className="upload-button">Upload</button>
                    <button className="delete-button">Delete Your Account</button>
                </div>
                
            </div>
            
        </>
    );
}