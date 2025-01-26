import './NavbarLandingPage.css'
import Messages from '../../assets/Messages.png'
import Profile from '../../assets/Profile.png'
import ROOMME from '../../assets/ROOMME.png'
import logo from '../../assets/logo.svg'
function NavbarLandingPage() {
    return (
        <div className="navbar-landing-page">
            <img src={logo} className="logo" alt="Logo" />
            <div>
                <a href='../../../pages/login/login.html'>
                    <button className="login-button">Log In</button>
                </a>
                <a href='../../../pages/createUserPage/createUserPage.html'> 
                    <button className="signup-button">Sign Up</button>
                </a>
            </div>
        </div>
    );
}
export default NavbarLandingPage;