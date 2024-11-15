(function() {
    window.addEventListener('load',function(){
        if(navigator.share) {
            console.log('exist navigator.share');
            document.querySelectorAll('button.self-share').forEach(v => {
                // if (navigator.share) {
                // } else {
        
                // }
                console.log(v);
                v.addEventListener('click',function() {
                    let url = window.location.toString();
                    navigator.share({
                      title: document.title,
                      text: "",
                      url: url
                    })
                    .then(() => console.log('Successful share'))
                    .catch(error => console.log('Error sharing:', error));
                });
            })
        } else {
            console.log('not exist navigator.share');
            document.querySelectorAll('button.self-share').forEach(button => { button.remove(); });
        }
    });
})()