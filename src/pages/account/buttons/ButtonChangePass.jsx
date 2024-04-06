import { IoKeyOutline } from "react-icons/io5";
import {  Link } from 'react-router-dom'

export default function ButtonChangePass() {
  return (
    <Link to="/fleet/account/change-password">
       <button  className="btnChangePassword">
       <IoKeyOutline />
       Change Password
    </button>
    </Link>
  )
}
