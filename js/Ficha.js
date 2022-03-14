export default class Ficha {
    constructor(c, f) {
        this.color = c;
        this.forma = f;
    }
    toString() {
        return `TaTeTi ${this.forma}`;
    }
}
