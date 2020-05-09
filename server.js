let express= require("express");
let app = express();
let path = require("path");
let mysql = require("mysql");
//const fetch  = require("node-fetch");
//let session = require("express-session");
const dotenv = require("dotenv");
const imp_connection = require("./database/connectiondb");
const connection = mysql.createConnection(imp_connection.connection);
var cookieParser = require('cookie-parser');



app.use(express.urlencoded({extended: false}));
app.use(express.json());
//debut cookie
app.use(cookieParser());
/*app.use(cookieSession({
   secret: 'secret',
   resave: false,
   saveUninitialized: true,
   //start cookie
   cookie: cookieSess,
 }));
*/
 

 

//tester la connection a la base de donnees
connection.connect ((error) => { 
  if(error){
     console.log("error");
  }else{
     console.log("connecter  avec la base de donnees");
  }
});

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





//utiliser les route
app.use('/',require('./routes/accuil'));
app.use('/inscri', require('./routes/inscri'));

//connecter ou fichier .env
dotenv.config({
   path: "./.env",
 })
//connecter ou port 
const port = process.env.PORT || 3000;
app.listen(port, () =>{
   console.log("listening at port "+ port);
});
