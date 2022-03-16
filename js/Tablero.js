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
                return [{x: i, y: 0}, {x: i, y: 1}, {x: i, y: 2}];
            }
            if(this.tablero[0][i] && (this.tablero[0][i] === this.tablero[1][i]) && (this.tablero[0][i] === this.tablero[2][i])) {
                return [{x: 0, y: i}, {x: 1, y: i}, {x: 2, y: i}];
            }
        }
        if(this.tablero[1][1] && (this.tablero[1][1] === this.tablero[0][0]) && (this.tablero[1][1] === this.tablero[2][2])) {
            return [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}];
        } else if(this.tablero[1][1] && (this.tablero[1][1] === this.tablero[2][0]) && (this.tablero[1][1] === this.tablero[0][2])) {
            return [{x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 2}];
        }
        else {
            return [];
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
