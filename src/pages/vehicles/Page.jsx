import "./Vehicles.css"
import ButtonAdd from "./button/ButtonAdd";
import VehiclesTable from "./table/VehiclesTable";


export default function Page() {
  return (
    <div className="vehiclesContainer">
      <div className="vehiclesHeader">
         <ButtonAdd />
      </div>
        <VehiclesTable />
    </div>
  )
}
