import { useState } from 'react';
import './CreateUserForm.css';


function CreateUserForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            id: crypto.randomUUID(),
            ...formData
        }
        try{
            const response = await fetch('http://localhost:5174/CREATEUSER', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });
            if(response.ok){
                console.log('User created successfully');
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <form id='create-user-form' action="POST" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="name">
                <div className="first-name">
                    <label htmlFor="first-name" className="form-lable">First Name</label>
                    <input type="text" id="first-name" name="first-name" required value={formData.first_name} onChange={handleChange}/>
                </div>
                <div className="last-name">
                    <label htmlFor="last-name" className="form-lable">Last Name</label>
                    <input type="text" id="last-name" name="last-name" required value={formData.last_name} onChange={handleChange}/>
                </div>
            </div>
            <label className="form-lable" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}/>
            <label className="form-lable" htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange}/>
            <button id='submit-button' type='submit'>Create Account</button>
        </form>
    )
}

export default CreateUserForm;