

const util = {
    /**
     * 
     * @param { Error } error 
     * @returns string
     */
    getPathToFileByError( error ) {
        return error.stack.split('\n').map( ( v => {
            let r = /(?:https?\:\/\/)(?:[^\s]{1,})(?:\.js)/g;
            return v.match(r);
        })).filter( v => v != null).filter( v => v.length > 0 ).filter( (v,i,a) => { return i == 0 })[0][0];
    },

    /**
     * 
     * @param { Error } error 
     * @returns string
     */
    getPathToDirOfFileByError( error ) {
        let pathParts = this.getPathToFileByError(error).split('/');
        pathParts = pathParts.slice(0, pathParts.length - 1);
        return pathParts.join('/');
    },

    /**
     * 
     * @param { string } value 
     * @returns number|null
     */
    getNumberFromCssValue( value ) {
        if(value == undefined || value == null || value == "") {
            return null;
        }
        let matches = value.match(/(?:\d{1,})/);
        if(matches.length > 0) {
            return matches[0];
        }
        return null;
    }
}