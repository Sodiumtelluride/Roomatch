import './ForgotPasswordForm.css';
import { useState } from 'react';

export default function ForgotPasswordForm() {
    const [errorMsg, setErrorMsg] = useState('');
    const [formData, setFormData] = useState({
        email: '',
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
            const response = await fetch('http://localhost:5174/login', {
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
        <form onSubmit={handleSubmit} className='login-form'>
            <h1>Forgot Password</h1>
            <h3>No worries. We'll send you a link to reset your password!</h3>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={handleChange} required />
            <button type="submit" id='submit'>Reset Password</button>
        </form>
    )
}