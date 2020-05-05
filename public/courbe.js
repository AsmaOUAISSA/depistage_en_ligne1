   //les varaible global 
   const x = [];//abscisse
   const y= [];//ordonnée
   const y1= [];//ordonnée
   const url = "https://pomber.github.io/covid19/timeseries.json";

  extraireData = async () => {
   //extraire les donnee depuis l'api
     const res = await fetch(url);
   //rendre les sous forme json
      const donnee = await res.json();
   //l'api contient tout les pays pour sa en va prendre just les donnees du maroc
      const  donneemaroc = donnee["Morocco"];
          for(let i=0 ;i<donneemaroc.length;i++){
            const data = donneemaroc[i];
     // mettre les donnees extraire dans un objet pour l'utiliser
            const obj ={date, deaths, recovered} = data; 
     //mettre le valeur de la date et le nombre des mort extrair en des varaible 
        //x qui represent l'abscisse
               x.push(obj.date);
        //y qui represent l'ordonnée
               y.push(obj.deaths);
        //y1  qui represent 2 l'ordonnée
               y1.push(obj.recovered); 
            }
 }

 setTimeout(extraireData, 86400);



//fonction qui permet d'utiliser les donnees extraire dans la fonction extraireData pour dessine la courbe

const  casMort = async (id) => {
  //await permet d'interrompt l'exécution de courbemort et attend le resutat de data 
   const data = await   extraireData();
      var myChart = new Chart(id, {
          type: 'line',
          data: {
               labels: x,
               datasets: [{
                  label: ' Nombres décès par jour',
                  data: y ,
                  borderColor: "#d63031",
                  fill: false,
                  pointBorderWidth: 0.5,
                  pointBackgroundColor: "#d63031",
                  backgroundColor: "#d63031"
               },
               {
                  label: ' Nombres des guérison par jour',
                  data: y1 ,
                  borderColor: "#20bf6b",
                  fill: false,
                  pointBorderWidth: 0.1,
                  pointBackgroundColor: "#20bf6b",
                  backgroundColor: "#20bf6b"
                }]
          },
       options: {
            title: {
               display: true,
               text: 'Totale des cas décédés et guérison au MAROC par jour'
            },
           legend: { display: true }
          }

      });
     
}



