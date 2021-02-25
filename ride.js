let rideLink = document.getElementById('embedLink');
rideLink.addEventListener('input', embedRide);
let iframeWindow = document.getElementById('iframeEmbed');

function embedRide() {
    
    if(rideLink.value === '') {
        iframeWindow.src='';
        iframeWindow.style.display = 'none';
        toggleEmbedError('blank');
    }
    else if(checkLinkPattern(rideLink.value)){
        toggleEmbedError('valid'); 
        iframeWindow.src=rideLink.value + '/embed?profile=1';
        iframeWindow.style.display = 'block';        
        }
    else if(!checkLinkPattern(rideLink.value)){
        toggleEmbedError('invalid'); 
        iframeWindow.style.display = 'none';
    }
}

function checkLinkPattern(link) {
    let pattern = /^https:\/\/www\.komoot\.com\/tour\/[0-9]*$/;
    return pattern.test(link);
}

function toggleEmbedError(cond) {
    if((cond === 'blank' || cond === 'valid') && document.getElementById('embedLinkError') !== null) {
        let embedError = document.getElementById('embedLinkError');
        embedError.remove(); 
    }
    else if(cond === 'invalid' && document.getElementById('embedLinkError') === null) {
        let embedError = document.createElement('p');
        embedError.setAttribute('id', 'embedLinkError');
        embedError.innerHTML = 'NOPE';
        document.body.insertBefore(embedError, document.getElementById('iframeEmbed'));
    }
}

