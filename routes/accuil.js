const express = require("express");
const router = express.Router();
//affichier la page d'accuil
router.get('/', (req, res) =>{
    try{
        res.render("Accuil");
    }catch{
       res.status(404).send('la page d\'accuil n\'est pas trouver');
    }
 });
 //afficher la page d'inscription
 router.get('/register', (req, res)=>{
    try{
      res.render("register");
    }catch{
      res.status(404).send('la page d\'inscription n\'est pas trouver');
  }
  });
//afficher la page de login
router.get('/login', (req, res)=>{
    try{
      res.render("login");
    }catch{
      res.status(404).send('la page d\'inscription n\'est pas trouver');
  }
  });
//afficher la page de login
router.get('/profile', (req, res)=>{
  try{
    res.render("profile");
  }catch{
    res.status(404).send('la page d\'inscription n\'est pas trouver');
}
});
module.exports = router;