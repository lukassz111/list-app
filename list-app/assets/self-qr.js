// Tworzymy custom element - komponent 'calculator-info-popup'
class SelfQr extends HTMLElement {
    drawQr() {
        this.url = window.location.toString();
        if(this.url.startsWith('file://')) {
            this.url = "";
        }
        if(this.url != "") {
            this.qr = new QRious({
                size: 500,
                element: this.canvasElement,
                value: this.url
            });
        } else {
            this.qr = new QRious({
                size: 500,
                element: this.canvasElement,
                value: 'mailto:lukassz111@gmail.com'
            });
        }
    }
    constructor() {
        super();
        // Tworzenie Shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });

        
        this.canvasElement = document.createElement('canvas');

        // Tworzymy style w Shadow DOM
        const style = document.createElement('style');
        style.textContent = `
            :host {
                max-width: 100%;
                max-height: 100%;
                width: 100%;
                height: 100%;
            }
            canvas {
                max-width: 100%;
                max-height: 100%;
                width: 100%;
                height: 100%;
                aspect-ratio: 1/1;
                padding: 16px;
                background-color: white;
            }
        `; 
        // Dodanie stylów i przycisku do Shadow DOM
        shadow.appendChild(style);
        shadow.appendChild(this.canvasElement);
        this.drawQr();
        window.addEventListener("hashchange", (event) => {
            this.drawQr();
        })
    }
}

customElements.define('self-qr', SelfQr);
