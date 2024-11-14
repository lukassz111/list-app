// Tworzymy custom element - komponent 'calculator-info-popup'
class TextInput extends HTMLElement {
    constructor() {
        super();
        this.key = "";
        // Tworzenie Shadow DOM
        this.shadow = this.attachShadow({ mode: 'open' });
        this.placeholder = document.createElement('span');
        this.input = document.createElement('input');

        // Tworzymy style w Shadow DOM
        // <link rel="stylesheet" href="styles.css"></link>
        this.styleElement = document.createElement('link');
        
        this.styleElement.setAttribute('rel','stylesheet');
        this.styleElement.setAttribute('href',util.getPathToDirOfFileByError(new Error())+'/text-input.css');
        const style = document.createElement('style');
        style.textContent = `
        `; 
        // Dodanie stylów i przycisku do Shadow DOM
        this.shadow.appendChild(this.styleElement);
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.placeholder);
        this.shadow.appendChild(this.input);
        let that = this;
        this.addEventListener('mouseenter',function(ev) {
            that.enableEdit();
        })
        this.addEventListener('focusin',function(ev) {
            that.enableEdit();
        })
        this.addEventListener('mouseleave',function(ev) {
            that.disableEdit();
        })
        this.addEventListener('focusout',function(ev) {
            that.disableEdit();
        })
    }
    prepareDisplayText(text) {
        if(text.trim().length <= 0) {
            return '"'+text+'"';
        }
        return text;
    }
    enableEdit() {
        this.placeholder.style.display = 'none';
        this.input.style.display = '';
        this.input.focus();
    }
    disableEdit() {
        let value = this.input.value;
        this.placeholder.style.display = "inline-block";
        this.placeholder.style.whiteSpace = "pre-wrap";
        this.placeholder.innerText = this.prepareDisplayText(value);
        // this.placeholder.style.display = '';
        this.input.style.display = 'none';
        this.dispatchEvent(new CustomEvent('end-edit',{
            detail: this.input.value
        }))
        if(this.key != "") {
            keyStorage.setKey(this.key, this.input.value);
        }
    }
    connectedCallback() {
        this.setAttribute('tabindex',0);
        this.tabIndex = 0;
        setTimeout(() => {
            this.key = this.getAttribute('data-key');
            let value = this.getAttribute('value');
            if(this.key == null || this.key == undefined || this.key.trim().length <= 0 ) {
                this.key = "";
            }
            // if(this.key.trim() > 0) {
            //     let ref = 
            // }
            this.placeholderText = this.innerHTML;
            this.placeholder.innerText = this.prepareDisplayText("");
            if( !(value == null || value == undefined || value.trim().length <= 0) ) {
                this.input.value = value;
                this.placeholder.innerText = this.prepareDisplayText(value);
            }
            this.input.placeholder = this.innerHTML;
            if(this.key != "") {
                let v = keyStorage.getKeyOrDefault(this.key,"");
                this.input.value = v;
                this.placeholder.innerText = this.prepareDisplayText(v);
            }
            this.disableEdit();
        });
    }
}

customElements.define('text-input', TextInput);
