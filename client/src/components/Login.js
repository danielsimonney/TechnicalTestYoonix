import {Redirect} from "react-router";
import callApi from '../service/api'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import React, { useState } from 'react';

function Connexion() {
    // Declare a new state variable, which we'll call "count"
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [redirect,setRedirect]=useState(false);

    function handleEmail(text){
        setEmail(text.target.value)
    }

    function handlePassword(text){
        setPassword(text.target.value)
    }
    function login(){
        var data = {
            email: email,
            password: password
          };
          callApi.connexion(data).then(json => {
            sessionStorage.setItem('id',json.id)
            sessionStorage.setItem("token", json.token);
           setRedirect(true);
          }).catch(function (error) {
            alert(error);
          });
    }

    if(redirect===true){
        return <Redirect to="/homepage"/>; 
    }
    return (
        <div className="Login">
        <div className="container">
          <h1>Login</h1>{" "}
          <input className="input-group mb-3" type="text" placeholder="enter email" onChange={text => {
              handleEmail(text);
            }}/>{" "}
          <br/>
          <input className="input-group mb-3" type="password" placeholder="enter password" onChange={text => {
              handlePassword(text);
            }}/>{" "}
          <br/>
          <button className="btn btn-primary mt-3 mb-4" onClick={() => {
              login();
            }}>
            {" "}
            Login{" "}
          </button>{" "}
          <div>
          <Link className="btn btn-secondary mt-3 mb-4" to="/signin/">Pas encore de compte , créer en un nouveau</Link>

          </div>
        </div>
      </div>
    );
  }
  export default Connexion;
