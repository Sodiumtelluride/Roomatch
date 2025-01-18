import './userProfile.css'
import { useState, useEffect } from 'react'

export default function UserProfile(props) {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch('http://localhost:5174/getMe/me', {
            method: 'GET',
            credentials: 'include'
        })
          .then(response => response.json())
          .then(data => {
            console.log('Fetched data:', data);
            setData(data);
        })
          .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email" || name==="password") {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else if(name === "image") {
            setData(prevData => ({
                ...prevData,
                image: e.target.files[0]
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                user_info: {
                    ...prevData.user_info,
                    [name]: value // Update the specific field inside user_info
                }
            }));
    
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'user_info') {
                Object.keys(data.user_info).forEach(subKey => {
                    formData.append(subKey, data.user_info[subKey]);
                });
            } else {
                formData.append(key, data[key]);
            }
        });
        console.log('Form data:', formData.entries());
        
        fetch('http://localhost:5174/userGet/updateMe', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // },
            credentials: 'include',
            body: formData
        
        })
        .then(response => response.json())
        .then(result => {
            console.log('Profile updated successfully:', result);
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });
    };
    console.log(JSON.stringify(data));
    return (
        <form onSubmit={handleSubmit} className="user-profile">
            <div className="login-info">
                <div className="email field">
                    <h3 className="email heading">Email:</h3>
                    <textarea 
                        name="email"
                        value={data.email || ''} 
                        onChange={handleChange} 
                        className="email-text"
                    ></textarea>
                </div>
                <div className="password field">
                    <h3 className="password heading">Password:</h3>
                    <textarea 
                        name="password"
                        value={data.password || ''} 
                        onChange={handleChange} 
                        className="password-text"
                    ></textarea>
                </div>
            </div>

            <div className="profile-info">
                <div className="column-one">
                    <div className="display-name field">
                        <h3 className="display-name heading">Display Name:</h3>
                        <textarea 
                            name="display_name"
                            value={data.user_info && data.user_info.display_name ? data.user_info.display_name : data.first_name + " " + data.last_name} 
                            onChange={handleChange} 
                            className="display-name-text"
                        ></textarea>
                    </div>
                    <div className="pronouns field">
                        <h3 className="pronouns heading">Pronouns:</h3>
                        <textarea 
                            name="pronouns"
                            value={data.user_info && data.user_info.pronouns ? data.user_info.pronouns : ''} 
                            onChange={handleChange} 
                            className="pronouns-text"
                        ></textarea>
                    </div>
                    <div className="major field">
                        <h3 className="major heading">Major:</h3>
                        <textarea 
                            name="major"
                            value={data.user_info && data.user_info.major ? data.user_info.major : ''} 
                            onChange={handleChange} 
                            className="major-text"
                        ></textarea>
                    </div>
                    <div className="class field">
                        <h3 className="class heading">Class:</h3>
                        <textarea 
                            name="class"
                            value={data.user_info && data.user_info.class ? data.user_info.class : ''} 
                            onChange={handleChange} 
                            className="class-text"
                        ></textarea>
                    </div>
                    <div className="origin field">
                        <h3 className="origin heading">Origin:</h3>
                        <textarea 
                            name="origin"
                            value={data.user_info && data.user_info.origin ? data.user_info.origin : ''} 
                            onChange={handleChange} 
                            className="origin-text"
                        ></textarea>
                    </div>
                    <div className="description field">
                        <h3 className="description heading">Description:</h3>
                        <textarea 
                            name="description"
                            value={data.user_info && data.user_info.description ? data.user_info.description : ''} 
                            onChange={handleChange} 
                            className="description-text"
                        ></textarea>
                    </div>
                </div>
                <div className="column-two">
                    <div className="extraversion field">
                        <h3 className="extraversion heading">Extraversion:</h3>
                        <select  
                            name="extraversion"
                            value={data.user_info && data.user_info.extraversion ? data.user_info.extraversion : 'none'} 
                            onChange={handleChange}
                            id="extraversion" className="extraversion-dropdown" 
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
                            name="cleanliness"
                            value={data.user_info && data.user_info.cleanliness ? data.user_info.cleanliness : 'none'} 
                            onChange={handleChange}
                            id="cleanliness" className="cleanliness-dropdown" 
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
                            name="using_my_stuff"
                            value={data.user_info && data.user_info.using_my_stuff ? data.user_info.using_my_stuff : 'not-allowed'} 
                            onChange={handleChange}
                            id="using-my-stuff" className="using-my-stuff-dropdown" 
                        >
                            <option value="not-allowed">Not Allowed</option>
                            <option value="allowed-if-ask">Allowed If You Ask</option>
                            <option value="allowed">Always Allowed</option>
                        </select>
                    </div>
                    <div className="bedtime field"> 
                        <h3 className="bedtime heading">Bedtime:</h3>
                        <select 
                            name="start_time"
                            value={data.user_info && data.user_info.start_time ? data.user_info.start_time : 'twelve-AM'} 
                            onChange={handleChange}
                            id="start-time" className="start-time-dropdown" 
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
                            name="end_time"
                            value={data.user_info && data.user_info.end_time ? data.user_info.end_time : 'twelve-AM'} 
                            onChange={handleChange}
                            id="end-time" className="end-time-dropdown" 
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
                    <div className="picture-upload field">
                        <h3 className="picture-upload heading">Add Image:</h3>
                        <input type="file" name="image" accept="image/*" className="picture-upload-input" onChange={handleChange}/>
                    </div>
                    <button type='submit' className="update-button">Update</button>
                    <button className="delete-button">Delete Your Account</button>
                </div>
                <div className='area-3'>
                    <div className="images">
                        <h1 id='image-heading'>Images</h1>
                        <img src={data.imageUrls && data.imageUrls[0] ? data.imageUrls[0] : ''} alt="" />
                    </div>
                    <div className="images">
                        <h1 id='image-heading'>Images</h1>
                        <img src={data.imageUrls && data.imageUrls[1] ? data.imageUrls[1] : ''} alt="" />
                    </div>
                    <div className="images">
                        <h1 id='image-heading'>Images</h1>
                        <img src={data.imageUrls && data.imageUrls[2] ? data.imageUrls[2] : ''} alt="" />
                    </div>
                    <div className="images">
                        <h1 id='image-heading'>Images</h1>
                        <img src={data.imageUrls && data.imageUrls[3] ? data.imageUrls[3] : ''} alt="" />
                    </div>
                    <div className="images">
                        <h1 id='image-heading'>Images</h1>
                        <img src={data.imageUrls && data.imageUrls[4] ? data.imageUrls[4] : ''} alt="" />
                    </div>
                </div>
            </div>
        </form>
    );
}