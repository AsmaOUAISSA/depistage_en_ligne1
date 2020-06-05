const express = require("express");
const router = express.Router();
const inscriCont = require('../controllers/inscri');
//const filesCont = require('../controllers/testFiles');
const passport = require('passport');
router.post('/register', inscriCont.register);
router.post('/login',(req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }
  )(req, res, next);
});

/*router.post('/profile', (req, res)=>{
 inscriCont.telech(req, res, (err)=>{
    if(err){    
      res.redirect('profile');
 }else {
  if(req.file == undefined){
    console.log(req.file);
    res.redirect('profile');

  } else {
    res.render('profile', {
      file: `/images/${req.file.filename}`
    });
          
  }
}
});
})*/
//post des formulaire
/*router.post('/test',filesCont.test);
router.post('/resultat',filesCont.resultat);
router.post('/testSec', filesCont.testSec);
router.post('/testThe', filesCont.testThe);
router.post('/deuQuestionnaire', filesCont.deuQuestionnaire);*/

/*router.post('/profile1',inscriCont.profile);*/
/*router.get('/register', (req, res)=>{
  console.log('qdgb');
  try{
    res.render("register");
  }catch{
    res.status(404).send('la page d\'accuil n\'est pas trouver');
}
});*/

module.exports = router;