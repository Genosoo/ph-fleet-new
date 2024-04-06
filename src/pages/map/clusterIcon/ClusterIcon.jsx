import { divIcon, point } from "leaflet";
import './Styles.css'

export const marineTrafficClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="marineTraffic-cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

export const trakSatClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="trakSat-cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

export const personnelClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="personnel-cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

export const vehicleClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="vehicle-cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};


export const carClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="car-cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

export const incidentClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="incident-cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

export const videoStreamClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="videoStream-cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

export const spiderTrakClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="spiderTrak-cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};


export const officeClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="office-cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};
