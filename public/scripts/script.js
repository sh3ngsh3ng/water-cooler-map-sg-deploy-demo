import { initMap } from "./map.js";
import { find } from "./data.js";

document.addEventListener("DOMContentLoaded", async function () {

  const map = initMap(); // create the map

  // all the markers for the search will be inside here
  const searchResultLayer = L.layerGroup();
  searchResultLayer.addTo(map);

  setupEventHandlers();

  async function setupEventHandlers() {
    const results = await find();
    console.log('######', results)
    displaySearchResults(results);
  }

  function displaySearchResults(results) {

    for (let r of results) {
      addMarkerToMap(map, r);
    }
  }

  function addMarkerToMap(map, r) {
    const lat = r.latitude;
    const lng = r.longitude;
    const coordinate = [lat, lng];
    const marker = L.marker(coordinate);
    marker.addTo(searchResultLayer);
    marker.bindPopup(function () {
      const element = document.createElement('div');
      element.innerHTML = `<h1>${r.name}</h1>
                <button>Click me</button>;
            `;
      const button = element.querySelector("button");
      button.addEventListener("click", function () {
        alert("do whatever you want here");
      })
      return element;
    });
    // marker.addEventListener("click", function () {
    //   map.flyTo(coordinate, 16);
    // });
    return marker;
  }

});