const express = require("express");
const router = express.Router();
const inscriCont = require('../controllers/inscri');

router.post('/register', inscriCont.register);
router.post('/login', inscriCont.login);
router.post('/profile',inscriCont.login);

/*router.get('/register', (req, res)=>{
  console.log('qdgb');
  try{
    res.render("register");
  }catch{
    res.status(404).send('la page d\'accuil n\'est pas trouver');
}
});*/
module.exports = router;