var forename = document.getElementById('nameRegisterInput');
var surname = document.getElementById('surnameRegisterInput');
var email = document.getElementById('emailRegisterInput');
var registerButton = document.getElementById('registerButton');
var password = document.getElementById('passwordRegisterInput');
registerButton.addEventListener('click', register);

//Register a new user
function register() {

  let user = {
    "name": forename.value,
    "surname": surname.value,
    "email": email.value,
    "password": password.value,
    "joined": new Date()
  };

  if(checkValidEmail(user.email)) {
    if(checkPasswordPattern(user.password)) {
      fetch('http://localhost:3000/register', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(resp => {
        // console.log(checkDuplicateEmail(resp)); //Needs confirming successful
        window.location.replace("myrides.html");
      })
    }
  }
}

//Regex to ensure email is a valid formatted email address
function checkValidEmail(emailInput) {
  let pattern = /(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}/;
  let emailBool = pattern.test(emailInput);
  toggleEmailError(emailBool);
  return pattern.test(emailInput);
}

//Check if email has already been registered
function checkDuplicateEmail(emailCheck) {
  if(emailCheck.includes('already exists')){
    return "Email Already Exists";
  } else {
    return emailCheck;
  }
}

//Regex to ensure password contains a capital letter, number, symbol and is a minimum of 8 characters long
function checkPasswordPattern(passwordInput) {
  let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  let passBool = pattern.test(passwordInput);
  togglePasswordError(passBool);
  return pattern.test(passwordInput);
}

//Display error if email format is not correct
function toggleEmailError(val) {
  if(val === false) {
    document.getElementById('emailError').style.display = 'block';
  }
  else if(val === true) {
    document.getElementById('emailError').style.display = 'none'
  }
}

//Display error if password format is not correct
function togglePasswordError(val) {
  if(val === false) {
    document.getElementById('passwordError').style.display = 'block';
  }
  else if(val === true) {
    document.getElementById('passwordError').style.display = 'none'
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