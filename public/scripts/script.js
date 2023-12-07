import { initMap } from "./map.js";
import { find } from "./data.js";

document.addEventListener("DOMContentLoaded", async function () {

  const map = initMap(); // create the map
  // all the markers for the search will be inside here
  const searchResultLayer = L.layerGroup();
  searchResultLayer.addTo(map);

  setupData();

  async function setupData() {
    const results = await find();
    // console.log('######', results)
    displaySearchResults(results);
  }

  function displaySearchResults(results) {
    for (let record of results) {
      addMarkerToMap(map, record);
    }
  }

  function addMarkerToMap(map, record) {
    const lat = record.latitude;
    const lng = record.longitude;
    const coordinate = [lat, lng];
    let waterIcon = null
    if (record.verified) {
      waterIcon = L.icon({
        iconUrl: './images/water-green.png',
        iconSize: [24, 24], // size of the icon
     });
    } else {
      waterIcon = L.icon({
        iconUrl: './images/water-red.png',
        iconSize: [24, 24], // size of the icon
      });
    }

    const marker = L.marker(coordinate, {icon: waterIcon});
    marker.addTo(searchResultLayer);
    marker.bindPopup(function () {
      const element = document.createElement('div');
      element.innerHTML = `
      <img class="img-thumbnail points-image" src=${record.image ? record.image : '/images/noimage.jpeg'} />
      <h5>${record.name}</h5>
      <div class="description">
        <span class="label">Postcode</span>
        <span class="value">${record.postcode}</span>
      </div>
      <div class="description">
        <span class="label">Level</span>
        <span class="value">${record.level}</span>
      </div>
      <div class="description">
        <span class="label">Description</span>
        <span class="value">${record.description}</span>
      </div>
      <div class="description">
        <span class="label">Temperature</span>
        <span class="value">${record.temperature}</span>
      </div>
      <div class="description">
        <span class="label">Latitude</span>
        <span class="value">${record.latitude}</span>
      </div>
      <div class="description">
        <span class="label">Longitude</span>
        <span class="value">${record.longitude}</span>
      </div>
      <div class="description">
        <span class="label">Source</span>
        <span class="value">${record.source}</span>
      </div>
      <div class="description">
        <span class="label">VerifiedBy</span>
        <span class="value">${record.verifiedBy || 'N/A'}</span>
      </div>
      <div class="description">
        <span class="label">Operator</span>
        <span class="value">${record.operator}</span>
      </div>
      <button class="btn btn-primary">Go There</button>
      `;
      const button = element.querySelector("button");
      button.addEventListener("click", function () {
        alert("do whatever you want here");
      })
      return element;
    }, {
      keepInView: true
    });
    // marker.addEventListener("click", function () {
    //   map.flyTo(coordinate, 16);
    // });
    return marker;
  }

});