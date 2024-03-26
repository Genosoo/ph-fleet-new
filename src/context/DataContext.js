import {
  apiMarineTrafficData,
  apiTrakSatData,
  apiSpiderTrakData,
  apiPersonnelData,
  apiVideoStream,
  apiOfficesData,
  apiVehiclesData,
  apiIncident,
  apiCarTrack,
} from "../api/api_urls";
import axios from "axios";

export const fetchData = async () => {
  try {
    const marineTrafficResponse = await axios.get(apiMarineTrafficData);
    const tracksatResponse = await axios.get(apiTrakSatData);
    const spiderTrakResponse = await axios.get(apiSpiderTrakData);
    const personnelResponse = await axios.get(apiPersonnelData);
    const videoStreamResponse = await axios.get(apiVideoStream);
    const officeResponse = await axios.get(apiOfficesData);
    const vehiclesResponse = await axios.get(apiVehiclesData);
    const incidentResponse = await axios.get(apiIncident);
    const carResponse = await axios.get(apiCarTrack);

    return {
      marineTrafficData: marineTrafficResponse.data.success,
      tracksatData: tracksatResponse.data.success,
      spiderTrakData: spiderTrakResponse.data.success,
      personnelData: personnelResponse.data.success,
      videoStreamData: videoStreamResponse.data.success,
      officeData: officeResponse.data.success,
      vehiclesData: vehiclesResponse.data.success,
      incidentData: incidentResponse.data.success,
      carData: carResponse.data.data,
    };
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
};
