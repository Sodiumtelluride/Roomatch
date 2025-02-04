import './LoginForm.css';
import { useState } from 'react';

export default function ResetPasswordForm() {
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({
        newPassword1: '',
        newPassword2: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await fetch('http://localhost:5174/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const result= await response.json();
            if(response.ok) {
                window.location.href = result.redirectUrl;
            } else {
                setErrorMsg(result.error);
                console.log(errorMsg);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit} className='reset-password-form'>
            <h1>Reset Password</h1>
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" name="new-password" onChange={handleChange} required />
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" onChange={handleChange} required />
            <button type="submit" id='submit'>Login</button>
        </form>
    )
}