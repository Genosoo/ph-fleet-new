/* eslint-disable react-hooks/rules-of-hooks */
import { FaFilter } from "react-icons/fa6";

export default function buttonToggleDrawer({ toggleDrawer}) {

  return (
   <button className='btnToggleDrawer'
       onClick={toggleDrawer}>
     <FaFilter />
   </button>
  )
}
