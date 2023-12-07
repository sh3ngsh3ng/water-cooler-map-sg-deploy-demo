import { singapore } from "./const.js";

export function initMap() {
  const map = L.map("map", {
    zoomControl: false
  });

  map.setView(singapore, 12);

  // get user's position
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(showPosition);
  // } else {
  //   console.error("Geolocation is not supported by this browser.")
  // }

  // function showPosition(position) {
  //   // set map based on user's position
  //   if (position) {
  //     map.setView([position.coords.latitude, position.coords.longitude], 13);
  //   } else {
  //     map.setView(singapore, 13);
  //   }

  //   map.setView(singapore, 12);
  // }

  L.control.zoom({
    position: 'bottomright'
  }).addTo(map);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg'
  }).addTo(map);

  return map;
}