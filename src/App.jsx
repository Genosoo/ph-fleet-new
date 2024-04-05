import { Routes, Route } from 'react-router-dom'
import Login from './auth/Login'
import RouteDashboard from './routes/RouteDashboard';
import Layout from './layout/Layout'
import PrivateRoute from './auth/privateRoute/PrivateRoute'
import UnderConstruction from './pages/UnderConstruction'
import MarineTrafficList from './pages/dashboard/listPage/MarineTrafficList';

export default function App() {

  return (
   <>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='' element={<Login />} />
      <Route element={<Layout />} >
         <Route path='/fleet/*' element={
          <PrivateRoute>
                  <RouteDashboard/>
          </PrivateRoute>
         } />
      </Route>


      <Route path='/other-personnel' element={<UnderConstruction />} />
      <Route path='/other-offices' element={<UnderConstruction />} />
      <Route path='/other-vessels' element={<div className='p-20'>
       < MarineTrafficList />
      </div>} />
      <Route path='/other-aircrafts' element={<UnderConstruction />} />
      <Route path='/other-vehicles' element={<UnderConstruction />} />
    </Routes>
      

   </>
  )
}
