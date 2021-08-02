// let logoutButton = document.getElementById('logoutButton');
// logoutButton.addEventListener('click', logout);
let createRideButton = document.getElementById('createRide');
createRideButton.addEventListener('click', createRides);


// ride.addEventListener('click', expandRide);

function getRides() {

    fetch('http://localhost:3000/getRides', {
      credentials: "include"
    })
    .then(response => response.json())
    .then(resp => {
      if(resp) {
        displayRides(resp);

        // displayName(resp)
      }
      else {
        toggleSignInError(resp)
      }
    })
  }

window.onload = getRides();

function expandRide(e) {

  let ride = {
    'id': e.target.id
  };
  // console.log(test);
  // console.log(ride);

  fetch('http://localhost:3000/selectRide', {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ride)
  })
  .then(response => response.json())
  .then(resp => {
    if(resp) {
      console.log(resp[0].created);


      document.getElementById('rideModal').setAttribute('class', 'modal is-active');
      document.getElementById('modalClose').addEventListener('click', modalClose);

      let modalCardTitle = document.getElementById('modalCardTitle');
      modalCardTitle.innerText = resp[0].name;
      
      let dateCreatedContent = document.createElement('p');
      dateCreatedContent.setAttribute('class', 'rideCardContent');
      let rideDateTitle = document.getElementById('rideDateTitle');
      dateCreatedContent.innerText = resp[0].date;
      rideDateTitle.after(dateCreatedContent);

      let startTimeContent = document.createElement('p');
      startTimeContent.setAttribute('class', 'rideCardContent');
      let startTimeTitle = document.getElementById('startTimeTitle');
      startTimeContent.innerText = resp[0].time;
      startTimeTitle.after(startTimeContent);    

      let startingPointContent = document.createElement('p');
      startingPointContent.setAttribute('class', 'rideCardContent');
      let startingPointTitle = document.getElementById('startingPointTitle');
      startingPointContent.innerText = resp[0].meetpoint;
      startingPointTitle.after(startingPointContent);

      let finishingPointContent = document.createElement('p');
      finishingPointContent.setAttribute('class', 'rideCardContent');
      let finishingPointTitle = document.getElementById('finishingPointTitle');
      finishingPointContent.innerText = resp[0].finishpoint;
      finishingPointTitle.after(finishingPointContent);

      let leaderNameContent = document.createElement('p');
      leaderNameContent.setAttribute('class', 'rideCardContent');
      let leaderNameTitle = document.getElementById('leaderNameTitle');
      leaderNameContent.innerText = resp[0].leader;
      leaderNameTitle.after(leaderNameContent);

      let maxParticipantsContent = document.createElement('p');
      maxParticipantsContent.setAttribute('class', 'rideCardContent');
      let maxParticipantsTitle = document.getElementById('maxParticipantsTitle');
      maxParticipantsContent.innerText = resp[0].groupsize;
      maxParticipantsTitle.after(maxParticipantsContent);

      let notesContent = document.createElement('p');
      notesContent.setAttribute('class', 'rideCardContent');
      let notesTitle = document.getElementById('notesTitle');
      if(resp[0].notes == '') {
        notesContent.innerText = 'No notes...'
      } else {
        notesContent.innerText = resp[0].notes;
      }
      notesTitle.after(notesContent);

      // let gpxLinkContent = document.createElement('a');
      // gpxLinkContent.setAttribute('class', 'rideCardContent');
      // gpxLinkContent.setAttribute('href', resp[0].ridelink);
      // let gpxLinkTitle = document.getElementById('gpxLinkTitle');
      // gpxLinkContent.innerText = resp[0].ridelink;
      // gpxLinkTitle.after(gpxLinkContent);

      let gpxFrame = document.createElement('iframe');
      gpxFrame.setAttribute('width', '100%');
      gpxFrame.setAttribute('height', '480');
      gpxFrame.setAttribute('id', 'gpxiframe');
      gpxFrame.setAttribute('frameborder', '0');
      gpxFrame.setAttribute('scrolling', 'no');
      let gpxLinkTitle = document.getElementById('gpxLinkTitle');
      gpxLinkTitle.after(gpxFrame);
      document.getElementById('gpxiframe').src=resp[0].ridelink + '/embed';
      
      

    }
    else {
      // toggleSignInError(resp)
    }
  })

}

function modalClose() {

  document.getElementById('rideModal').setAttribute('class', 'modal');

}

function displayRides(rideNames) {
    if(rideNames.length === 0) {
      let rideElAnchor = document.createElement('a');
        let rideElSpan = document.createElement('span');
        let rideElI = document.createElement('i');

        rideElAnchor.setAttribute('class', 'panel-block');
        rideElAnchor.setAttribute('id', 'noRides');
        rideElSpan.setAttribute('class', 'panel-icon');
        rideElI.setAttribute('class', 'fas fa-bicycle');
        // rideElI.setAttribute('aria-hidden', 'true');

        let ridePanel = document.getElementById('ridesPanel');

        ridePanel.append(rideElAnchor);
        rideElAnchor.append(rideElSpan);
        rideElSpan.append(rideElI);

        rideElAnchor.append('You havent created any rides yet...');

    }
    else {
    rideNames.forEach(ride => {
        let rideElAnchor = document.createElement('a');
        let rideElSpan = document.createElement('span');
        let rideElI = document.createElement('i');

        rideElAnchor.setAttribute('class', 'panel-block subtitle is-7 ride');
        rideElAnchor.setAttribute('id', ride.id);
        rideElSpan.setAttribute('class', 'panel-icon');
        rideElI.setAttribute('class', 'fas fa-bicycle');
        // rideElI.setAttribute('aria-hidden', 'true');

        let ridePanel = document.getElementById('ridesPanel');

        ridePanel.append(rideElAnchor);
        rideElAnchor.append(rideElSpan);
        rideElSpan.append(rideElI);

        rideElAnchor.append(ride.name);
    });
  }

  let ride = document.querySelectorAll('.ride');

  for (let i = 0; i < ride.length; i++) {
    ride[i].addEventListener('click', expandRide);
  }

}

// function displayName(rideNames) {

//   let myRideTitle = document.getElementById('nameTitle');
//   myRideTitle.append('Hello ' + rideNames[0].firstname + '!');

// }

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

function createRides() {
  
  window.location.replace("/createRidePage");

}