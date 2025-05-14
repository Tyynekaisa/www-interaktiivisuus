import { Rectangle } from "./modules/Rectangle.js";

let rect1 = new Rectangle(0, 0, 0, 0);
let rect2= new Rectangle(0, 0, 0, 0);
let color1;
let color2;

const overlapping_true = document.getElementById("overlap_true");
const overlapping_false = document.getElementById("overlap_false");
const square = document.querySelector(".square");

const form1 = document.getElementById("rectangle1");
const form2 = document.getElementById("rectangle2");
const form3 = document.getElementById("movingform");

const canvas = document.querySelector("#c");
const ctx = canvas.getContext("2d");
canvas.width = 578;
canvas.height = 515;

ctx.fillStyle = "grey";
ctx.fillText("0", 5, 12);
ctx.fillText("578", 555, 12);
ctx.fillText("515", 5, 510);

form1.addEventListener("submit", submitHandler1);
form2.addEventListener("submit", submitHandler2);
form3.addEventListener("submit", movingHandler);


function submitHandler1(event) {
    event.preventDefault();
    console.log("Nappia 1 painettu");

    color1 = document.querySelector('input[name="color1"]:checked')?.value;
    console.log("Valittu väri: " + color1);
    const l1 = Number(document.querySelector("#left1").value);
    const t1 = Number(document.querySelector("#top1").value);
    const w1 = Number(document.querySelector("#width1").value);
    const h1 = Number(document.querySelector("#height1").value);

    rect1 = new Rectangle(l1, t1, w1, h1);
    console.log(rect1);
    drawRectangles();
    overLapping();
}

function submitHandler2(event) {
    event.preventDefault();
    console.log("Nappia 2 painettu");
    color2 = document.querySelector('input[name="color2"]:checked')?.value;
    console.log("Valittu väri: " + color2);
    const l2 = Number(document.querySelector("#left2").value);
    const t2 = Number(document.querySelector("#top2").value);
    const w2 = Number(document.querySelector("#width2").value);
    const h2 = Number(document.querySelector("#height2").value);

    rect2 = new Rectangle(l2, t2, w2, h2);
    console.log(rect2);
    drawRectangles();
    overLapping();
}

function movingHandler(event) {
    event.preventDefault();
    console.log("Siirrä-nappia painettu");
    const x = Number(document.querySelector("#left2_new").value);
    const y = Number(document.querySelector("#top2_new").value);

    rect2.move(x, y);
    console.log(rect2);

    drawRectangles();
    overLapping();
}

function drawRectangles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color1;
    ctx.fillRect(rect1.left, rect1.top, rect1.width, rect1.height);
    ctx.fillStyle = color2;
    ctx.fillRect(rect2.left, rect2.top, rect2.width, rect2.height);
    ctx.fillStyle = "grey";
    ctx.fillText("0", 5, 12);
    ctx.fillText("578", 555, 12);
    ctx.fillText("515", 5, 510);
}

function overLapping() {
    if (rect1.area > 0 && rect2.area > 0) {
        square.style.display = "none";
        console.log("Rect1 overlaps Rect2: " + rect1.overlap(rect2));
        if (rect1.overlap(rect2)) {
            overlapping_true.style.display = "block";
            overlapping_false.style.display = "none";
        } else {
            overlapping_true.style.display = "none";
            overlapping_false.style.display = "block";
        }
    }
}









