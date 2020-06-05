const express = require("express");
const router = express.Router();
const  authentification = require('../config/authentification');

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
      res.status(404).send('la page de login n\'est pas trouver');
  }
  });
//afficher la page de profile
router.get('/profile',authentification.auth, (req, res)=>{
  try{
    res.render("profile", 
    {
      nom : req.user.nom, 
      prenom: req.user.prenom
    });
  }catch{
    res.status(404).send('la page de profile n\'est pas trouver');
}
});

//afficher la page d'information
router.get('/information', (req, res)=>{
  try{
    res.render("information");
  }catch{
    res.status(404).send('la page d\'information n\'est pas trouver');
}
});
//afficher la page de test
router.get('/test', (req, res)=>{
  try{
    res.render("test");
  }catch{
    res.status(404).send('la page de test n\'est pas trouver');
}
});
//logout
router.get('/logout',authentification.auth, (req,res)=>{
  req.logout();
  res.redirect('/');
 });

module.exports = router;