const mysql = require("mysql");
const imp_connection = require("../database/connectiondb");
const connection = mysql.createConnection(imp_connection.connection);
const jsonwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.register = (req, res) => {
    console.log(req.body);

    const {nom, prenom, email, pass, passconf} = req.body; 
// selectionner depuis users email où ce email là egale a email taper 
    connection.query(" SELECT email FROM users WHERE email = ? ", [email], async (error, result) =>{
        
        if(error){
            return error; 
        }
        //si un email a ete slectionner 
       if(result.length > 0){
           //afficher un message 
           return res.render('register', {
            message_erreur: 'Ce email déjà exister'
           });
       
        }
        //sinon si le mot de passe != de motde passe confirmer
       else if( pass !== passconf){
           //afficher un message
        return res.render('register', {
            message_erreur: 'Le mot de passe confirmer incorrect'
        });
       }
       //sinon crypter le mot de passe
    let hashPass = await bcrypt.hash(pass, 8);
    //inserer les information taper par l'utilisateur avec le pass crypter
    connection.query("INSERT INTO users SET ?", {nom:nom, prenom: prenom, email: email, password: hashPass }, (error, result)=>{
        if(error){
            console.log(error);
        }else{
        
            return res.render('register', {
                message_succes: 'Vous avez inscrire'
            });
        }
    })
    });
}
exports.login = async  (req, res) => {
    try{
     const{ email, pass } = req.body;
      //si input de email empty ou de mot de passe
     if(!email || !pass){
         return res.status(400).render('login', {
             message_erreur : "vous n'avez pas tapez le mot de passe ou email"
         })
     }
     //selecter depuis la table users où email =  a email tapez par l'utilisateur
     connection.query("SELECT * FROM users WHERE email = ?", [email] , async (error, result)=>{
         //si il ne select aucun resulta ou le mot de passe ecrire!= de le mot de passe selecter
         if(!result || !(await bcrypt.compare(pass, result[0].password))){
             //afficher un erreur
            res.status(401).render('login',{
                message_erreur: "Email ou mot de passe n'est pas correct"
            }) 
         }else{
             //extraire id depuis result
             const id = result[0].id;
             //cree un jeton correspondant a id qui va etre expirer apres expiresin
             const token = jsonwt.sign({id}, process.env.JWT_SECRET, {
                 expiresIn: process.env.JWT_EXPIRES_IN
             });
            //cree un cookie
             const cookie = {
                 expires: new Date(
                     Date.now() + process.env.JWT_Cookie_EXPIRES * 24 * 60 * 60 * 1000
                 ),
                 //proteger le token 
                 httpOnly: true
             } 
             //définir le jeton comme un cookie et donner le un nom cookie
             res.cookie('cookie', token, cookie);
             //returner a la page d'accuil
             res.status(200).render('profile', {
                nom : result[0].nom,
                prenom : result[0].prenom,
            }) 
         }
     });
    }catch(error){
        console.log(error);
    }
}
/*exports.profile = (req, res) =>{
   const nom = this.login.nom;
   console.log(nom);
}*/