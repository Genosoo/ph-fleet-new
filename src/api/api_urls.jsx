
export const baseUrl = import.meta.env.VITE_URL;
export const videoStreamUrl = import.meta.env.VITE_VIDEOSTREAM_URL;

// CSRFTOKEN
export const getCsrfToken = `${baseUrl}/api/csrf_cookie/`;


// LOGIN
export const apilogin = `${baseUrl}/api/login/`;


// LOGOUT
export const apilogout = `${baseUrl}/api/logout/`;


// ACCOUNT
export const apiAccount = `${baseUrl}/api/myaccount/`;


// USERS
export const apiUsers = `${baseUrl}/api/users/`;


// CHECK IN
export const apiCheckInToday = `${baseUrl}/api/checked_in_users/`;
export const apiReportIn = `${baseUrl}/api/personnel_latest/`;


// PERSONNEL
export const apiPersonnelData = `${baseUrl}/api/personnel_latest/`;
export const apiPersonnelStatus = `${baseUrl}/api/personnel_status/`
export const apiPersonnelRank = `${baseUrl}/api/rank/`
export const apiPersonnelHistory = `${baseUrl}/api/personnel_history/`


// OFFICE
export const apiOfficesData = `${baseUrl}/api/office/`;


// VEHICLE
export const apiVehiclesData = `${baseUrl}/api/vehicle/`;


// UNIT
export const apiUnit = `${baseUrl}/api/unit/`


// MARINETRAFFIC
export const apiMarineTrafficData = `${baseUrl}/api/marine_traffic_latest/`;
export const apiMarineTrafficHistory = `${baseUrl}/api/marine_traffic_history/`
export const apiLatestMarineTraffic = `${baseUrl}/api/get_latest_marine_traffic/`;
export const apiMarineTrafficSetting = `${baseUrl}/api/marine_traffic_settings/`


// TRAKSAT
export const apiTrakSatData = `${baseUrl}/api/traksat_latest/`;
export const apiTrakSatHistory = `${baseUrl}/api/traksat_history/`
export const apiLatestTraksat = `${baseUrl}/api/get_traksat_latest/`;
export const apiTraksatSetting = `${baseUrl}/api/traksat_settings/`


// SPIDERTRACKS
export const apiSpidertracksData = `${baseUrl}/api/spidertracks_latest/`;


export const apiSpiderTrakData = `${baseUrl}/api/spidertracks_latest/`;
export const apiSpiderTrakHistory = `${baseUrl}/api/spidertracks_history/`
export const apiLatestSpiderTrak = `${baseUrl}/api/get_spidertracks_latest/`;
export const apiSpiderTrakSetting = `${baseUrl}/api/spidertracks_settings/`



// AIRCRAFT
export const apiAircraftData = `${baseUrl}/api/internal_aircraft/`;
export const apiAircraftType = `${baseUrl}/api/aircraft_type/`

// VESSELS
export const apiVesselsData = `${baseUrl}/api/internal_vessel/`;
export const apiVesselClassType = `${baseUrl}/api/vessel_class_types/`;
export const apiVesselClass = `${baseUrl}/api/vessel_class/`
export const apiVesselType = `${baseUrl}/api/vessel_type/`
export const apiVesselStatus = `${baseUrl}/api/vessel_status/`


// CARTRACK
export const apiCarTrack = `${baseUrl}/api/cartrack/vehicles/status/`
export const apiCarTrackSettings = `${baseUrl}/api/cartrack_settings/`

// ---MANAGE VESSEL CLASS TYPES---
// URL: [BASE_URL]/api/vessel_class_types/
// Methods Allowed: GET, POST, PUT, DELETE

// ---MANAGE VESSEL CLASS---
// URL: [BASE_URL]/api/vessel_class/
// Methods Allowed: GET, POST, PUT, DELETE

// ---MANAGE VESSEL STATUS---
// URL: [BASE_URL]/api/vessel_status/
// Methods Allowed: GET, POST, PUT, DELETE

// ---MANAGE VESSEL TYPE---
// URL: [BASE_URL]/api/vessel_type/
// Methods Allowed: GET, POST, PUT, DELETE

// ---MANAGE INTERNAL VESSEL---
// URL: [BASE_URL]/api/internal_vessel/
// Methods Allowed: GET, POST, PUT, DELETE


// INCIDENT
export const apiIncident = `${baseUrl}/api/incident/`;
export const apiIncidentSeverity = `${baseUrl}/api/incident_severity/`;
export const apiIncidentType = `${baseUrl}/api/incident_type/`;
export const apiIncidentStatus = `${baseUrl}/api/incident_status/`;

// ---MANAGE INCIDENT SEVERITY---
// URL: [BASE_URL]/api/incident_severity/
// Methods Allowed: GET, POST, PUT, DELETE

// ---MANAGE INCIDENT TYPE---
// URL: [BASE_URL]/api/incident_type/
// Methods Allowed: GET, POST, PUT, DELETE

// ---MANAGE INCIDENT STATUS---
// URL: [BASE_URL]/api/incident_status/
// Methods Allowed: GET, POST, PUT, DELETE

// ---MANAGE INCIDENT---
// URL: [BASE_URL]/api/incident/
// Methods Allowed: GET, POST, PUT, DELETE

// VIDEOSTREAM
export const apiVideoStream = `${baseUrl}/api/video_stream_latest`;


// ROLES
export const apiRoles = `${baseUrl}/api/groups/`;


export const apiSummary = `${baseUrl}/api/summary/`;






