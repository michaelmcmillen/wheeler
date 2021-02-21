var forename = document.getElementById('nameRegisterInput');
var surname = document.getElementById('surnameRegisterInput');
var email = document.getElementById('emailRegisterInput');
var registerButton = document.getElementById('registerButton');
var password = document.getElementById('passwordRegisterInput');
registerButton.addEventListener('click', register);

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(resp => {
        console.log(checkDuplicateEmail(resp));
        window.location.replace("index.html");
      })
    }
  }
}

function checkValidEmail(emailInput) {
  let pattern = /(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}/;
  let emailBool = pattern.test(emailInput);
  toggleEmailError(emailBool);
  return pattern.test(emailInput);
}

function checkDuplicateEmail(emailCheck) {
  if(emailCheck.includes('already exists')){
    return "Email Already Exists";
  } else {
    return emailCheck;
  }
}

function checkPasswordPattern(passwordInput) {
  let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  let passBool = pattern.test(passwordInput);
  togglePasswordError(passBool);
  return pattern.test(passwordInput);
}

function toggleEmailError(val) {
  if(val === false) {
    document.getElementById('emailError').style.display = 'block';
  }
  else if(val === true) {
    document.getElementById('emailError').style.display = 'none'
  }
}

function togglePasswordError(val) {
  if(val === false) {
    document.getElementById('passwordError').style.display = 'block';
  }
  else if(val === true) {
    document.getElementById('passwordError').style.display = 'none'
  }
}