import Jugador from "./Jugador.js";
import Ficha from "./Ficha.js";
import Tablero from "./Tablero.js";

const jugador1 = new Jugador("Jugador 1", 0, {});
const jugador2 = new Jugador("Jugador 2", 0, {});

const btnTransicionRegistroJugador1 = document.getElementById("btnTransicionRegistroJugador1");
const paginaIntroductoria = document.getElementById("paginaIntroductoria");
btnTransicionRegistroJugador1.addEventListener("click", () => {
    paginaIntroductoria.classList.add("hidden");
});

const paginaJugador1 = document.getElementById("paginaJugador1");
const formularioJugador1 = document.getElementById("formularioJugador1");
formularioJugador1.addEventListener("submit", evt => {
    evt.preventDefault();
    //* Validación de datos Jugador 1
    if(!document.getElementById("nombreJugador1").value) { return; }
    paginaJugador1.classList.add("hidden");
    //* Recuperar datos del Jugador 1
    const jd1 = document.getElementById("nombreJugador1").value;
    const color1 = document.getElementById("colorFichaJugador1").value;
    const $selectFicha1 = document.getElementById("tipoFichaJugador1").value;
    //* Asignación del Jugador 1
    jugador1.nombre = jd1;
    jugador1.objetoFicha = new Ficha(color1, $selectFicha1);
    //! console.log(jugador1);

    const tipoFichaJugador2 = document.getElementById("tipoFichaJugador2"); // padre
    const fichaABorrar = document.getElementById($selectFicha1); // hijo
    tipoFichaJugador2.removeChild(fichaABorrar); // borramos al hijo
});

const paginaJugador2 = document.getElementById("paginaJugador2");
const formularioJugador2 = document.getElementById("formularioJugador2");
formularioJugador2.addEventListener("submit", evt => {
    evt.preventDefault();
    //* Validación Jugador 2
    if(!document.getElementById("nombreJugador2").value) { return; }
    paginaJugador2.classList.add("hidden");
    //* Recuperar datos del Jugador 2
    const jd2 = document.getElementById("nombreJugador2").value;
    const color2 = document.getElementById("colorFichaJugador2").value;
    const $selectFicha2 = document.getElementById("tipoFichaJugador2").value;
    //* Asignación del Jugador2
    jugador2.nombre = jd2;
    jugador2.objetoFicha = new Ficha(color2, $selectFicha2);
    console.log(jugador2);

    // TODO: Inicializar la partida
})

function inicializarPartida() {
    // TODO: Agregar un observer
}

const btnSalir = document.getElementById("btnSalir");
const modalSalida = document.getElementById("modalSalida");
btnSalir.addEventListener("click", () => {
    modalSalida.classList.add("modalActivo");
});
modalSalida.addEventListener("click", evt => {
    const targetElement = evt.target;
    if(targetElement.classList.contains("modalSalida") || targetElement.id === "btnCancelar") {
        modalSalida.classList.remove("modalActivo");
    }
});

const btnSalirDefinitivo = document.getElementById("btnSalirDefinitivo");
btnSalirDefinitivo.addEventListener("click", () => {
    paginaIntroductoria.classList.remove("hidden");
    paginaJugador1.classList.remove("hidden");
    paginaJugador2.classList.remove("hidden");
    modalSalida.classList.remove("modalActivo");
});

//* Inicio del Juego
const miTablero = new Tablero();
let turno = true; // true - Jugador1 : false - Jugador2
const tablero = document.getElementById("tablero");
//! const botonReseteo = document.getElementById("botonReseteo");
//! botonReseteo.disabled = true;

/*
botonReseteo.onclick = function() {
    miTablero.initicializarTablero();
    const casillas = document.querySelectorAll(".casilla");
    for(let casilla of casillas) {
        casilla.textContent = "";
    }
    //! botonReseteo.disabled = true;
}
*/

tablero.addEventListener("click", evt => {
    //* Validación del Ganador o Empate
    if(miTablero.hayUnGanador() || miTablero.hayEmpate()) { return; }
    const casilla = evt.target;
    const fila = casilla.dataset.fila;
    const columna = casilla.dataset.columna;
    if(!casilla.innerHTML) {
        if(turno) {
            casilla.innerHTML = jugador1.objetoFicha;
            miTablero.tablero[fila][columna] = Jugador.FICHA_INTERNA_JUGADOR_1;
        } else {
            casilla.innerHTML = jugador2.objetoFicha;
            miTablero.tablero[fila][columna] = Jugador.FICHA_INTERNA_JUGADOR_2;
        }
    } else {
        // TODO: Implementar cuadro de diálogo para una jugada inválida
        console.log("Jugada Inválida!");
        return;
    }
    if(miTablero.hayUnGanador()) {
        console.log((turno ? jugador1.nombre : jugador2.nombre) + " ha ganado la partida!");
        if(turno) {
            jugador1.cantidadPartidasGanadas++;
        } else {
            jugador2.cantidadPartidasGanadas++;
        }
        //! botonReseteo.disabled = false;
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
        //! botonReseteo.disabled = false;
        return;
    }
    turno = !turno;
});
