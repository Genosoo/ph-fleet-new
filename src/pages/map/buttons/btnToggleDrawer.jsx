import { FaFilter } from "react-icons/fa6";

export default function buttonToggleDrawer({toggleDrawer}) {
  return (
  <button className='button_toggle_drawer'
   onClick={toggleDrawer}>
     <FaFilter />
   </button>
  )
}
