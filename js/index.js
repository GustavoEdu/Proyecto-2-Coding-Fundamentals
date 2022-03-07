// import Jugador from "./Jugador.js";
import Tablero from "./Tablero.js";
// import Ficha from "./Ficha.js";
const miTablero = new Tablero();
let turno = true; // true - Jugador1 : false - Jugador2
console.log("Jugador 1", "X");
console.log("Jugador 2", "O");
const tablero = document.getElementById("tablero");
const botonReseteo = document.getElementById("botonReseteo");
botonReseteo.disabled = true;

botonReseteo.onclick = function() {
    miTablero.initicializarTablero();
    const casillas = document.querySelectorAll(".casilla");
    for(let casilla of casillas) {
        casilla.textContent = "";
    }
}

tablero.addEventListener("click", evt => {
    if(miTablero.hayUnGanador() || miTablero.hayEmpate()) { return; }
    const casilla = evt.target;
    const fila = casilla.dataset.fila;
    const columna = casilla.dataset.columna;
    if(!casilla.textContent) {
        if(turno) {
            casilla.textContent = "X";
            miTablero.tablero[fila][columna] = "X";
        } else {
            casilla.textContent = "O";
            miTablero.tablero[fila][columna] = "O";
        }
    } else {
        console.log("Jugada Inválida!");
    }
    if(miTablero.hayUnGanador()) {
        console.log((turno ? "Jugador 1" : "Jugador 2") + " ha ganado la partida!");
        return;
    }
    if(miTablero.hayEmpate()) {
        botonReseteo.disabled = false;
        console.log("¡Hay Empate!");
    }
    turno = !turno;
});
