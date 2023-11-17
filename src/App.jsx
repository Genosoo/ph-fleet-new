import { Routes, Route } from 'react-router-dom'
import Login from './auth/Login'
import FleetRoutes from './routes/FleetRoutes'
import Layout from './layout/Layout'
import PrivateRoute from './auth/privateRoute/PrivateRoute'


export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='' element={<Login />} />

      <Route element={<Layout />} >
         <Route path='/fleet/*' element={
          <PrivateRoute>
              <FleetRoutes/>
          </PrivateRoute>
         } />
      </Route>
    </Routes>
  )
}
