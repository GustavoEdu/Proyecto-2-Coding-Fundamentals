export default class Tablero {
    constructor() {
        this.initicializarTablero();
    }
    initicializarTablero() {
        this.tablero = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
    }
    hayUnGanador() {
        for(let i = 0; i < this.tablero.length; i++) {
            if(this.tablero[i][0] && (this.tablero[i][0] === this.tablero[i][1]) && (this.tablero[i][0] === this.tablero[i][2])) {
                return true;
            }
            if(this.tablero[0][i] && (this.tablero[0][i] === this.tablero[1][i]) && (this.tablero[0][i] === this.tablero[2][i])) {
                return true;
            }
        }
        if(this.tablero[1][1] && ((this.tablero[1][1] === this.tablero[0][0]) && (this.tablero[1][1] === this.tablero[2][2]) || (this.tablero[1][1] === this.tablero[2][0]) && (this.tablero[1][1] === this.tablero[0][2]))) {
            return true;
        } else {
            return false;
        }
    }
    hayEmpate() {
        for(let i = 0; i < this.tablero.length; i++) {
            for(let j = 0; j < this.tablero[i].length; j++) {
                if(!this.tablero[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
}
