// Tworzymy custom element - komponent 'calculator-info-popup'
class TextInput extends HTMLElement {
    constructor() {
        super();
        this.key = "";
        // Tworzenie Shadow DOM
        this.shadow = this.attachShadow({ mode: 'open' });
        // this.placeholder = document.createElement('span');
        this.input = document.createElement('textarea');

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
        // this.shadow.appendChild(this.placeholder);
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

        this.input.style.height = '1ch';
        this.hiddenTextarea = document.createElement('textarea');
        this.input.parentNode.insertBefore(this.hiddenTextarea,this.input);
        this.addEventListener('input',function(ev) {
            that.updateHeightOfTextArea();
        })
        this.updateHeightOfTextArea();
    }

    updateHeightOfTextArea() {
        this.hiddenTextarea.placeholder = this.input.placeholder;
        this.hiddenTextarea.value = this.input.value;
        this.hiddenTextarea.style.height = "0px";
        this.hiddenTextarea.style.opacity = 0;
        this.hiddenTextarea.style.position = "absolute";
        this.hiddenTextarea.style.width = this.input.clientWidth+"px";
        this.hiddenTextarea.style.maxWidth = '100%';
        this.hiddenTextarea.style.top = '0';
        this.hiddenTextarea.style.bottom = '0';
        this.hiddenTextarea.style.left = '0';
        this.hiddenTextarea.style.right = '0';
        

        let that = this;
        setTimeout(function() {
            let currentHeight = that.hiddenTextarea.scrollHeight;
            let minHeight = util.getNumberFromCssValue(window.getComputedStyle(that.input).fontSize); 
            if(currentHeight < minHeight) {
                currentHeight = minHeight;
            }
            that.input.style.height = currentHeight + "px";
            
            // that.input.style.height =  + "px";
        })
    }
    prepareDisplayText(text) {
        if(text.trim().length <= 0) {
            return '"'+text+'"';
        }
        return text;
    }
    enableEdit() {
        // this.placeholder.style.display = 'none';
        // this.input.style.display = 'block';
        this.input.focus();
    }
    disableEdit() {
        let value = this.input.value;
        // this.placeholder.style.display = "block";
        // this.placeholder.style.whiteSpace = "pre-wrap";
        // this.placeholder.innerText = this.prepareDisplayText(value);
        // this.input.style.display = 'none';
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
            // this.placeholder.innerText = this.prepareDisplayText("");
            if( !(value == null || value == undefined || value.trim().length <= 0) ) {
                this.input.value = value;
                // this.placeholder.innerText = this.prepareDisplayText(value);
            }
            this.input.placeholder = this.innerHTML;
            if(this.key != "") {
                let v = keyStorage.getKeyOrDefault(this.key,"");
                this.input.value = v;
                // this.placeholder.innerText = this.prepareDisplayText(v);
            }
            this.disableEdit();
            this.updateHeightOfTextArea();
        });
    }
}

customElements.define('text-input', TextInput);
