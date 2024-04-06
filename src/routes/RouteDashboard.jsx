import { Routes, Route } from 'react-router-dom';
import Map from '../pages/map/Map';
import Vessels from '../pages/vessels/Page';
import Aircrafts from '../pages/aircrafts/Page';
import Dashboard from '../pages/dashboard/Dashboard';
import Roles from '../pages/roles/Roles';
import Users from '../pages/users/Page';
import Personnel from '../pages/personnel/Page';

import VesselsCommercial from '../pages/commercial/vessels/VesselsCom';
import AircraftsCommercial from '../pages/commercial/aircrafts/AircraftsCom';

import Settings from '../pages/settings/Settings';
import Reports from '../pages/reports/Reports';
import Alerts from '../pages/alerts/Alerts';
import Account from '../pages/account/Account';
import AutoLogout from '../auth/autoLogout/AutoLogout';
import Offices from '../pages/offices/Offices';
import Vehicles from '../pages/vehicles/Vehicles';
import Incidents from '../pages/incidents/Incidents';

import MarineTrafficList from '../pages/dashboard/listPage/MarineTrafficList';
import TracksatList from '../pages/dashboard/listPage/TracksatList';
import SpiderTrakList from '../pages/dashboard/listPage/SpiderTrakList';
import CheckCookie from '../components/checkCookie/CheckCookie';

import UserProfile from '../pages/users/profile/Profile';
import PersonnelProfile from '../pages/personnel/profile/Profile';
import VesselsProfile from '../pages/vessels/profile/Profile'
import AircraftProfile from '../pages/aircrafts/profile/Profile'

import { DataContext } from '../context/DataProvider';
import { useContext } from "react";
import ChangePassword from '../pages/account/changepassword/ChangePassword';
import UpdateAccount from '../pages/account/update/UpdateAccount';

export default function RouteDashboard() {
  const {accountData } = useContext(DataContext)




  // Check if accountData.groups exists before accessing its properties
  const isAdministrator = accountData.roles && accountData.roles[0] === 'Administrator';
  
  return (
        <AutoLogout>
      <CheckCookie />
   <Routes>
        {isAdministrator ? (
          // Your existing routes for authorized users
          <>
            <Route index element={<Dashboard  />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='map' element={<Map  />} />

            <Route path='reports' element={<Reports />} />
            <Route path='alerts' element={<Alerts />} />
            <Route path='incidents' element={<Incidents />} />

            <Route path='roles' element={<Roles />} />
            <Route path='users' element={<Users />} />
            <Route path='/users/profile' element={<UserProfile />} />

            <Route path='personnel' element={<Personnel />} />
            <Route path='/personnel/profile' element={<PersonnelProfile />} />

            <Route path='vessels' element={<Vessels />} />
            <Route path='/vessels/profile' element={<VesselsProfile />} />
            
            
            <Route path='aircrafts' element={<Aircrafts />} />
            <Route path='/aircrafts/profile' element={<AircraftProfile/>} />

            <Route path='commercial-vessels' element={<VesselsCommercial />} />
            <Route path='commercial-aircrafts' element={<AircraftsCommercial />} />
            <Route path='settings' element={<Settings />} />
            <Route path='offices' element={<Offices />} />
            <Route path='vehicles' element={<Vehicles />} />

            <Route path='marinetraffic-list' element={<MarineTrafficList />} />
            <Route path='traksat-list' element={<TracksatList />} />
            <Route path='spidertrak-list' element={<SpiderTrakList />} />
          </>
        ) : (
          // Your existing routes for non-authorized users
          <>
            <Route index element={<Map />} />
            <Route path='map' element={<Map />} />
          </>
        )}

        <Route path='account' element={<Account />} />
        <Route path='/account/change-password' element={<ChangePassword />} />
        <Route path='/account/update-account' element={<UpdateAccount/>} />

      </Routes>
    </AutoLogout>

  );
}
