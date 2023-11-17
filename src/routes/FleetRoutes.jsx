import { Routes, Route } from 'react-router-dom'
import Map from '../pages/map/Map'
import Vessels from '../pages/vessels/Vessels'
import Aircrafts from '../pages/aircrafts/Aircrafts'
import Dashboard from '../pages/dashboard/Dashboard'
import Roles from '../pages/roles/Roles'
import Users from '../pages/users/Users'
import Personnel from '../pages/personnel/Personnel'
import VesselsCommercial from '../pages/commercial/vessels/VesselsCom'
import AircraftsCommercial from '../pages/commercial/aircrafts/AircraftsCom'
import Reports from '../pages/reports/Reports'
import Alerts from '../pages/alerts/Alerts'
import { useAuth } from '../auth/authContext/AuthContext'

export default function FleetRoutes() {
  const { authState } = useAuth();

  const isUserAuthorized = () => {
    const userRole = localStorage.getItem('user');

    // Check if the user is logged in and has the admin role
    return authState.token !== null && userRole === 'admin';
  };

  return (
    <Routes>
     {isUserAuthorized() ? (
        <>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='roles' element={<Roles />} />
          <Route path='users' element={<Users />} />
          <Route path='personnel' element={<Personnel />} />
          <Route path='reports' element={<Reports/>} />
          <Route path='alerts' element={<Alerts />} />
          <Route path='map' element={<Map />} />
          <Route path='vessels' element={<Vessels />} />
          <Route path='aircrafts' element={<Aircrafts />} />
          <Route path='commercial-vessels' element={<VesselsCommercial />} />
          <Route path='commercial-aircrafts' element={<AircraftsCommercial />} />
        </>
      ) : (
        <>
        <Route index element={<Map />} />
        <Route path='map' element={<Map />} />
        <Route path='vessels' element={<Vessels />} />
        <Route path='aircrafts' element={<Aircrafts />} />
        <Route path='commercial-vessels' element={<VesselsCommercial />} />
        <Route path='commercial-aircrafts' element={<AircraftsCommercial />} />
        <Route path='reports' element={<Reports/>} />
        <Route path='alerts' element={<Alerts />} />
        </>
      )}

<Route path='*' element={<h1>No Permission</h1>} />

     
    </Routes>
  )
}
