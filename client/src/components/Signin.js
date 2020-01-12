import {Redirect} from "react-router";
import callApi from '../service/api'
import React, { useState } from 'react';

function Signing() {
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("")
    const [redirect,setRedirect]=useState(false);
    function handleEmail(text){
        setEmail(text.target.value)
    }
    function handleConfirmationPassword(text){
        setConfirmPassword(text.target.value)
    }

    function handlePassword(text){
        setPassword(text.target.value)
    }
    function signin(){
        if(password!==confirmPassword){
            alert("Le mot de passe et la confirmation du mot de passe doivent être les mêmes !")
            return '';
        }
        var data = {
            email: email,
            password: password

          };
          callApi.newUser(data).then(json => {
            sessionStorage.setItem("token", json.token);
            sessionStorage.setItem("id",json.id)
           setRedirect(true);
          }).catch(function (error) {
            alert(error);
          });
    }

    if(redirect===true){
        return <Redirect to="/homepage"/>; 
    }
    return (
        <div className="signin">
        <div className="container">
          <h1>Create a new user</h1>{" "}
          <input  className="input-group mb-3" type="text" placeholder="enter email" onChange={text => {
              handleEmail(text);
            }}/>{" "}
          <br/> 
          
          <input  className="input-group mb-3" type="password" placeholder="enter password" onChange={text => {
              handlePassword(text);
            }}/>{" "}
          <input className="input-group mb-3" type="password" placeholder="enter confirmation pasword" onChange={text => {
              handleConfirmationPassword(text);
            }}/>{" "}
         
          <br/>
          <button  className="btn-primary" onClick={() => {
              signin();
            }}>
            {" "}
            Login{" "}
          </button>{" "}
        </div>
      </div>
    );


}

export default Signing