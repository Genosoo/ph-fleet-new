import { divIcon, point } from "leaflet";

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
