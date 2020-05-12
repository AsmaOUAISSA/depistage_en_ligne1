const express = require("express");
const router = express.Router();
const inscriCont = require('../controllers/inscri');

router.post('/register', inscriCont.register);
router.post('/login', inscriCont.login);
router.post('/profile',inscriCont.login);
router.post('/profile1', (req, res)=>{
 inscriCont.telech(req, res, (err)=>{
    if(err){    
      res.render('profile',{
      msg: err
  });
 }else {
  if(req.file == undefined){
    console.log(req.file);
    res.render('profile');

  } else {
    res.render('profile', {
      file: `/images/${req.file.filename}`
    });
          
  }
}
});
})

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