let createRideButton = document.getElementById('createRide');
createRideButton.addEventListener('click', createRides);

//Retrieve users rides
function getRides() {

    fetch('http://localhost:3000/getRides', {
      credentials: "include"
    })
    .then(response => response.json())
    .then(resp => {
      if(resp) {
        displayRides(resp);
      }
      else {
        toggleSignInError(resp)
      }
    })
}

//Retrieve rides when page is loaded
window.onload = getRides();

//Create ride content card when selected on the My Rides page
function expandRide(e) {

  checkCardContent();

  let ride = {
    'id': e.target.id
  };

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
      document.getElementById('modalCloseButton').addEventListener('click', modalClose);
      let deleteRideButton = document.getElementById('modalDeleteRide');
      deleteRideButton.addEventListener('click', deleteRide);
      deleteRideButton.rideParam = resp[0].id;


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

//Checks to see if a ride has been opened already, and removes the last ride details before re-populating
function checkCardContent() {

  let rideCardContent = document.querySelectorAll('.rideCardContent');

  if(rideCardContent.length === 0) {
    return;
  } else {
    rideCardContent.forEach(el => el.remove());
  }
}

//BULMA closure of modal box
function modalClose() {
  document.getElementById('rideModal').setAttribute('class', 'modal');
}

//Delete ride that is currently being viewed
function deleteRide(e) {

  let ride = {
    'id': e.target.rideParam
  };

  fetch('http://localhost:3000/deleteRide', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ride)
  })
  .then(response => response.json())
  .then(resp => {
    console.log(resp);
    console.log(e.target.rideParam);
    modalClose();
    removeRideList(e.target.rideParam);
  })
}

function removeRideList(rideId) {
  let rideEl = document.getElementById(rideId);
  rideEl.remove();

  if(document.getElementsByClassName('ride').length === 0) {
    createEmptyRidePanel();
  }
}

function createEmptyRidePanel() {
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

//Create new list of rides
function displayRides(rideNames) {
    if(rideNames.length === 0) {

      createEmptyRidePanel();
      // let rideElAnchor = document.createElement('a');
      // let rideElSpan = document.createElement('span');
      // let rideElI = document.createElement('i');

      // rideElAnchor.setAttribute('class', 'panel-block');
      // rideElAnchor.setAttribute('id', 'noRides');
      // rideElSpan.setAttribute('class', 'panel-icon');
      // rideElI.setAttribute('class', 'fas fa-bicycle');
      // // rideElI.setAttribute('aria-hidden', 'true');

      // let ridePanel = document.getElementById('ridesPanel');

      // ridePanel.append(rideElAnchor);
      // rideElAnchor.append(rideElSpan);
      // rideElSpan.append(rideElI);

      // rideElAnchor.append('You havent created any rides yet...');
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

//BULMA JS to enable burger menu
document.addEventListener('DOMContentLoaded', () => {

  //Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  //Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    //Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        //Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        //Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
});

//Move to Create Ride Page
function createRides() {
  
  window.location.replace("/createRidePage");

}