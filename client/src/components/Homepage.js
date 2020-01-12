import React, { useState,useEffect } from 'react';
import callApi from '../service/api';
import {Redirect} from "react-router";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";



function Homepage(){
    const[redirect,setRedirect]=useState(false);
    const[films,setFilm]=useState([])
    const[user,setUser]=useState([])
    function getFilms(){
        let token=sessionStorage.getItem("token");
        callApi.listFilms(token)
            .then(json => {
                setFilm(json.text)
            }).catch(function (error) {
                alert(error);
               setRedirect(true)
            });
    }
    useEffect(() => getFilms(),[]);

    if(redirect===true){
        return <Redirect to="/"/>; 
    }
    return(
        <div>
            <div>Page d'acceuil</div>
       
            {
            films.map((film,index)=>{
            return(
                <div key={index}>
                    Le film {film.title} de la categorie {film.category} produit par le studio {film.studio} , il dure {film.duree} minutes et voici
                    son synopsis:
                    <div className="card">
                        {film.synopsis}
                    </div>
                </div>
            )
            })
            }
            <div>
            <Link className="btn btn-secondary mt-3 mb-4" to="/addFilm/">Envie de créer un film ?</Link>

            </div>
        </div>
    );
}
export default Homepage