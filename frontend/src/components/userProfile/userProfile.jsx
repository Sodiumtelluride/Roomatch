import './userProfile.css'
import { useState } from 'react'

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
    return (
        <>
            <div className="login-info">
                <div className="email-field">
                    <h3 className="email-heading">Email:</h3>
                    <textarea 
                        value={selectedEmailValue} 
                        onChange={(e) => setEmailValue(e.target.value)} 
                        className="email-text"
                    ></textarea>
                </div>
                <div className="password-field">
                    <h3 className="password-heading">Password:</h3>
                    <textarea 
                        value={selectedPasswordValue} 
                        onChange={(e) => setPasswordValue(e.target.value)} 
                        className="password-text"
                    ></textarea>
                </div>
            </div>

            <div className="profile-info">
                <div className="column-one">
                    <div className="display-name-field">
                        <h3 className="display-name-heading">Display Name:</h3>
                        <textarea 
                            value={selectedDisplayNameValue} 
                            onChange={(e) => setDisplayNameValue(e.target.value)} 
                            className="display-name-text"
                        ></textarea>
                    </div>
                    <div className="pronouns-field">
                        <h3 className="pronouns-heading">Pronouns:</h3>
                        <textarea 
                            value={selectedPronounsValue} 
                            onChange={(e) => setPronounsValue(e.target.value)} 
                            className="pronouns-text"
                        ></textarea>
                    </div>
                    <div className="major-field">
                        <h3 className="major-heading">Major:</h3>
                        <textarea 
                            value={selectedMajorValue} 
                            onChange={(e) => setMajorValue(e.target.value)} 
                            className="major-text"
                        ></textarea>
                    </div>
                    <div className="class-field">
                        <h3 className="class-heading">Class:</h3>
                        <textarea 
                            value={selectedClassValue} 
                            onChange={(e) => setClassValue(e.target.value)} 
                            className="class-text"
                        ></textarea>
                    </div>
                    <div className="origin-field">
                        <h3 className="origin-heading">Origin:</h3>
                        <textarea 
                            value={selectedOriginValue} 
                            onChange={(e) => setOriginValue(e.target.value)} 
                            className="origin-text"
                        ></textarea>
                    </div>
                    <div className="description-field">
                        <h3 className="description-heading">Description:</h3>
                        <textarea 
                            value={selectedDescriptionValue} 
                            onChange={(e) => setDescriptionValue(e.target.value)} 
                            className="description-text"
                        ></textarea>
                    </div>
                </div>
                <div className="column-two">
                    <div className="extraversion-field">
                        <h3 className="extraversion-heading">Extraversion:</h3>
                        
                        <select  
                            value={selectedExtraversionValue} 
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
                    <div className="cleanliness-field">
                        <h3 className="cleanliness-heading">Cleanliness:</h3>
                        
                        <select 
                            value={selectedCleanlinessValue} 
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
                    <div className="using-my-stuff-field">
                        <h3 className="using-my-stuff-heading">Using My Stuff:</h3>
                        
                        <select 
                            value={selectedUsingMyStuffValue} 
                            onChange={(e) => setUsingMyStuffValue(e.target.value)}
                            id="using-my-stuff" className="using-my-stuff-dropdown" name="using-my-stuff"
                        >
                            <option value="not-allowed">Not Allowed</option>
                            <option value="allowed-if-ask">Allowed If You Ask</option>
                            <option value="allowed">Always Allowed</option>
                        </select>
                    </div>
                </div>
                
            </div>
        </>
    );
}