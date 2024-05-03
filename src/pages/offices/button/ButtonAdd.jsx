import { FiPlus } from "react-icons/fi";
import { Button } from 'antd';
import { Link } from 'react-router-dom'

export default function ButtonAdd() {
  return (
    <Link to={'/fleet/offices/add-office'} >
    <Button icon={<FiPlus />}  className="buttonAddOffice">
      Add Office
    </Button>
  </Link>
  )
}
