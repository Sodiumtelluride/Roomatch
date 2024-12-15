import './navbar.css'
import {mesagesIcon} from '../assets/Messages.png'
import {profileIcon} from '../assets/Profile.png'
import {roomatchIcon} from '../assets/ROOMME.png'
function App() {
  return (
    <>
      <nav className='nav'>
        <button>
            <img src={profileIcon} alt="" />
        </button>
        <button>
            <img src={roomatchIcon} alt="" />
        </button>
        <button>
            <img src={mesagesIcon} alt="" />
        </button>
      </nav>
    </>
  )
}

export default App