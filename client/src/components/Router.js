import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from './Login';
import Signin from './Signin';
import Homepage from './Homepage'
import AddFilm from './AddFilm'
function Routing() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Route exact="exact" path={`/`} component={Login}/>

      <Route exact="exact" path={`/signin`} component={Signin}/>

      <Route exact="exact" path={`/homepage`} component={Homepage}/>

      <Route exact="exact" path={`/addFilm`} component={AddFilm}/>

    </Router>
  );
}
export default Routing
