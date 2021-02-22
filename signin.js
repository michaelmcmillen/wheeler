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
          window.location.replace("index.html");
        }
      })
}