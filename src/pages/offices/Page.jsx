import OfficesTable from './table/OfficesTable';
import './Offices.css'
import ButtonAdd from './button/ButtonAdd';


export default function Page() {
  return (
    <div className='officesContainer'>
       <div className="officesHeader">
          <ButtonAdd />
       </div>
        <OfficesTable />
    </div>
  )
}
