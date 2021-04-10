function authenticateSession() {

    fetch('http://localhost:3000/authSession', {
      credentials: "include"
    })
    .then(response => response.status)
    .then(resp => {
        console.log(resp);
      if(resp === 200) {
          if(window.location.href !== "http://localhost:8080/") {
            if(window.location.href !== "http://localhost:8080/register.html"){
                return;
            }
        }
        else{
        window.location.replace("./dashboard.html");
      }
    }
    else{
        window.location.replace("./index.html");
    }
  
  })
}

window.onload = authenticateSession();