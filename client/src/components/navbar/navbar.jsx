import './navbar.css'
import Messages from '../../assets/Messages.png'
import Profile from '../../assets/Profile.png'
import ROOMME from '../../assets/ROOMME.png'
function Navbar() {
    return (
    <>
        <nav className='nav'>
        <a href=''>
            <img src={Profile} alt="" id='profile-icon' />
        </a>
        <a href='../../../index.html'>
            <img src={ROOMME} alt="" id='logo'/>
        </a>
        <a href='../../../pages/messages/messages.html'> 
            <img src={Messages} alt="" id='messages-icon'/>
        </a>
        </nav>
    </>
    )
}

export default Navbar