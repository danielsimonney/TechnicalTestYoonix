//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors=require('cors')
//Connexion à la base de donnée
mongoose
  .connect("mongodb://localhost/db")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });

//On définit notre objet express nommé app
const app = express();
app.use(cors());
require('./config/midleware')(app)
//Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);

app.use(bodyParser.json());

//On définit la route Hello
app.get('/hello',function(req,res){
    res.json("Hello World")
})
//Définition du routeur
const router = express.Router();
app.use("/user", router);
require(__dirname + "/controllers/userController")(router);
//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));
