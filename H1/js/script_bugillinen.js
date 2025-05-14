//Peliohjeet
document.getElementById("openBox").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("popupBox").classList.add("show");
});

document.getElementById("closeBox").addEventListener("click", function() {
    document.getElementById("popupBox").classList.remove("show");
});

document.addEventListener("click", function(event) {
    let popup = document.getElementById("popupBox");

    // Tarkistaa, että klikattu elementti EI ole laatikon sisällä
    if (!popup.contains(event.target) && event.target.id !== "openBox") {
        popup.classList.remove("show");
    }
});


// Pelikartta
const map = [];

map[0] = "Satulinna";
map[1] = "Syvä kaivo";
map[2] = "Aurinkoinen metsäaukio";
map[3] = "Lohikäärme";
map[4] = "Kapea metsäpolku";
map[5] = "Vanha portti";
map[6] = "Joen ranta";
map[7] = "Vanha puupenkki";
map[8] = "Mökki metsän siimeksessä";
map[9] = "Yksisarvinen"

const images = [];

images[0] = "torni.jpg";
images[1] = "kaivo.jpg";
images[2] = "aukio.jpg";
images[3] = "dragon.jpg";
images[4] = "polku.jpg";
images[5] = "portti.jpg";
images[6] = "joki.jpg";
images[7] = "penkki.jpg";
images[8] = "mokki.jpg";
images[9] = "yksisarvinen.jpg";

const blockMessages = [];

blockMessages[0] = "Haluamasi reitti on liian vaarallinen!";
blockMessages[1] = "Salaperäinen voima estää liikkumisen tähän suuntaan.";
blockMessages[2] = "Vaikeakulkuinen tiheikkö estää liikkumisen.";
blockMessages[3] = "Et pääse ohittamaan lohikäärmettä sitä kautta.";
blockMessages[4] = "";
blockMessages[5] = "Portti on lukossa ja vartijat näyttävät vihaisilta.";
blockMessages[6] = "Joki on liian syvä ylitettäväksi.";
blockMessages[7] = "Metsä on liian tiheä kuljettavaksi.";
blockMessages[8] = "Olet liian peloissasi mennäksesi tuohon suuntaan.";

let mapLocation = 4;
console.log(map[mapLocation]);

// Esineet

let items = ["kivi"];
let itemLocations = [6] // alussa vain kivi on joella
const knownItems = ["huilu", "kivi", "glittermaali", "avain", "taikasauva"];
let item = "";
let backPack = [];

// Muut muuttujat

let troubadour = false;
let gateOpen = false;
// Testausta varten
// gateOpen = true;

// Vihjeet

const glueMessages = [];

glueMessages[0] = "Linnan väki taitaa pitää musiikista.";
glueMessages[1] = "Kaivo onkin syvä, mitähän sinne voisi tiputtaa?";
glueMessages[2] = "Kaunis metsäaukio, mutta en usko, että täällä tapahtuu mitään jännittävää.";
glueMessages[3] = "Nukahtaisiko lohikäärme, jos soittaisit sille tuutulaulun?";
glueMessages[4] = "Mihin suuntaan haluaisit mennä?";
glueMessages[5] = "Portinvartijoiden höynäyttämiseen ei taida jästien keinot tepsiä.";
glueMessages[6] = "Joen rannalla näyttäisi olevan jotakin mukaan poimittavaa.";
glueMessages[7] = "Näyttääpäs penkki ränsistyneeltä. Se kaipaisi ehkä uutta maalia.";
glueMessages[8] = "Mökin ovi taitaa olla lukossa.";

// Pelaajan syöte
let playersInput = "";

// Pelin viesti
let gameMessage = "";

// Pelaajan käytössä olevat komennot
let actionsForPlayer = ["pohjoinen", "itä", "etelä", "länsi", "poimi", "käytä", "jätä", "vihje"];
let action = "";

// Käyttöliittymäelementit
const image = document.querySelector("#image")
const output = document.querySelector("#output");
const input = document.querySelector("#input");
const button = document.querySelector("#action_btn");
button.addEventListener("click", clickHandler, false);
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        clickHandler();
    }
});

render();

function render() {
    if (mapLocation == 9) {
        output.innerHTML = "<h3>Onneksi olkoon!</h3><br>Löysit yksisarvisen ja pääsit pelin läpi."
    } else {
        output.innerHTML = `Sijaintisi on: ${map[mapLocation]}`;
        for (let i = 0; i < items.length; i++) {
            if (mapLocation === itemLocations[i]) {
                output.innerHTML += `<br>Näet esineen: ${items[i]}`;
            }
        }

        if (backPack.length !== 0) {
            output.innerHTML += `<br>Mukanasi on: ${backPack.join(", ")}`;
        }

        output.innerHTML += `<br> ${gameMessage}`;
    }
    image.src = `images/${images[mapLocation]}`; 

}

function clickHandler() {
    console.log("Nappia tai enteriä painettu");
    playGame()
}

function playGame() {
    // Lue syöte ja muuta kaikki kirjaimet pieniksi
    playersInput = input.value.toLowerCase();
    gameMessage = "";
    action = "";

    // Tarkista pelaajan syöte, löytyykö se hyväksyttyjen listasta
    for(let i = 0; i < actionsForPlayer.length; i++) {
        if (playersInput.indexOf(actionsForPlayer[i]) !== -1) {
            action = actionsForPlayer[i];
            console.log(`Pelaajan valinta ${action} tunnistettiin`);
            break;
        }
    }

    // Tarkista pelaajan syöte, onko esine 
    for (let i = 0; i < knownItems.length; i++) {
        if (playersInput.indexOf(knownItems[i]) !== -1) {
            item = knownItems[i];
            console.log(`Haluttu esine: ${item}`);
            break;
        }
    }

    switch(action) {
        case "pohjoinen":
            if (mapLocation >= 3) {
                mapLocation -= 3;
            } else {
                gameMessage = blockMessages[mapLocation];
            }
            break;
        case "itä":
            if (mapLocation % 3 != 2) {
                mapLocation += 1;
            } else if (mapLocation == 5) { // Portti
                if (gateOpen) { // Jos portti on auki, pääsee portista yksisarvisen luokse
                    backPack = []; // Tyhjentää repun
                    mapLocation = 9;
                } else {
                    gameMessage = blockMessages[mapLocation];
                }
            } else {
                gameMessage = blockMessages[mapLocation];
            }
            break;
        case "etelä":
            if (mapLocation <=5) {
                mapLocation += 3;
            } else {
                gameMessage = blockMessages[mapLocation];
            }
            break;
        case "länsi":
            if (mapLocation % 3 != 0) {
                mapLocation -= 1;
            } else {
                gameMessage = blockMessages[mapLocation];
            }
            break;

        case "poimi":
            takeItem();
            break;

        case "käytä":
            useItem();
            break;
        
        case "jätä":
            leaveItem();
            break;

        case "vihje":
            gameMessage += glueMessages[mapLocation];
            break;
        
        default:
            gameMessage = "Tuntematon toiminto.";
    }
    render();
}

function takeItem() {
    const itemIndexNumber = items.indexOf(item);

    if(itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation) {
        backPack.push(item);
        items.splice(itemIndexNumber, 1);
        itemLocations.splice(itemIndexNumber, 1);
        gameMessage += `Poimit esineen: ${item}`;
        console.log(`Pelikentällä: ${items}`);
        console.log(`Repussa: ${backPack}`);

        if (mapLocation == 0 && backPack.includes("glittermaali")) { // Otetaan glittermaali linnalta
            glueMessages[mapLocation] = "Ei enempää vihjeitä täällä!";
        }

        if (mapLocation == 6 && (items.includes("kivi") === false)) { // Otetaan kivi (toimii myös kun kivi on jo tiputettu kaivoon)
            glueMessages[mapLocation] = "Ei enempää vihjeitä täällä!";
        }

        if (mapLocation == 2 && backPack.includes("huilu")) { // Otetaan huilu kaivolta
            glueMessages[mapLocation] = "Ei enempää vihjeitä täällä!";
        }

        if (mapLocation == 3 && backPack.includes("avain")) { // Otetaan avain lohikäärmeen luota
            glueMessages[mapLocation] = "Ei enempää vihjeitä täällä!";
        }

        if (mapLocation == 8 && backPack.includes("taikasauva")) { //Otetaan taikasauva mökistä
            glueMessages[mapLocation] = "Ei enempää vihjeitä täällä!";
        }
    } else {
        gameMessage += "Et voi tehdä tätä toimintoa!";
    }
}

function leaveItem() {
    if (backPack.length !== 0) {
        const backPackIndexNumber = backPack.indexOf(item);
        if (backPackIndexNumber !== -1) {
            items.push(backPack[backPackIndexNumber]);
            itemLocations.push(mapLocation);
            backPack.splice(backPackIndexNumber, 1);
            gameMessage += `<br>Jätit esineen: ${item}`
        }
    } else {
        gameMessage += "Et voi tehdä tätä toimintoa!";
    }
}

function useItem() {
    const backPackIndexNumber = backPack.indexOf(item);
    if (backPackIndexNumber === -1) {
        gameMessage += "Sinulla ei ole sitä mukanasi!";
        return;
    }

    if(backPack.length === 0) {
        gameMessage += "Reppusi on tyhjä."
        return;
    }

    if (backPackIndexNumber !== -1) {
        switch(item) {
            case "huilu":
                if (mapLocation === 0) { // Tornilla
                    if (backPack.includes("sävel")) {
                        gameMessage += "Osaat soittaa oikean sävelmän! Oletko kokeillut soittaa sitä lohikäärmeelle?";
                    }
                    else {
                        gameMessage += "Soitat kauniisti, mutta sävelmä ei ole oikea.";
                        items.push("glittermaali");
                        itemLocations.push(mapLocation);
                        glueMessages[mapLocation] = "Hmmm... olisikohan glittermaalille käyttöä?"
                    }
                } else if (mapLocation === 7 && troubadour === true) { // Puupenkki
                    gameMessage += "Upeaa! Osaat nyt soittaa uuden sävelmän!";
                    backPack.push("sävel");
                    glueMessages[mapLocation] = "Ei enempää vihjeitä täällä!"
                } else if (mapLocation === 3) { // Lohikäärme
                    if (backPack.includes("sävel")) {
                        images[mapLocation] = "dragon2.jpg"
                        gameMessage += "Lohikäärme nukahti soittoosi!";
                        items.push("avain");
                        itemLocations.push(mapLocation);
                        backPack = [] // Reppu tyhjenee
                        glueMessages[mapLocation] = "Lohikäärmeen vieressä taitaa olla jotakin!"
                    } else {
                        gameMessage += "Sävel on väärä. Lohikäärme ei pidä soitostasi!";
                    }
                } else {
                gameMessage += "Kaunis musiikki soi ympärilläsi.";
                }
                break;

            case "kivi":
                if (mapLocation === 1) {  // Kaivon sijainti
                    gameMessage += "Pudotat kiven kaivoon.";
                    backPack.splice(backPackIndexNumber, 1);
                    items.push("huilu");
                    itemLocations.push(mapLocation);
                    glueMessages[mapLocation] = "Kaivolla näyttäisi olevan jotain mukaan poimittavaa.";
                    images[mapLocation] = "kaivo2.jpg"
                } else if (mapLocation === 3) {
                    gameMessage += "Sinuna en heittelisi kiveä lohikäärmeen lähellä!";
                } else {
                    gameMessage += "Heittelet kiveä ilmaan.";
                }
                break;

            case "glittermaali":
                if (mapLocation === 0) { // Torni
                    gameMessage += "Glittermaali ei sovi linnan maalaamiseen.";
                } else if (mapLocation === 1 || mapLocation === 6) { // Kaivo tai joki
                    gameMessage += "Vesi pilaantuu jos heität sinne maalia.";
                } else if (mapLocation === 5) { // Portti
                    gameMessage += "Portinvartijat pidättävät kaikki jotka yrittävät maalata graffitteja porttiin.";
                } else if (mapLocation === 8) { // Mökki
                    gameMessage += "Mökki on juuri maalattu, sitä ei tarvitse maalata uudelleen!";
                } else if (mapLocation === 7) { // Puupenkki. Maalattuasi tämän ilmestyy trubaduuri opettamaan sinulle sävelmän
                    gameMessage += "Penkki näyttää upelta ja trubaduurikin saapui sitä ihailemaan!";
                    troubadour = true;
                    backPack.splice(backPackIndexNumber, 1);
                    glueMessages[mapLocation] = "Mitä jos soittaisitte yhdessä trubaduurin kanssa?"
                    images[mapLocation] = "penkki2.jpg"
                } else {
                    gameMessage += "Täällä ei ole mitään maalattavaa.";
                }
                break;

            case "avain":
                if (mapLocation === 0) { // Torni
                    gameMessage += "Avain ei sovi linnan oveen.";
                } else if (mapLocation === 5) { // Portti
                    gameMessage += "Et onnistu pääsemään portin vartijoiden ohitse.";
                } else if (mapLocation === 8) { // Mökki
                    gameMessage += "Avaat mökin oven. Ja astut sisään.";
                    backPack.splice(backPackIndexNumber, 1);
                    images[mapLocation] = "mokki2.jpg"
                    items.push("taikasauva");
                    itemLocations.push(mapLocation);
                    glueMessages[mapLocation] = "Mökin pöydällä taitaa olla jotakin."
                } else {
                    gameMessage += "Ihailet kiiltävää avainta.";
                }
                break;
            
            case "taikasauva":
                if (mapLocation === 5) { // Portti
                    gameMessage += "Taiot portinvartijat pökerryksiin ja portti avautuu!";
                    gateOpen = true;
                    images[mapLocation] = "portti2.jpg"
                    glueMessages[mapLocation] = "Kokeile kulkea portista."
                } else {
                    gameMessage += "Abrakadabra! Mitään ei tapahdu";
                }
        }

    }
}
