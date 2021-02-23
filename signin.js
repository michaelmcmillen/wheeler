var email = document.getElementById('emailInput');
var password = document.getElementById('passwordInput');
var signInSubmit = document.getElementById('signInButton');
signInSubmit.addEventListener('click', signIn);

function signIn() {

  let user = {
    "email": email.value,
    "password": password.value
  };

  fetch('http://localhost:3000/signIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
  .then(response => response.json())
  .then(resp => {
    if(resp) {
      console.log(resp);
      // window.location.replace("index.html");
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