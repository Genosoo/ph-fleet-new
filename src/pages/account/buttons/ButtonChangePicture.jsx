/* eslint-disable react/prop-types */
import { RiImageEditFill } from "react-icons/ri";

export default function ButtonChangePicture({ setIsImageDialogOpen }) {
  return (
     <button className="btnChangePicture"  onClick={() => setIsImageDialogOpen(true)}> 
     <RiImageEditFill /> Change Profile Picture
     </button>
  )  
}
