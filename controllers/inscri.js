const bcrypt = require("bcrypt");
const multer = require("multer");
const User = require("../models/User");
const passport = require('passport');
const path = require("path");



exports.register =  async  (req, res, next)=>{
     console.log(req.body);
    const{nom , prenom, email, password, passconf} = req.body;


if(!nom || !prenom || !email || !password || !passconf){
    return res.render('register', {
        message_erreur: 'vous n\'avez pas tapez un champ'
       });
}
if( password != passconf){
    //afficher un message
 return res.render('register', {
     message_erreur: 'Le mot de passe confirmer incorrect'
 });
}
if(password.length < 6){
    return res.render('register', {
        message_erreur: 'Le mot de passe confirmer incorrect'
    });
}
try{
   User.findOne({email: email}).then(user =>{
       if(user){
       res.render('register',{
           message_erreur :'email deja exister'
       });
    }else{
        const nouUser = new User({
            nom,
            prenom,
            email,
            password
        });
        console.log(nouUser);
        
    
    bcrypt.genSalt(10, (error, salt)=> bcrypt.hash(nouUser.password, salt, (error, hash)=>{
        if(error) {
            console.log(error);
        }
        nouUser.password= hash;
        nouUser.save();
        res.render('register', {
            message_succes: 'Vous avez inscrire'
        });
    }))
}
   });

}catch(err){
    res.status(400).send(err);
}

       
}
 

 /*const storage = multer.diskStorage({
     //stocker l'image en images
    destination:'./public/images/',
    filename: (req, file, callback)=>{
       callback(null, file.fieldname + '-' + Date.now()
        + path.extname(file.originalname));
    }
 }) 
 
 //telecharger l'image
 exports.telech = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 
 }).single('pro_image');*/

/*exports.profile = (req, res) =>{
   const nom = this.login.nom;
   console.log(nom);
}*/

