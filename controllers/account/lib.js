const User = require("../../schema/schemaUser.js");
const passwordHash = require("password-hash");
const Film=require("../../schema/schemaFilm")

async function signup(req, res) {
  const { password, email } = req.body;
  if (!email || !password) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      status:400,
      text: "Requête invalide"
    });
  }
  // Création d'un objet user, dans lequel on hash le mot de passe
  const user = {
    email,
    password: passwordHash.generate(password)
  };
  // On check en base si l'utilisateur existe déjà
  try {
    const findUser = await User.findOne({
      email
    });
    if (findUser) {
      return res.status(400).json({
        status:400,
        text: "L'utilisateur existe déjà"
      });
    }
  } catch (error) {

    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde de l'utilisateur en base
    const userData = new User(user);
    const userObject = await userData.save();
    return res.status(200).json({
      status:200,
      text: "Succès",
      token: userObject.getToken(),
      id:userObject.id
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error });
  }
}

async function login(req, res) {
  const { password, email } = req.body;
  if (!email || !password) {
    //Le cas où l'email ou bien le password ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  try {
    const findUser = await User.findOne({ email });
    if (!findUser)
      return res.status(401).json({
        status:401,
        text: "L'utilisateur n'existe pas"
      });
    if (!findUser.authenticate(password))
      return res.status(401).json({
        status:401,
        text: "Mot de passe incorrect"
      });
    return res.status(200).json({
      status:200,
      token: findUser.getToken(),
      id:findUser.id,
      text: "Authentification réussi"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
}
async function createFilm(req, res){
  const { title, synopsis,duree,studio,category } = req.body;
  if (!title || !synopsis || !studio || !category || !duree) {
    return res.status(400).json({
      status:400,
      text: "Requête invalide"
    });
  }
  const film = {
    title,
    synopsis,
    duree,
    studio,
    category
  };
  try {
    const findFilm = await Film.findOne({
      title
    });
    if (findFilm) {
      return res.status(400).json({
        status:400,
        text: "Le film existe déjà"
      });
    }
  } catch (error) {
console.log(error)
    return res.status(500).json({ error });
  }
  try {

    // Sauvegarde du film en base
    const filmData = new Film(film);
    const filmObject = await filmData.save();
    return res.status(200).json({
      status:200,
      text: "Succès",
      title: filmObject.title,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error });
  }
}

async function getFilms(req, res){
const films=await Film.find();
return res.status(200).json({
  status:200,
  text: films,
});
}

exports.login = login;
exports.signup = signup;
exports.createFilm=createFilm; 
exports.getFilms=getFilms;
