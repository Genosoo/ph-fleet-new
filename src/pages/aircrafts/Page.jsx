import './Aircraft.css'
import ButtonAdd from './button/ButtonAdd';
import AircraftTable from './table/AircraftTable';


export default function Page() {
  return (
    <div className='officesContainer'>
       <div className="officesHeader">
          <ButtonAdd />
       </div>
        <AircraftTable />
    </div>
  )
}
