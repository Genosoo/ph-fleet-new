import { useEffect, useState } from "react"
import axios from "axios";

const baseUrl = import.meta.env.VITE_URL;
const getAccount = `${baseUrl}/api/myaccount/`;

export default function Account() {
  const [accountData, setAccountData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountResponse = await axios.get(getAccount);
        const responseData = accountResponse.data.success
        console.log(responseData);
        setAccountData(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="account_container">
      <h1>My Account</h1>
      <div className="account_wrapper">
        <div className="account_box">
          <div className="account_input_box">
            <span>Username</span>
            <input type="text" value={accountData.username || ""} />
          </div>
          <div className="account_input_box">
            <span>Email</span>
            <input type="text" value={accountData.email || ""} />
          </div>
          <div className="account_input_box">
            <span>First Name</span>
            <input type="text" value={accountData.first_name || ""} />
          </div>
          <div className="account_input_box">
            <span>Last Name</span>
            <input type="text" value={accountData.last_name || ""} />
          </div>
          <div className="account_input_box">
            <span>Role</span>
            <input type="text" value={accountData.groups?.[0]?.name || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}