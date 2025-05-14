const map = L.map('map').setView([30, 0], 2);
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

const data_url = "https://data.nasa.gov/resource/gh4g-9sfh.json";



let iconSmall = "icons/marker-icon-blue.png";
let iconMedium = "icons/marker-icon-green.png";
let iconLarge = "icons/marker-icon-red.png";

const getData = async () => {
    const response = await fetch(data_url);
    const data = await response.json();
    console.log(data);
    data.forEach((item) => {
        if(item.reclat && item.reclong) { // tarkastetaan että itemilla (meteoriitilla) on reclat ja reclong
            const place = item.name;
            const mass = item.mass / 1000;
            const date = new Date(item.year);
            let year = date.getFullYear(date);

            if (mass < 0.5) {
                var myIcon = L.icon({
                    iconUrl: "icons/marker-icon-blue.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [0, -30],
                    shadowUrl: "icons/marker-shadow.png"
                });
            } else if (mass >= 0.5 && mass < 10) {
                var myIcon = L.icon({
                    iconUrl: "icons/marker-icon-green.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [0, -30],
                    shadowUrl: "icons/marker-shadow.png"
                });
            } else {
                var myIcon = L.icon({
                    iconUrl: "icons/marker-icon-red.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [0, -30],
                    shadowUrl: "icons/marker-shadow.png"
                });
            }

            L.marker([item.reclat, item.reclong], {title: item.name, icon: myIcon}).addTo(map)
            .bindPopup('<b>' + place + '</b><br>' + mass + ' kg<br>' + year);
        }
    })
}

getData();