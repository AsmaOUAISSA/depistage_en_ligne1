const abx = [];//abscisse
const ory= [];//ordonnée
const url_api = "https://pomber.github.io/covid19/timeseries.json";

 extraireDataConfirme = async () => {
   //extraire les donnee depuis l'api
     const resulta = await fetch(url_api);
   //rendre les sous forme json
      const datajson = await resulta.json();
   //l'api contient tout les pays pour sa en va prendre just les donnees du maroc
      const  donneemaroc = datajson["Morocco"];
          for(let i=0 ;i<donneemaroc.length;i++){
            const data = donneemaroc[i];
     // mettre les donnees extraire dans un objet pour l'utiliser
            const obj ={date, confirmed} = data; 
        //mettre le valeur de la date et le nombre des mort extrair en des varaible 
        //abx qui represent l'abscisse
               abx.push(obj.date);
        //ory qui represent l'ordonnée
               ory.push(obj.confirmed);    
            }
 }
 setTimeout(extraireDataConfirme, 86400); 

//fonction qui permet d'utliser les donnees extraire dans la fonction extraireDataConfirme pour dessine la courbe

const  casConfirmer = async (id) => {
  //cette varaible permet d'interrompt l'exécution de courbemort et attend le resutat de data 
   const data = await   extraireDataConfirme();
      var myChart = new Chart(id, {
          type: 'bar',
          data: {
               labels: abx,
               datasets: [{
                  label: ' Nombres des cas confirmé de covid-19',
                  data: ory ,
                  borderColor: "#B33771",
                  backgroundColor:"#B33771",
                  fill: false,
               }]
          },
       options: {
            title: {
               display: true,
               text: 'Totale des cas comfirmé au MAROC par jour'
            },
           legend: { display: true }
          }
      });
}


