import Jugador from "./Jugador.js";
import Ficha from "./Ficha.js";
import Tablero from "./Tablero.js";

const audioJugadaCorrecta = new Audio("../media/jugadaCorrecta.mpeg");
const audioJugadaIncorrecta = new Audio("../media/jugadaIncorrecta.mpeg");
const audioPartidaGanada = new Audio("../media/partidaGanada.mpeg");
const audioGanador = new Audio("../media/jijijija.mp3");
audioPartidaGanada.volume = 0.2;
audioGanador.volume = 0.5;

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

    inicializarPartida();
})

//* Inicio del Juego
const miTablero = new Tablero();
let turno = Boolean(Math.floor(Math.random() * 2)); // true - Jugador1 : false - Jugador2
const tablero = document.getElementById("tablero");

const btnSalir = document.getElementById("btnSalir");
const modalSalida = document.getElementById("modalSalida");
btnSalir.addEventListener("click", () => {
    modalSalida.classList.add("modalActivo");
});
modalSalida.addEventListener("click", evt => {
    const targetElement = evt.target;
    if(targetElement.classList.contains("modal") || targetElement.id === "btnCancelar") {
        modalSalida.classList.remove("modalActivo");
    }
});

const btnNuevaPartida = document.getElementById("btnNuevaPartida");
btnNuevaPartida.disabled = true;
btnNuevaPartida.addEventListener("click", () => {
    jugarOtraPartida();
    refrescarTurno();
    btnNuevaPartida.disabled = true;
});
const btnJuegoNuevo = document.getElementById("btnJuegoNuevo");
btnJuegoNuevo.disabled = true;
btnJuegoNuevo.addEventListener("click", () => {
    jugador1.cantidadPartidasGanadas = 0;
    jugador2.cantidadPartidasGanadas = 0;
    jugarOtraPartida();
    turno = !turno;
    inicializarPartida();
    btnJuegoNuevo.disabled = true;
});
const btnSalirDefinitivo = document.getElementById("btnSalirDefinitivo");
btnSalirDefinitivo.addEventListener("click", () => {
    paginaIntroductoria.classList.remove("hidden");
    paginaJugador1.classList.remove("hidden");
    paginaJugador2.classList.remove("hidden");
    modalSalida.classList.remove("modalActivo");
    jugador1.cantidadPartidasGanadas = 0;
    jugador2.cantidadPartidasGanadas = 0;
    jugarOtraPartida();
    tipoFichaJugador2.innerHTML = `
        <option id="X" value="X">X</option>
        <option id="O" value="O">O</option>
        <option id="Δ" value="Δ">Δ</option>
        <option id="□" value="□">□</option>
    `;
    btnNuevaPartida.disabled = true;
    btnJuegoNuevo.disabled = true;
});

const mensajeErrorJugador1 = document.getElementById("mensajeErrorJugador1");
const mensajeErrorJugador2 = document.getElementById("mensajeErrorJugador2");
let casillasGanadoras = [];

tablero.addEventListener("click", evt => {
    //* Validación del Ganador o Empate
    if(miTablero.hayUnGanador().length > 0 || miTablero.hayEmpate()) { return; }
    const casilla = evt.target;
    const fila = casilla.dataset.fila;
    const columna = casilla.dataset.columna;
    if(!casilla.innerHTML && miTablero.tablero[fila]) {
        mensajeErrorJugador1.textContent = "";
        mensajeErrorJugador2.textContent = "";
        if(turno) {
            casilla.innerHTML = jugador1.objetoFicha;
            miTablero.tablero[fila][columna] = Jugador.FICHA_INTERNA_JUGADOR_1;
        } else {
            casilla.innerHTML = jugador2.objetoFicha;
            miTablero.tablero[fila][columna] = Jugador.FICHA_INTERNA_JUGADOR_2;
        }
    } else {
        if(turno) {
            mensajeErrorJugador1.textContent = "¡Jugada Inválida!";
        } else {
            mensajeErrorJugador2.textContent = "¡Jugada Inválida!";
        }
        audioJugadaIncorrecta.play();
        return;
    }
    if(miTablero.hayUnGanador().length > 0) {
        if(turno) {
            jugador1.cantidadPartidasGanadas++;
        } else {
            jugador2.cantidadPartidasGanadas++;
        }
        if(!(jugador1.cantidadPartidasGanadas === 5 || jugador2.cantidadPartidasGanadas === 5)) {
            audioPartidaGanada.play();
        }
        /* Sombreados */
        const casillas = document.querySelectorAll(".casilla");
        const coordenadasCasillasAPintar = miTablero.hayUnGanador();
        for(let i = 0; i < casillas.length; i++) {
            const fil = casillas[i].dataset.fila;
            const col = casillas[i].dataset.columna;
            for(let j = 0; j < coordenadasCasillasAPintar.length; j++) {
                if(fil == coordenadasCasillasAPintar[j].x && col == coordenadasCasillasAPintar[j].y) {
                    casillas[i].style.border = "5px solid #000";
                    casillasGanadoras.push(casillas[i]);
                }
            }
        }
        /* /Sombreados */
        //* Refresco de Cartillas
        inicializarPartida();

        //* Implementación para un Ganador Definitivo
        if(jugador1.cantidadPartidasGanadas === 5 || jugador2.cantidadPartidasGanadas === 5) {
            btnJuegoNuevo.disabled = false;
            invokeModalGanadorDefinitivo();
            return;
        }
        btnNuevaPartida.disabled = false;
        turno = !turno;
        return;
    } else {
        const soundDiv = document.getElementById("soundDiv");
        soundDiv.innerHTML = `
            <audio autoplay>
                <source src="../media/jugadaCorrecta.mpeg" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
    }
    if(miTablero.hayEmpate()) {
        btnNuevaPartida.disabled = false;
        return;
    }
    turno = !turno;
    refrescarTurno();
});

function inicializarPartida() {
    const casillaNombreJugador1 = document.getElementById("casillaNombreJugador1");
    const casillaNombreJugador2 = document.getElementById("casillaNombreJugador2");
    const casillaFichaJugador1 = document.getElementById("casillaFichaJugador1");
    const casillaFichaJugador2 = document.getElementById("casillaFichaJugador2");
    const jugador1Contador = document.getElementById("jugador1Contador");
    const jugador2Contador = document.getElementById("jugador2Contador");

    casillaNombreJugador1.textContent = jugador1.nombre;
    casillaNombreJugador2.textContent = jugador2.nombre;
    casillaFichaJugador1.innerHTML = jugador1.objetoFicha.getIcon();
    casillaFichaJugador2.innerHTML = jugador2.objetoFicha.getIcon();
    jugador1Contador.textContent = jugador1.cantidadPartidasGanadas;
    jugador2Contador.textContent = jugador2.cantidadPartidasGanadas;

    refrescarTurno();
}

function refrescarTurno() {
    const divTurno = document.getElementById("divTurno");
    divTurno.innerHTML = turno ? jugador1.objetoFicha : jugador2.objetoFicha;
}

function jugarOtraPartida() {
    miTablero.initicializarTablero();
    refrescarTableroDOM();
    mensajeErrorJugador1.textContent = "";
    mensajeErrorJugador2.textContent = "";
    for(let casillaGanadora of casillasGanadoras) {
        casillaGanadora.style.border = "";
    }
}

function refrescarTableroDOM() {
    const casillas = document.querySelectorAll(".casilla");
    for(let casilla of casillas) {
        casilla.innerHTML = "";
    }
}

const modalGanadorDefinitivo = document.getElementById("modalGanadorDefinitivo");
function invokeModalGanadorDefinitivo() {
    const nombreGanadorDefinitivo = document.getElementById("nombreGanadorDefinitivo");
    nombreGanadorDefinitivo.textContent = turno ? jugador1.nombre : jugador2.nombre;
    modalGanadorDefinitivo.classList.add("modalActivo");
    audioGanador.play();
}
modalGanadorDefinitivo.addEventListener("click", evt => {
    const targetElement = evt.target;
    if(targetElement.classList.contains("modal") || targetElement.id === "btnCerrarVentana") {
        modalGanadorDefinitivo.classList.remove("modalActivo");
    }
})
