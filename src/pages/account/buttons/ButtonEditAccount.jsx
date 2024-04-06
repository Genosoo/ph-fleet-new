import { MdOutlineEdit  } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ButtonEditAccount() {
  return (
    <Link to="/fleet/account/update-account">
     <button className="btnEditAccount" > <MdOutlineEdit /> Edit Account Information</button>
    </Link>
  )
}
