import React, { useState,useEffect } from 'react';
import callApi from '../service/api';
import {Redirect} from "react-router";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


function AddFilm(){
    const [title, setTitle] = useState("");
    const [studio,setStudio]=useState("");
    const [synopsis,setSynopsis]=useState("");
    const [duree,setDuree]=useState("");
    const [category,setCategory]=useState("");
    const [redirect,setRedirect]=useState(false);
    function verifyAuth(){
      console.log(sessionStorage.getItem('token'))
      if(sessionStorage.getItem('token')===null){
        setRedirect("non authentified")
      }
    }
    useEffect(() => verifyAuth(),[]);

    if(redirect=="non authentified"){
      return <Redirect to="/"/>; 

    }
    if(redirect===true){
        return <Redirect to="/homepage"/>; 
    }
    function add(){
        var data = {
            title: title,
            studio: studio,
            synopsis:synopsis,
            duree: duree,
            category:category
          };
        
         
          let token=sessionStorage.getItem("token");
          callApi.addFilm(data,token).then(json => {
            if(json.status!=200){
              alert(json.text)
            }else{
              alert("Le film "+json.title+" a bien été créé en base de donnée .")
              setRedirect(true);
            }
          }).catch(function (error) {
            console.log(error)
            alert(error);
          });
    }

    function handleTitle(text){
      setTitle(text.target.value)
    }
    function handleStudio(text){
      setStudio(text.target.value)
    }
    function handleSynopsis(text){
      setSynopsis(text.target.value)
    }
    function handleDuree(text){
      setDuree(text.target.value)
    }
    function handleCategory(text){
      setCategory(text.target.value)
    }

    return (
      <div className="addFilm">
        <div className="container">
          <h1>Add film</h1>{" "}
          <input type="text" className="input-group mb-3" placeholder="enter title" onChange={text => {
              handleTitle(text);
            }}/>{" "}
          <br/>
          <input type="text" className="input-group mb-3" placeholder="enter studio" onChange={text => {
              handleStudio(text);
            }}/>{" "}
          <br/>
          <textarea className="form-control" placeholder="enter synopsis" onChange={text => {
            handleSynopsis(text);
            }}/>{" "}
          <br/>
          <input type="text" className="input-group mb-3" placeholder="enter durée" onChange={text => {
              handleDuree(text);
            }}/>{" "}
          <br/>
          <input type="text" className="input-group mb-3" placeholder="enter category" onChange={text => {
              handleCategory(text);
            }}/>{" "}
          <br/>
          <button onClick={() => {
              add();
            }}>
            {" "}
            ajouter le film{" "}
          </button>{" "}
          <div>
          <Link className="btn btn-secondary mt-3 mb-4" to="/homepage/">Retour à la liste des films</Link>

          </div>
        </div>
      </div>
    );
}

export default AddFilm;