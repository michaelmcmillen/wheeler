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
// let logoutButton = document.getElementById('logoutButton');
// logoutButton.addEventListener('click', logout);

function embedRide() {



    
    if(rideLink.value === '') {
        toggleEmbedError('blank');
        if(checkEmbedExists) {
            let deleteEl = document.getElementById('gpxiframe');
            deleteEl.parentNode.removeChild(deleteEl);
        }
    }
    else if(checkLinkPattern(rideLink.value)){
        toggleEmbedError('valid'); 

        if(checkEmbedExists()) {

            let gpxFrame = document.createElement('iframe');
            gpxFrame.setAttribute('width', '100%');
            gpxFrame.setAttribute('height', '680');
            gpxFrame.setAttribute('id', 'gpxiframe');
            gpxFrame.setAttribute('frameborder', '0');
            gpxFrame.setAttribute('scrolling', 'no');
            let gpxRender = document.getElementById('gpxRender');
        
            gpxRender.append(gpxFrame);
        
            document.getElementById('gpxiframe').src=rideLink.value + '/embed?profile=1';
        embedFrame.style.display = 'block';   
        }
        else {
            document.getElementById('gpxiframe').src=rideLink.value + '/embed?profile=1';
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
    if(document.getElementById('gpxiframe') === null){
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
        embedError.setAttribute('class', 'help is-danger');
        let urlString = 'https://www.komoot.com/tour/123456789';
        embedError.innerHTML = 'Please insert a Komoot tour with the format '+ urlString.bold();
        document.getElementById('gpxRender').append(embedError);
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
        window.location.replace("./myrides");
     })
}

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
  
        });
      });
    }
  
  });