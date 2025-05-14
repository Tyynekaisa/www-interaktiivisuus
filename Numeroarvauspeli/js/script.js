// Testataan konsolissa, että scriptin osoiteviittaukset oikein
// console.log("sjfjfdskh") 

// Pelin numeeriset muuttujat
const mysteryNumber = Math.ceil(Math.random() * 100);

let playersGuess = 0;
let guessesRemaining = 10;
let guessesMade = 0;
let gameState = "";
let gameWon = false;

// Käyttöliittymä
const input = document.querySelector("#input");
const output = document.querySelector("#output");
const button = document.querySelector("#btn");
// button.style.cursor = "pointer";
// button style siirretty css:ään

button.addEventListener("click", clickHandler, false)
window.addEventListener("keydown", keydownHandler, false)


// Määritellään, mitä tapahtuu kun buttonia klikataan
function clickHandler() {
    validateInput();
}

// Myös enterin (keycode 13) painaminen käy buttonin klikkaamisesta
function keydownHandler(event) {
    if(event.keyCode == 13) {
        validateInput();
    }

}

// Tarkistaa onko syöte sallittu
function validateInput() {
    playersGuess = parseInt(input.value);
    if (isNaN(playersGuess)) {
        output.innerHTML = "Syötä vain numeroita!";
    }
    else if (playersGuess<1 || playersGuess>100) {
        output.innerHTML = "Luvun on oltava väliltä 1-100!";
    }
    else {
        playGame()
    }
}

function playGame() {
    
    // console.log(playersGuess);
    guessesMade++;
    guessesRemaining--;
    gameState = "Arvaus nro: " + guessesMade + ". Jäljellä: " + guessesRemaining + ".";


    if (playersGuess > mysteryNumber) {
        output.innerHTML = "Arvauksesi on liian suuri.<br>" + gameState;
        if (guessesRemaining < 1) {
            endGame();
        }
    }
    else if (playersGuess < mysteryNumber) {
        output.innerHTML = "Arvauksesi on liian pieni.<br>" + gameState;
        if (guessesRemaining < 1) {
            endGame();
        }
    }
    else {
        gameWon = true;
        endGame();
    }
}

function endGame() {
    if (gameWon) {
        output.innerHTML = "Juhuu! Arvasit oikein! <br><br> Oikea numero oli " + mysteryNumber + "! <br>Sinulta kului " + guessesMade + " arvausta.";
    }
    else {
        output.innerHTML = "Voi pettymysten pettymys! Hävisit pelin.<br><br> Oikea numero oli " + mysteryNumber + ".";
    }

    button.removeEventListener("click", clickHandler, false);
    button.disabled = true;
    input.disabled = true;
    window.removeEventListener("keydown", keydownHandler, false);
}
