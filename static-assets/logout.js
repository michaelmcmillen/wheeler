const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logout);

function logout() {

    fetch('http://localhost:3000/logout', {
      credentials: "include"
    })
    .then(response => response.json())
    .then(resp => {
      if(resp) {
        window.location.replace("/");
      }
    })
}