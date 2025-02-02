import './PFPUpdater.css';
import '../userProfile/userProfile.css'
import React, { useState, useEffect, useContext } from 'react'
import Card from '../card/Card.jsx'
import Profile from '../../assets/Profile.png'
function PFPUpdater(props) {
    const [ PFPUrl, setPFPUrl ] = useState('');
    const handleChange = (e) => {
        const formData = new FormData();
        formData.append('profile_picture', e.target.files[0]);

        fetch('http://localhost:5174/userGetPFP/updatePFP', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('PFP updated successfully:', result);
        })
        .catch(error => {
            console.error('Error updating PFP:', error);
        });

        
    }
    useEffect (() => {
        fetch('http://localhost:5174/getMe/me', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setPFPUrl(data.PFPurl || Profile);
        })
        .catch(error => console.error('Error fetching PFP:', error));
    }, []);
    if (props.isUserProfile) {
        return (
            <>
                <div className="PFP-upload field">
                    <h3 className="PFP-upload heading">Profile Picture:</h3>
                    <input type="file" name="profile_picture" accept="image/*" className="PFP-upload-input" onChange={handleChange}/>
                    <img src={PFPUrl} alt="profile" id='profile-icon-large' />
                </div>
            </>
        )
    }
}
export default PFPUpdater;