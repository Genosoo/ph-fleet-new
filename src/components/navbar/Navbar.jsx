import Breadcrumbs from './breadcrumbs/BreadCrumbs'
import BtnMenu from './buttons/btnMenu'
import Avatar from '@mui/material/Avatar';




export default function Navbar() {
  return (
    <div className="navbar_container">
        <Breadcrumbs />
        <div className='navbar_menu_wrapper'>
        <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <BtnMenu />
        </div>
    </div>
  )
}
