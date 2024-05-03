import { FiPlus } from "react-icons/fi";
import { Button } from 'antd';
import { Link } from 'react-router-dom'

export default function ButtonAdd() {
  return (
    <Link to={'/fleet/aircrafts/add-aircraft'} >
    <Button icon={<FiPlus />}  className="buttonAddOffice">
      Add Aircraft
    </Button>
  </Link>
  )
}
