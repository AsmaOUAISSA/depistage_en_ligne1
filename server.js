const express= require("express");
const app = express();
const path = require("path");
//const fetch  = require("node-fetch");
const mongoose= require("mongoose");
const passport =require('passport');
const session = require('express-session');
const flash = require("connect-flash")
const dotenv = require("dotenv");



//import passport 
require('./config/passport')(passport);


app.use(express.urlencoded({extended: false}));
app.use(express.json());

//session
app.use(session({
   secret: 'sessionsecret',
   resave: false,
   saveUninitialized: true,
 }))

 app.use(passport.initialize());
 app.use(passport.session());
 app.use(flash());

 // Global variables
 app.use(function(req, res, next) {
   res.locals.error = req.flash('error');
   next();
 });
//connecter ou fichier .env
dotenv.config({
   path: "./.env",
 });

//utiliser les route
app.use('/',require('./routes/accuil'));
//app.use('/', require('./routes/gettestfile'));
app.use('/users', require('./routes/users'));


//connection a la base de donnees
mongoose.set('useCreateIndex', true);
const data = require('./config/connectiondb').mongoosuri;
mongoose.connect(
  data,
{
  useNewUrlParser: true,
  useUnifiedTopology: true 
},
  (error) => { 
    if(error){
       console.log("error");
    }else{
       console.log("connecter  avec la base de donnees MONGOO Atlas");
    }
  }
);




// view engine setup
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
//afficher les fichier static ex: css,images
app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/',async (req, res) => {
   console.log('hello!!!!!!!!!!!!');
    const api_url = 'https://api.thevirustracker.com/free-api?countryTimeline=MA'
   const data = await fetch(api_url);
   if (data != null) {
   const json_data = await data.json();
   res.send(json_data);
   //console.log(api_url);
  }else{
   res.status(404).send('data not found');
  }
})*/







//connecter ou port 
const port = process.env.PORT || 3000;
app.listen(port, () =>{
   console.log("listening at port "+ port);
});
