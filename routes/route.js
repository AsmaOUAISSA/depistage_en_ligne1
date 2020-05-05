const express = require("express");
const router = express.Router();
const cors = require("cors");
let userdb = require('../public/connectiondb')

router.get('/inscription', function(req, res){
    res.render('inscription');
  });
router.use(cors());
module.exports = router;