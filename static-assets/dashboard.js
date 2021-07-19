// let logoutButton = document.getElementById('logoutButton');
// logoutButton.addEventListener('click', logout);
let createRideButton = document.getElementById('createRide');
createRideButton.addEventListener('click', createRides);

function getRides() {

    fetch('http://localhost:3000/getRides', {
      credentials: "include"
    })
    .then(response => response.json())
    .then(resp => {
      if(resp) {
        displayRides(resp);
        displayName(resp)
      }
      else {
        toggleSignInError(resp)
      }
    })
  }

window.onload = getRides();

function displayRides(rideNames) {
    rideNames.forEach(ride => {
        let rideElAnchor = document.createElement('a');
        let rideElSpan = document.createElement('span');
        let rideElI = document.createElement('i');

        rideElAnchor.setAttribute('class', 'panel-block');
        // rideElSpan.setAttribute('class', 'panel-icon');
        // rideElI.setAttribute('class', 'fas fa-book');
        // rideElI.setAttribute('aria-hidden', 'true');

        let ridePanel = document.getElementById('ridesPanel');

        ridePanel.append(rideElAnchor);
        // rideElAnchor.append(rideElSpan);
        // rideElSpan.append(rideElI);

        rideElAnchor.append(ride.name);

    });
}

function displayName(rideNames) {

  let dashboardTitle = document.getElementById('nameTitle');
  dashboardTitle.append('Hello ' + rideNames[0].firstname + '!');

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

function createRides() {

  window.location.replace("/createRidePage");

  // fetch('http://localhost:3000/createRidePage', {
  //   credentials: "include"
  // })
  // .then(response => response.json())
  // .then(resp => {
  //   if(resp) {

  //   }
  //   else {
  //   }
  // })
}