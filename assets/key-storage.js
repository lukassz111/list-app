class KeyStorage {
    /**
     * 
     * @param { string } key 
     * @param { any } value 
     */
    setKey(key, value) {
        let ref = this.data;
        let parts = key.split('.');
        for(let i = 0; i<parts.length; i++) {
            if((i+1) >= parts.length) {
                ref[parts[i]] = value;
            } else {
                if(!Object.keys(ref).includes(parts[i])) {
                    ref[parts[i]] = {};
                }
                ref = ref[parts[i]];
            }
        }
        this._dispatchEvent(key);
    }

    /**
     * 
     * @param { string } key 
     * @returns any|null
     */
    getKey(key) {
        let parts = key.split('.');
        let ref = this.data;
        for(let i = 0; i<parts.length; i++) {
            console.log({ref,p:parts[i],last:(i+1) >= parts.length})
            if((i+1) >= parts.length) {
                if(Object.keys(ref).includes(parts[i])) {
                    return ref[parts[i]];
                } else {
                    return null;
                }
            } else {
                if(Object.keys(ref).includes(parts[i])) {
                    ref = ref[parts[i]];
                } else {
                    return null;
                }
            }
        }
        return null;
    }
    /**
     * 
     * @param { string } key 
     * @param { any|null } defaultValue 
     * @returns any|null
     */
    getKeyOrDefault(key, defaultValue) {
        let x = this.getKey(key);
        if(x == null) {
            return defaultValue;
        }
        return x;
    }
    /**
     * 
     * @param { string } key 
     */
    _dispatchEvent(key) {
        window.dispatchEvent(new CustomEvent('key-update', {
            detail: key
        }))
    }

    data = {}

    constructor() {
        let that = this;
        window.addEventListener('key-update', function(ev) {
            console.log("Update key: "+ev.detail, that.data);
        })
        
        if(window.location.hash.startsWith('#')) {
            let hash = window.location.hash.substring(1);
            let dataString = unescape(atob(hash));
            let object = JSON.parse(dataString);
            this.setKey("list", object);
        }
    }
}
const keyStorage = new KeyStorage();
window.keyStorage = keyStorage;