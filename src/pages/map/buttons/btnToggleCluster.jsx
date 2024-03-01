import { BsStopCircleFill, BsStopCircle } from "react-icons/bs";


export default function btnToggleCluster({handleToggleCluster, withCluster }) {
  return (
    <button onClick={handleToggleCluster} className=" bg-gray-200 text-[25px] py-2 flex items-center justify-center rounded-[5px]" >
     { withCluster ? <BsStopCircle />  : <BsStopCircleFill /> }
    </button>
  )
}
