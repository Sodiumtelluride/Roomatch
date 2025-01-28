import './Navbar.css'
import Messages from '../../assets/Messages.png'
import Profile from '../../assets/Profile.png'
import ROOMME from '../../assets/ROOMME.png'
import logo from '../../assets/logo.svg'
function Navbar(props) {
    if(props.inChat){
        return (
            <nav className='nav nav-in-chat'>
                <a href='../../../pages/userPage/userPage.html'>
                    <img src={Profile} alt="" id='profile-icon' />
                </a>
                <a href='../../../index.html'>
                    <img src={logo} alt="logo" className="logo" />
                </a>
                <a href='../../../pages/messages/messages.html'> 
                    <img src={Messages} alt="" id='messages-icon'/>
                </a>
            </nav>
        )
    }
    return (
    <>
        <nav className='nav'>
        <a href='../../../pages/userPage/userPage.html'>
            <img src={Profile} alt="" id='profile-icon' />
        </a>
        <a href='../../../index.html'>
            <img src={logo} alt="logo" className="logo" />
        </a>
        <a href='../../../pages/messages/messages.html'> 
            <img src={Messages} alt="" id='messages-icon'/>
        </a>
        </nav>
    </>
    )
}

export default Navbar