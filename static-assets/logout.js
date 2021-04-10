function logout() {

    fetch('http://localhost:3000/logout', {
      credentials: "include"
    })
    .then(response => response.json())
    .then(resp => {
      if(resp) {
        // console.log(resp);
        window.location.replace("./index.html");
      }
      else {
        toggleSignInError(resp)
      }
    })
  }