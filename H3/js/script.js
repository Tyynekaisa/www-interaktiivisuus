// Lue lisää Pop Up
document.getElementById("openBox").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("popupBox").classList.add("show");
});

document.getElementById("closeBox").addEventListener("click", function() {
    document.getElementById("popupBox").classList.remove("show");
});

document.addEventListener("click", function(event) {
    let popup = document.getElementById("popupBox");

    // Sulkee boksin myös kun klikataan sen ulkopuolella
    if (!popup.contains(event.target) && event.target.id !== "openBox") {
        popup.classList.remove("show");
    }
});

// MAP

let map = new L.Map('map', {
	fullscreenControl: true,
    tap: false,
	fullscreenControlOptions: {
		position: 'topleft',
        forceSeparateButton: true,
        // content: '<i class="fa-solid fa-expand"></i>'
	}
});

map.setView([30, 10], 2);

const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);


// METEORITE LANDING DATA

const data_url = "data/nasa-meteorites.json";

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
