
export const baseUrl = import.meta.env.VITE_URL;
export const videoStreamUrl = import.meta.env.VITE_VIDEOSTREAM_URL;

export const getCsrfToken = `${baseUrl}/api/csrf_cookie/`;

export const apilogin = `${baseUrl}/api/login/`;

export const apilogout = `${baseUrl}/api/logout/`;

export const apiAccount = `${baseUrl}/api/myaccount/`;

export const apiUsers = `${baseUrl}/api/users/`;

export const apiCheckInToday = `${baseUrl}/api/checked_in_users/`;

export const apiPersonnelData = `${baseUrl}/api/personnel_latest/`;
export const apiPersonnelStatus = `${baseUrl}/api/personnel_status/`
export const apiPersonnelRank = `${baseUrl}/api/rank/`

export const apiOfficesData = `${baseUrl}/api/office/`;

export const apiVehiclesData = `${baseUrl}/api/vehicle/`;

export const apiUnit = `${baseUrl}/api/unit/`

export const apiMarineTrafficData = `${baseUrl}/api/marine_traffic_latest/`;
export const apiMarineTrafficHistory = `${baseUrl}/api/marine_traffic_history/`

export const apiTrakSatData = `${baseUrl}/api/traksat_latest/`;
export const apiTrakSatHistory = `${baseUrl}/api/traksat_history/`


export const apiSpiderTrakData = `${baseUrl}/api/spidertracks_latest/`;
export const apiSpiderTrakHistory = `${baseUrl}/api/spidertracks_history/`

export const apiLatestMarineTraffic = `${baseUrl}/api/get_latest_marine_traffic/`;

export const apiLatestTraksat = `${baseUrl}/api/get_traksat_latest/`;

export const apiLatestSpiderTrak = `${baseUrl}/api/get_spidertracks_latest/`;

export const apiAircraftData = `${baseUrl}/api/internal_aircraft/`;
export const apiAircraftType = `${baseUrl}/api/aircraft_type/`


export const apiVesselsData = `${baseUrl}/api/internal_vessel/`;
export const apiVesselClassType = `${baseUrl}/api/vessel_class_types/`;
export const apiVesselClass = `${baseUrl}/api/vessel_class/`
export const apiVesselType = `${baseUrl}/api/vessel_type/`
export const apiVesselStatus = `${baseUrl}/api/vessel_status/`

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

export const apiIncident = `${baseUrl}/api/incident/`;

export const apiVideoStream = `${baseUrl}/api/video_stream_latest`;

export const apiRoles = `${baseUrl}/api/groups/`;

export const apiMarineTrafficSetting = `${baseUrl}/api/marine_traffic_settings/`

export const apiTraksatSetting = `${baseUrl}/api/traksat_settings/`

export const apiSpiderTrakSetting = `${baseUrl}/api/spidertracks_settings/`

export const apiCarTrack = `${baseUrl}/api/cartrack/vehicles/status/`
export const apiCarTrackSettings = `${baseUrl}/api/cartrack_settings/`

