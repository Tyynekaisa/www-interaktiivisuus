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

const getData = async () => {
    const response = await fetch(data_url);
    const data = await response.json();
    // console.log(data);
    data.forEach((item) => {
        if(item.reclat && item.reclong) { // tarkastetaan että itemilla (meteoriitilla) on reclat ja reclong
            const place = item.name;
            const mass = item.mass / 1000;
            const date = new Date(item.year);
            let year = date.getFullYear(date);

            L.marker([item.reclat, item.reclong], {title: item.name}).addTo(map)
            .bindPopup('<b>' + place + '</b><br>' + mass + ' kg<br>' + year);
        }
    })
}

getData();