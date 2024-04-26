import { Routes, Route } from 'react-router-dom';
import Map from '../pages/map/Map';
import Vessels from '../pages/vessels/Page';
import Aircrafts from '../pages/aircrafts/Page';
import Dashboard from '../pages/dashboard/Dashboard';
import DashboardOP from '../pages/dashboard-op/Dashboard';
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
import Offices from '../pages/offices/Page';
import OfficeProfile from '../pages/offices/profile/Profile';
import Vehicles from '../pages/vehicles/Page';
import VehicleProfile from '../pages/vehicles/profile/Profile'
import Incidents from '../pages/incidents/Page';
// import AddIncidentReport from '../pages/incidents/addreport/AddReport';
import AddIncident from '../pages/incidents/addIncident/AddIncident';

import MarineTrafficList from '../pages/dashboard/listPage/MarineTrafficList';
import TracksatList from '../pages/dashboard/listPage/TracksatList';
import SpiderTrakList from '../pages/dashboard/listPage/SpiderTrakList';
import CheckCookie from '../components/checkCookie/CheckCookie';

import UserProfile from '../pages/users/profile/Profile';
import PersonnelProfile from '../pages/personnel/profile/Profile';
import VesselsProfile from '../pages/vessels/profile/Profile'
import AircraftProfile from '../pages/aircrafts/profile/Profile'

import ChangePassword from '../pages/account/changepassword/ChangePassword';
import UpdateAccount from '../pages/account/update/UpdateAccount';
import ReportInfo from '../pages/incidents/reportinfo/ReportInfo';
import UpdateReport from '../pages/incidents/update/UpdateReport';
import ReportIn from '../pages/report-in/ReportIn';
import { useContext } from "react";
import { DataContext } from '../context/DataProvider';
import MarineTrafficHistory from '../pages/map/history/MarineTrafficHistory';
import VesselsInfo from '../pages/map/vesselsInfo/VesselsInfo';

import UsersAddForm from '../pages/users/table/forms/AddForm';
import UsersUpdateForm from '../pages/users/table/forms/UpdateForm';
import PersonnelAddForm from '../pages/personnel/table/forms/AddForm';
import PersonnelUpdateForm from '../pages/personnel/table/forms/UpdateForm';
import VesselAddForm from '../pages/vessels/table/forms/AddForm';
import VesselUpdateForm from '../pages/vessels/table/forms/UpdateForm';
import AircraftAddForm from '../pages/aircrafts/table/forms/AddForm';
import AircraftUpdateForm from '../pages/aircrafts/table/forms/UpdateForm';
export default function RouteDashboard() {
  const { accountData } = useContext(DataContext)




  // Check if accountData.groups exists before accessing its properties
  const isAdministrator = accountData.roles && accountData.roles[0] === 'Administrator';
  const isOPViewer = accountData.roles && accountData.roles[0] === 'OP Viewer';
  const isPersonnel = accountData.roles && accountData.roles[0] === 'Personnel';

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
            <Route path='/map/marinetraffic-history' element={<MarineTrafficHistory />} />
            <Route path='/map/marinetraffic-vessel-details' element={<VesselsInfo />} />

            <Route path='report-in' element={<ReportIn/>} />
            <Route path='reports' element={<Reports />} />
            <Route path='alerts' element={<Alerts />} />
            <Route path='incidents' element={<Incidents />} />
            <Route path='/incidents/add-incident' element={<AddIncident/>} />
            <Route path='/incidents/incident-information' element={<ReportInfo/>} />
            <Route path='/incidents/update-incident' element={<UpdateReport/>} />

            <Route path='roles' element={<Roles />} />
            <Route path='users' element={<Users />} />
            <Route path='/users/add-users' element={<UsersAddForm />} />
            <Route path='/users/update-users' element={<UsersUpdateForm />} />
            <Route path='/users/profile' element={<UserProfile />} />

            <Route path='personnel' element={<Personnel />} />
            <Route path='/personnel/profile' element={<PersonnelProfile />} />
            <Route path='/personnel/add-personnel' element={<PersonnelAddForm />} />
            <Route path='/personnel/update-personnel' element={<PersonnelUpdateForm />} />

            <Route path='vessels' element={<Vessels />} />
            <Route path='/vessels/profile' element={<VesselsProfile />} />
            <Route path='/vessels/add-vessel' element={<VesselAddForm />} />
            <Route path='/vessels/update-vessel' element={<VesselUpdateForm/>} />
            
            
            <Route path='aircrafts' element={<Aircrafts />} />
            <Route path='/aircrafts/profile' element={<AircraftProfile/>} />
            <Route path='/aircrafts/add-aircraft' element={<AircraftAddForm />} />
            <Route path='/aircrafts/update-aircraft' element={<AircraftUpdateForm/>} />
            
            

            <Route path='commercial-vessels' element={<VesselsCommercial />} />
            <Route path='commercial-aircrafts' element={<AircraftsCommercial />} />
            <Route path='settings' element={<Settings />} />
            <Route path='offices' element={<Offices />} />
            <Route path='/offices/profile' element={<OfficeProfile />} />
            <Route path='vehicles' element={<Vehicles />} />
            <Route path='/vehicles/profile' element={<VehicleProfile />} />

            <Route path='marinetraffic-list' element={<MarineTrafficList />} />
            <Route path='traksat-list' element={<TracksatList />} />
            <Route path='spidertrak-list' element={<SpiderTrakList />} />
          </>
        ) : isOPViewer ? (
          // Render only the map for users with the role "OP Viewer"
          <>
            <Route index element={<DashboardOP  />} />
            <Route path='dashboard' element={<DashboardOP />} />
            <Route path='/map' element={<Map />} />
          </>
        ) :  isPersonnel ? (
          <>
            <Route index element={<Map />} />
            <Route path='map' element={<Map />} />
            <Route path='incidents' element={<Incidents />} />
            <Route path='/incidents/add-incident' element={<AddIncident/>} />
            <Route path='/incidents/update-incident' element={<UpdateReport/>} />
            <Route path='report-in' element={<ReportIn/>} />
          </>
        ) : (
          <Route path='map' element={<Map />} />
        )}

        <Route path='account' element={<Account />} />
        <Route path='/account/change-password' element={<ChangePassword />} />
        <Route path='/account/update-account' element={<UpdateAccount/>} />
        <Route path='/incidents/incident-information' element={<ReportInfo/>} />

      </Routes>
    </AutoLogout>

  );
}
