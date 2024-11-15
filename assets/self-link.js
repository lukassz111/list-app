(function() {
    window.addEventListener('load',function(){
        let url = window.location.toString();
        let text = window.location.toString();
        let skip = false;
        // if(url.startsWith('file://')) {
        //     skip = true;
        // }
        if(!skip) {
            document.querySelectorAll('a.self-link').forEach( function( value ) {
                console.log(value);
                value.setAttribute('href',url);
                value.textContent = text;
            });
        }
    });
    
    window.addEventListener("hashchange", (event) => {
        let url = window.location.toString();
        let text = window.location.toString();
        let skip = false;
        // if(url.startsWith('file://')) {
        //     skip = true;
        // }
        if(!skip) {
            document.querySelectorAll('a.self-link').forEach( function( value ) {
                console.log(value);
                value.setAttribute('href',url);
                value.textContent = text;
            });
        }
    })
})()