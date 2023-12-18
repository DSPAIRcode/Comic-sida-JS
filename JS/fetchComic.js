var maxComic= -1;
var currentComic= -1;

window.onload = function(){

getComic("latest");

knappar();
}

function getComic(which){ //(1) 
    fetch("http://xkcd.vercel.app/?comic="+which)
    .then(function(response){
        if(response.status==200){
            return response.json();
        }
    })
    .then(function(data){
        currentComic=data.num;
        if (maxComic < data.num){
            maxComic=data.num;
        }
        appendComic(data);
    })
}

function appendComic(data){ //(2)
    console.log(data);
    let mainComic = document.getElementById("mainComic");   // Hämtar ett DOM-element med ID "mainComic" Detta är det element där innehållet kommer att visas.
    mainComic.innerHTML = "";

    let titel = document.createElement("H1");   // Skapar ett nytt HTML-element <h1> för att visa titeln på serien.
    titel.innerHTML = data.title;                   // Sätter innehållet i <h1>-elementet till titeln från data-objektet.
                                                    // data.title innehåller seriens titel som vi fått från API-svaret.

    mainComic.appendChild(titel);

    let comicDate = new Date(data.year, data.month - 1, data.day); //(3)
    let datum = document.createElement("p");
    datum.innerHTML = "Datum: " + comicDate.toLocaleDateString("sv-SE");
    mainComic.appendChild(datum);


    let img = document.createElement("img");    //(4)
    img.src = data.img;
    img.alt = data.title;
    mainComic.appendChild(img);

    let serienummer = document.createElement("p");
    serienummer.innerHTML = "Serienummer: " + data.num;
    mainComic.appendChild(serienummer);

    /*
    titel
    datum skapad med ett js date object
    HTML figure element med img och caption, caption ska innehålla num för serien
    */
}


function knappar(){

    document.getElementById("forsta").addEventListener("click", () => getComic(1));
    document.getElementById("nasta").addEventListener("click", () => getComic(currentComic+1));
    document.getElementById("slumpa").addEventListener("click", () => getComic(Math.floor(Math.random() * maxComic) + 1));
    document.getElementById("forra").addEventListener("click", () => getComic(currentComic-1));
    document.getElementById("sista").addEventListener("click", () => getComic("latest"));
}

/*
(1): denna funktion kommer att hämta datan från XKCD sidan... längre ner i koden

(2): appendcomic är en function som kommer att visa själva innehåller från sidan XKCD

(3): Skapar ett nytt Date-objekt med år, månad och dag från data-objektet. sen gör den en element med P tag
     sen har jag laggt ToLocalDateString för att få den lokala tiden på datorn till svenska

(4): Denna kod skapar och visar en comic på en webbsidan genom att generera och lägga till en bild
     och textelement som representerar seriens bild, titel och nummer i ett HTML element.


Vad händer i koden steg för steg?

/*  1. Skriver ut datan som hämtats från API:et i webbläsarens konsol.

    2. Hämtar ett element från HTML-dokumentet som har ID 'mainComic'.

    3. Skapar ett nytt <h1>-element för att visa seriens titel.

    4. Sätter innehållet (innerText) i det skapade <h1>-elementet till titeln från datan.
    
    5. Lägger till det skapade <h1>-elementet som ett barn till elementet med ID 'mainComic'.

    6. Skapar ett nytt Date-objekt med år, månad och dag från datan.

    7. Skapar ett nytt <p>-element för att visa publiceringsdatumet.

    8. Ställer in innehållet i <p>-elementet till datumet, omformat till en svensk lokaliserad sträng.

    9. Lägger till det skapade <p>-elementet för datumet till elementet med ID 'mainComic'.

    10. Skapar ett nytt <img>-element för att visa seriens bild.

    11. Sätter källan (src) för bilden till URL:en från datan och ett alternativt textvärde (alt).

    12. Lägger till det skapade <img>-elementet till elementet med ID 'mainComic'.

*/