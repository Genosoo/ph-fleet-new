import Breadcrumbs from './breadcrumbs/BreadCrumbs'
import BtnMenu from './buttons/btnMenu'
import Avatar from '@mui/material/Avatar';
import userProfile from '../../assets/user.png'


export default function Navbar() {
  return (
    <div className="navbar_container">
        <Breadcrumbs />
        <div className='navbar_menu_wrapper'>
        <Avatar alt="Remy Sharp" src={userProfile} />
            <BtnMenu />
        </div>

    </div>
  )
}
