export default class Ficha {
    constructor(c, f) {
        this.color = c;
        this.forma = f;
    }
    /*
        <select id="tipoFichaJugador1" class="fa">
            <option value="X">&#xf00d;</option>
            <option value="O">&#xf111;</option>
            <option class="fa-2x" value="Δ">&#xf0d8;</option>
            <option value="□">&#xf0c8;</option>
        </select>
    */
    getIcon() {
        switch(this.forma) {
            case "X":
                return `
                    <i class="fa fa-lg" style="color:${this.color};">&#xf00d;</i>
                `;
            case "O":
                return `
                    <i class="fa fa-lg" style="color:${this.color};">&#xf111;</i>
                `;
            case "Δ":
                return `
                    <i class="fa fa-2x" style="color:${this.color};">&#xf0d8;</i>
                `;
            case "□":
                return `
                    <i class="fa fa-lg" style="color:${this.color};">&#xf0c8;</i>
                `;
        }
    }
    toString() {
        switch(this.forma) {
            case "X":
                return `
                    <svg height="100" width="100">
                        <line x1="10" y1="10" x2="90" y2="90" style="stroke:${this.color};stroke-width:10"/>
                        <line x1="10" y1="90" x2="90" y2="10" style="stroke:${this.color};stroke-width:10"/>
                        Sorry, your browser does not support inline SVG.
                    </svg>
                `;
            case "O":
                return `
                    <svg height="100" width="100">
                        <circle cx="50" cy="50" r="40" style="stroke:${this.color};stroke-width:10" fill="rgba(0, 0, 0, 0)"/>
                        Sorry, your browser does not support inline SVG.
                    </svg>
                `;
            case "Δ":
                return `
                    <svg height="100" width="100">
                        <polygon points="10,90 50,10 90,90" style="fill:rgba(0, 0, 0, 0);stroke:${this.color};stroke-width:10" />
                        Sorry, your browser does not support inline SVG.
                    </svg>
                `;
            case "□":
                return `
                    <svg height="100" width="100">
                        <polygon points="10,10 90,10 90,90 10,90" style="fill:rgba(0, 0, 0, 0);stroke:${this.color};stroke-width:10" />
                        Sorry, your browser does not support inline SVG.
                    </svg>
                `;
        }
    }
}
