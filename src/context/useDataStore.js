import { create } from "zustand";
import axios from "axios";
import {
  apiOfficesData,
  apiVehiclesData,
  apiUnit,
  apiAircraftData,
} from "../api/api_urls";
import { message } from "antd";

const useDataStore = create((set) => ({
  unitData: [],
  vehiclesData: [],
  officesData: [],
  loading: false,

  fetchData: async () => {
    try {
      set({ loading: true }); // Set loading to true before making the request
      const [
        vehiclesResponse,
        officesResponse,
        unitResponse,
        aircraftResponse,
      ] = await Promise.all([
        axios.get(apiVehiclesData),
        axios.get(apiOfficesData),
        axios.get(apiUnit),
        axios.get(apiAircraftData),
      ]);
      set({
        vehiclesData: vehiclesResponse.data.success,
        officesData: officesResponse.data.success,
        unitData: unitResponse.data.success,
        aircraftData: aircraftResponse.data.success,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      set({ loading: false }); // Set loading to false after the request completes (whether successful or not)
    }
  },

  // ========================  OFFICES STATE ======================================== //
  addOffice: async (newItem, csrfToken) => {
    try {
      const response = await axios.post(apiOfficesData, newItem, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
      const addedItem = response.data.data;
      set((state) => ({
        officesData: [...state.officesData, addedItem],
      }));
      message.success("Successfully added the office");
    } catch (error) {
      console.error("Failed to add the office:", error);
      message.error("Failed to add the office");
    }
  },

  deleteOffice: async (officeId, csrfToken) => {
    try {
      await axios.delete(apiOfficesData, {
        data: { id: officeId },
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
      set((state) => ({
        officesData: state.officesData.filter(
          (office) => office.id !== officeId
        ),
      }));
      message.success("Successfully deleted the office");
    } catch (error) {
      console.error("Error deleting office:", error);
      message.error("Failed to delete the office");
    }
  },

  updateOffice: async (officeId, updatedData, csrfToken) => {
    try {
      await axios.put(
        apiOfficesData,
        { ...updatedData, id: officeId },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      set((state) => ({
        officesData: state.officesData.map((office) =>
          office.id === officeId ? { ...office, ...updatedData } : office
        ),
      }));

      message.success("Successfully updated the office");
    } catch (error) {
      console.error("Error updating office:", error);
      message.error("Failed to update the office");
    }
  },

  // ======================== VEHICLES STATE ======================================== //
  addVehicle: async (newItem, csrfToken) => {
    try {
      const response = await axios.post(apiVehiclesData, newItem, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
      const addedItem = response.data.data;
      set((state) => ({
        vehiclesData: [...state.vehiclesData, addedItem],
      }));
      message.success("Successfully added the vehicle");
    } catch (error) {
      console.error("Failed to add the vehicle:", error);
      message.error("Failed to add the vehicle");
    }
  },

  deleteVehicle: async (vehicleId, csrfToken) => {
    try {
      await axios.delete(apiVehiclesData, {
        data: { id: vehicleId },
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
      set((state) => ({
        vehiclesData: state.vehiclesData.filter(
          (vehicle) => vehicle.id !== vehicleId
        ),
      }));
      message.success("Successfully deleted the vehicle");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      message.error("Failed to delete the vehicle");
    }
  },

  updateVehicle: async (vehicleId, updatedData, csrfToken) => {
    try {
      await axios.put(
        apiVehiclesData,
        { ...updatedData, id: vehicleId },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      set((state) => ({
        vehiclesData: state.vehiclesData.map((vehicle) =>
          vehicle.id === vehicleId ? { ...vehicle, ...updatedData } : vehicle
        ),
      }));

      message.success("Successfully updated the vehicle");
    } catch (error) {
      console.error("Error updating vehicle:", error);
      message.error("Failed to update the vehicle");
    }
  },
}));

export default useDataStore;
