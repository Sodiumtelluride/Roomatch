import './LoginForm.css';

export default function LoginForm() {
    return (
        <form action="" className='login-form'>
            <h1>Login</h1>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            <button type="submit" id='submit'>Login</button>
        </form>
    )
}