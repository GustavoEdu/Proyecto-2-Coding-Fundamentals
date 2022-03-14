export default class Jugador {
    static FICHA_INTERNA_JUGADOR_1 = "$$$";
    static FICHA_INTERNA_JUGADOR_2 = "###";
    constructor(n, cPG, oF) {
        this.nombre = n;
        this.cantidadPartidasGanadas = cPG;
        this.objetoFicha = oF;
    }
}
