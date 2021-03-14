var rideName = document.getElementById('rideName');
var rideDate = document.getElementById('rideDate');
var rideTime = document.getElementById('rideTime');
var meetingPoint = document.getElementById('meetingPoint');
var finishPoint = document.getElementById('finishPoint');
var leaderName = document.getElementById('leaderName');
var maxParticipants = document.getElementById('maxParticipants');
var rideNotes = document.getElementById('rideNotes');
let rideLink = document.getElementById('rideLink');
rideLink.addEventListener('input', embedRide);
var createRideButton = document.getElementById('createRideButton');
createRideButton.addEventListener('click', createRide);
let iframeWindow = document.getElementById('iframeEmbed');

function embedRide() {
    
    if(rideLink.value === '') {
        // iframeWindow.src='';
        // iframeWindow.style.display = 'none';
        toggleEmbedError('blank');
        if(checkEmbedExists) {
            let deleteEl = document.getElementById('embedTile');
            deleteEl.parentNode.removeChild(deleteEl);
        }
    }
    else if(checkLinkPattern(rideLink.value)){
        toggleEmbedError('valid'); 

        if(checkEmbedExists()) {
            console.log('HELLO');
        let embedTile = document.createElement('div');
        embedTile.setAttribute('class', 'tile is-vertical is-parent');
        embedTile.setAttribute('id', 'embedTile');
        let embedChildTile = document.createElement('div');
        embedChildTile.setAttribute('class', 'tile is-child');
        let embedFrame = document.createElement('iframe');
        embedFrame.setAttribute('src', '');
        embedFrame.setAttribute('width', '100%');
        embedFrame.setAttribute('height', '680');
        embedFrame.setAttribute('frameborder', '0');
        embedFrame.setAttribute('scrolling', 'no');
        embedFrame.setAttribute('id', 'iframeEmbed');

        document.getElementById('createRideContainer').append(embedTile);
        embedTile.append(embedChildTile);
        embedChildTile.append(embedFrame);

        embedFrame.src=rideLink.value + '/embed?profile=1';
        embedFrame.style.display = 'block';   
        }
        else {
            document.getElementById('iframeEmbed').src=rideLink.value + '/embed?profile=1';
        }

        }
    else if(!checkLinkPattern(rideLink.value)){
        toggleEmbedError('invalid'); 
        if(checkEmbedExists) {
            let deleteEl = document.getElementById('embedTile');
            deleteEl.parentNode.removeChild(deleteEl);
        }
    }
}

function checkEmbedExists() {
    if(document.getElementById('embedTile') === null){
        return true;
    }
    else {
        console.log('NOPE');
        return false;
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
        document.getElementById('embedInput').append(embedError);
    }
}

function createRide() {

    let ride = {
        "name": rideName.value,
        "date": rideDate.value,
        "time": rideTime.value,
        "meetingPoint": meetingPoint.value,
        "finishPoint": finishPoint.value,
        "leader": leaderName.value,
        "participants": maxParticipants.value,
        "notes": rideNotes.value,
        "rideLink": rideLink.value,    
        "created": new Date()
      };

      fetch('http://localhost:3000/createRide', {
          method: 'POST',
          credentials: "include",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(ride)
      })
      .then(response => response.json())
      .then(resp => {        
        window.location.replace("./dashboard.html");
     })
}