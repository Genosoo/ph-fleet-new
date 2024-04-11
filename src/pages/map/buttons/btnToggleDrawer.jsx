/* eslint-disable react-hooks/rules-of-hooks */
import { RiFilterFill,RiFilterLine } from "react-icons/ri";
export default function buttonToggleDrawer({ toggleDrawer, handleToggleDrawer }) {

  return (
   <button className='btnToggleDrawer'
       onClick={handleToggleDrawer}>
      {  toggleDrawer ? <RiFilterFill /> : <RiFilterLine/> }
     
   </button>
  )
}
