var email = document.getElementById('emailInput');
var password = document.getElementById('passwordInput');
var signInSubmit = document.getElementById('signInButton');
signInSubmit.addEventListener('click', signIn);

//Move to Register page
function registerPage() {
      window.location.replace("/registerPage");
}

//User sign in
function signIn() {

  let user = {
    "email": email.value,
    "password": password.value
  };

  fetch('http://localhost:3000/signIn', {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
  .then(response => response.json())
  .then(resp => {
    if(resp) {
      window.location.replace("/myrides");
    }
    else {
      toggleSignInError(resp)
    }
  })
}

function toggleSignInError(val) {
  if(val === false) {
    document.getElementById('signInError').style.display = 'block';
    document.getElementById('signInErrorEmpty').style.display = 'none';
  }
  else if(val === true) {
    document.getElementById('signInError').style.display = 'none';
  }
  else if(val === null) {
    document.getElementById('signInErrorEmpty').style.display = 'block';
    document.getElementById('signInError').style.display = 'none';
  }

}

//Move to logout page once completed
// function logout() {

//   fetch('http://localhost:3000/logout', {
//     credentials: "include"
//   })
//   .then(response => response.json())
//   .then(resp => {
//     if(resp) {
//       // console.log(resp);
//       window.location.replace("./");
//     }
//     else {
//       toggleSignInError(resp)
//     }
//   })
// }

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