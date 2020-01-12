export default {
    connexion(data) {
      var Mydata = JSON.stringify(data);
      return new Promise((resolve, reject) => {
        fetch("http://localhost:8800/user/login", {
          method: "POST",
          body: Mydata,
          headers: {
            "Content-Type": "application/json"
          }
        }).then(data => {
          data.json().then(json => {
            if (json.status === 200) {
              resolve(json);
            } else {
              reject(json.text);
            }
          });
        });
      });
    },
    newUser(data) {
        return new Promise((resolve, reject) => {
          const jsonBody = JSON.stringify(data);
          fetch("http://localhost:8800/user/signup", {
            method: "POST",
            body: jsonBody,
            headers: {
              "Content-Type": "application/json"
            }
          }).then(data => {
            data.json().then(json => {
            resolve(json)
            }).catch(function (errors) {
              reject(alert("Message non envoye"));
            });
          });
        });
      },
      listFilms(token){
        return new Promise((resolve, reject) => {
          fetch("http://localhost:8800/user/getFilms", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token
            }
          }).then(data => {
            data.json().then(json => {
              resolve(json);
            }).catch(function (errors) {
              reject("Vous n'avez pas l'autorisation");
              console.error(errors);
            });
          });
        });
      },
      
      addFilm(data,token){
        return new Promise((resolve, reject) => {
          const jsonBody = JSON.stringify(data);
          fetch("http://localhost:8800/user/addFilm", {
            method: "POST",
            body: jsonBody,
            headers: {
              "Authorization": "Bearer " + token,
              "Content-Type":"application/json"
            }
          }).then(data => {
            data.json().then(json => {
              resolve(json)
            }).catch(function (errors) {
              reject("Vous n'avez pas l'autorisation");
              console.error(errors);
            });
          });
        });
      },
}