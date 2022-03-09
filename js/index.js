const btnTransicionRegistroJugador1 = document.getElementById("btnTransicionRegistroJugador1");
const paginaIntroductoria = document.getElementById("paginaIntroductoria");
btnTransicionRegistroJugador1.addEventListener("click", () => {
    paginaIntroductoria.classList.add("hidden");
});

const paginaJugador1 = document.getElementById("paginaJugador1");
const formularioJugador1 = document.getElementById("formularioJugador1");
formularioJugador1.addEventListener("submit", evt => {
    evt.preventDefault();
    paginaJugador1.classList.add("hidden");
});

const paginaJugador2 = document.getElementById("paginaJugador2");
const formularioJugador2 = document.getElementById("formularioJugador2");
formularioJugador2.addEventListener("submit", evt => {
    evt.preventDefault();
    paginaJugador2.classList.add("hidden");
})

/* import Jugador from "./Jugador.js";
import Tablero from "./Tablero.js";
// import Ficha from "./Ficha.js";
const miTablero = new Tablero();
let turno = true; // true - Jugador1 : false - Jugador2
const jugador1 = new Jugador("", 0);
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
    botonReseteo.disabled = true;
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
        if(turno) {
            jugador1.cantidadPartidasGanadas++;
        } else {
        }
        botonReseteo.disabled = false;
        return;
    }
    // TODO: Implementar que sucede cuando alguien gana definitivamente n partidas
    if(jugador1.cantidadPartidasGanadas === 5 || jugador2.cantidadPartidasGanadas === 5) {
        console.log("Tenemos un ganador definitivo!");
        // botonComenzarNuevoJuego.disabled = false;
        return;
    }
    if(miTablero.hayEmpate()) {
        console.log("¡Hay Empate!");
        botonReseteo.disabled = false;
        return;
    }
    turno = !turno;
}); */
