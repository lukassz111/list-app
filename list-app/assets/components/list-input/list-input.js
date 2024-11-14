// Tworzymy custom element - komponent 'calculator-info-popup'
class ListInput extends HTMLElement {
    constructor() {
        super();
        this.key = "";
        // Tworzenie Shadow DOM
        this.shadow = this.attachShadow({ mode: 'open' });
        this.table = document.createElement('table');
        this.trEdit = document.createElement('tr');
        this.table.appendChild(this.trEdit);
        this.trEditTd0 = document.createElement('td');
        this.trEditTd1 = document.createElement('td');
        this.trEditTd2 = document.createElement('td');
        this.trEdit.appendChild(this.trEditTd0);
        this.trEdit.appendChild(this.trEditTd1);
        this.trEdit.appendChild(this.trEditTd2);
        this.addTrBtn = document.createElement("button");
        this.trEditTd2.appendChild(this.addTrBtn);
        this.addTrBtn.textContent = "Dodaj";
        // this.table.setAttribute('border','1');

        this.editTrList = [];
        this.values = [];
        let that = this;
        this.addTrBtn.addEventListener('click',function() {
            that.values.push("");
            that.dispatchEvent(new CustomEvent('end-edit',{
                detail: that.values
            }))
            that.listCreate();
            
        });

        // Tworzymy style w Shadow DOM
        // const style = document.createElement('style');
        // style.textContent = `
        // `; 
        
        this.styleElement = document.createElement('link');
        
        this.styleElement.setAttribute('rel','stylesheet');
        this.styleElement.setAttribute('href',util.getPathToDirOfFileByError(new Error())+'/list-input.css');
        // Dodanie stylów i przycisku do Shadow DOM
        this.shadow.appendChild(this.styleElement);
        this.shadow.appendChild(this.table);

        this.addEventListener('end-edit',function(ev){
            if(this.key != "") {
                keyStorage.setKey(this.key, this.values);
            }
        })

    }

    listCreate() {
        this.editTrList.forEach(x => x.remove());
        this.editTrList = [];
        this.values.forEach( (value, index) => {
            let editTr = document.createElement('tr');
            let td0 = document.createElement('td');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            editTr.appendChild(td0);
            editTr.appendChild(td1);
            editTr.appendChild(td2);
            let inputText = document.createElement('text-input');
            inputText.setAttribute('value',value);
            inputText.textContent = "Element listy";
            td2.appendChild(inputText);
            td0.appendChild(document.createTextNode(index+"."))
            this.table.insertBefore(editTr,this.trEdit);
            this.editTrList.push(editTr);
            let that = this;
            inputText.addEventListener('end-edit',function(ev) {
                that.values[index] = ev.detail;
                that.dispatchEvent(new CustomEvent('end-edit',{
                    detail: that.values
                }))
            })
            let delBtn = document.createElement('button');
            delBtn.textContent = "X";
            td1.appendChild(delBtn);
            delBtn.addEventListener('click',function() {
                that.values = that.values.slice(0,index).concat(that.values.slice(index+1));
                that.dispatchEvent(new CustomEvent('end-edit',{
                    detail: that.values
                }))
                that.listCreate();
            })
        });
    }
    connectedCallback() {
        setTimeout(() => {
            this.key = this.getAttribute('data-key');
            if(this.key == null || this.key == undefined || this.key.trim().length <= 0 ) {
                this.key = "";
            }
            if(this.key != "") {
                let v = keyStorage.getKeyOrDefault(this.key,[]);
                this.values = v;
                this.listCreate();
            }
        });
    }
}
customElements.define('list-input', ListInput);
