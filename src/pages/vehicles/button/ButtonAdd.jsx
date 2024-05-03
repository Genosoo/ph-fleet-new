import { FiPlus } from "react-icons/fi";
import { Button } from 'antd';
import { Link } from 'react-router-dom'

export default function ButtonAdd() {
  return (
    <Link to={'/fleet/vehicles/add-vehicle'} >
      <Button icon={<FiPlus />}  className="buttonAddVehicle">
        Add Vehicle
      </Button>
    </Link>
  )
}
