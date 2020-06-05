  
const mongoose = require('mongoose');
//const conf = require('./databaseconn');
const bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema({
    nom: { 
         type: String,
         required: true
        },
    prenom: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { 
        type: String, 
        required: true 
    }
});
//export model
module.exports =  mongoose.model('User', UserSchema);;
