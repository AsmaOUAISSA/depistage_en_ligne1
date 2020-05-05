let express= require("express");
let app = express();
let path = require("path");
let mysql = require("mysql");
//const fetch  = require("node-fetch");
const dotenv = require("dotenv");
const imp_connection = require("./public/connectiondb");
const connection = mysql.createConnection(imp_connection.connection);

dotenv.config({
  path: "./.env",
})


//tester la connection a la base de donnees
connection.connect ((error) => { 
  if(error){
     console.log("error");
  }else{
     console.log("connecter  avec la base de donnees");
  }
});

// view engine setup
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));
app.engine('html', require('ejs').renderFile);


//afficher le homepage
app.get("/", (req, res) =>{
try{
   res.sendFile(path.join(__dirname, "public", "Accuil.html"));
}catch{
   res.status(404);
}
});

/*app.use(express.static(path.join(__dirname, "public")));
;*/
app.use(express.json());


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

let users = require('./routes/route');
app.use('/route', users);







const port = process.env.PORT || 3000;
app.listen(port, () =>{
   console.log("listening at port "+ port);
});
