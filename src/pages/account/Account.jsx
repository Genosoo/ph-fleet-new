import { useContext } from "react"
import { DataContext } from "../../context/DataProvider";
import './Styles.css'
import { MdOutlineEdit } from "react-icons/md";
export default function Account() {
  const {accountData} = useContext(DataContext)


  return (
    <div className="accountContainer">
       <div className="accountTopFlex">
        <h1>Account</h1>
        <button> <MdOutlineEdit /> Edit Account</button>
       </div>
      <div className="accountWrapper">

        <div className="accountBox">
          <div className="accountInputBox">
            <span>Username</span>
            <input type="text" value={accountData?.username || "N/A"} />
          </div>
          <div className="accountInputBox">
            <span>Email</span>
            <input type="text" value={accountData?.email || "N/A"} />
          </div>
          <div className="accountInputBox">
            <span>First Name</span>
            <input type="text" value={accountData?.first_name || "N/A"} />
          </div>
          <div className="accountInputBox">
            <span>Last Name</span>
            <input type="text" value={accountData?.last_name || "N/A"} />
          </div>
          <div className="accountInputBox">
            <span>Role</span>
            <input type="text" value={accountData?.groups?.[0]?.name || "N/A"} />
          </div>
        </div>
      </div>
    </div>
  );
}