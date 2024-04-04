import { Routes, Route } from 'react-router-dom';
import Map from '../pages/map/Map';
import Vessels from '../pages/vessels/Vessels';
import Aircrafts from '../pages/aircrafts/Aircrafts';
import Dashboard from '../pages/dashboard/Dashboard';
import Roles from '../pages/roles/Roles';
import Users from '../pages/users/Page';
import Personnel from '../pages/personnel/Personnel';
import VesselsCommercial from '../pages/commercial/vessels/VesselsCom';
import AircraftsCommercial from '../pages/commercial/aircrafts/AircraftsCom';
import Settings from '../pages/settings/Settings';
import Reports from '../pages/reports/Reports';
import Alerts from '../pages/alerts/Alerts';
import Account from '../pages/account/Account';
import AutoLogout from '../auth/autoLogout/AutoLogout';
import Offices from '../pages/offices/Offices';
import Vehicles from '../pages/vehicles/Vehicles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Incidents from '../pages/incidents/Incidents';
import { apiAccount } from '../api/api_urls';

import MarineTrafficList from '../pages/dashboard/listPage/MarineTrafficList';
import TracksatList from '../pages/dashboard/listPage/TracksatList';
import SpiderTrakList from '../pages/dashboard/listPage/SpiderTrakList';
import CheckCookie from '../components/checkCookie/CheckCookie';
import Profile from '../pages/vessels/profile/Profile';
import UserProfile from '../pages/users/profile/Profile';

export default function Routes_dashboard() {
  const [accountData, setAccountData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountResponse = await axios.get(apiAccount);
        const responseData = accountResponse.data.success;
        console.log(responseData);
        setAccountData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Check if accountData.groups exists before accessing its properties
  const isAdministrator = accountData.roles && accountData.roles[0] === 'Administrator';
  
  return (
      <AutoLogout>
      <CheckCookie />
      <Routes>
        {isAdministrator ? (
          // Your existing routes for authorized users
          <>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='map' element={<Map />} />

            <Route path='reports' element={<Reports />} />
            <Route path='alerts' element={<Alerts />} />
            <Route path='incidents' element={<Incidents />} />

            <Route path='roles' element={<Roles />} />
            <Route path='users' element={<Users />} />
            <Route path='/users/profile' element={<UserProfile />} />

            <Route path='personnel' element={<Personnel />} />
            <Route path='vessels' element={<Vessels />} />
            <Route path='/vessels/vessels-profile' element={<Profile />} />
            <Route path='aircrafts' element={<Aircrafts />} />
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
            <Route path='map' element={<Map />} />
          </>
        )}

        <Route path='account' element={<Account />} />

      </Routes>
    </AutoLogout>
  );
}
