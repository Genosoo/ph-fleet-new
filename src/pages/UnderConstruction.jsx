import { Link } from 'react-router-dom';


export default function UnderConstruction() {
  return (
    <div className=" flex items-center justify-center h-[100vh]">
      <Link to='/fleet/dashboard'> 
        Home
       </Link>
       <div>
        <h1 className="text-[3rem] font-extrabold text-gray-800">Coming Soon!</h1>
          <p>Website is under construction. Please check back again soon.</p>
       </div>
     </div>
  )
}
