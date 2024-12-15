import './navbar.css'
import Messages from '../../assets/Messages.png'
import Profile from '../../assets/Profile.png'
import ROOMME from '../../assets/ROOMME.png'
function Navbar() {
    return (
    <>
        <nav className='nav'>
        <button>
            <img src={Profile} alt="" />
        </button>
        <button>
            <img src={ROOMME} alt="" />
        </button>
        <button>
            <img src={Messages} alt="" />
        </button>
        </nav>
    </>
    )
}

export default Navbar