import './Navbar.css'
import Messages from '../../assets/Messages.png'
import Profile from '../../assets/Profile.png'
import ROOMME from '../../assets/ROOMME.png'
import logo from '../../assets/logo.svg'
function Navbar() {
    return (
    <>
        <nav className='nav'>
                <a href='../../../index.html'>
                    <img src={logo} alt="logo" className="logo" />
                </a>
            <div className='nav-right'>
                <a href='../../../pages/messages/messages.html'> 
                    <img src={Messages} alt="" id='messages-icon'/>
                </a>
                <a href='../../../pages/userPage/userPage.html'>
                    <img src={Profile} alt="" id='profile-icon' />
                </a>
            </div>
        </nav>
    </>
    )
}

export default Navbar