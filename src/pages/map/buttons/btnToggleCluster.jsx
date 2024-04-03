import { BsStopCircleFill, BsStopCircle } from "react-icons/bs";


export default function btnToggleCluster({handleToggleCluster, withCluster }) {
  return (
    <button onClick={handleToggleCluster} className="btnCluster" >
     { withCluster ? <BsStopCircle />  : <BsStopCircleFill /> }
    </button>
  )
}
