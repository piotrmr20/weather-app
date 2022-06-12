let url = new URL("https://www.wowapi.pl/pogoda/prognoza?miasto=");  // declaration of variables 
let list1 = document.querySelector("#list-cities");
let inputField = document.querySelector("#choose-city");
let arrCities = [];
let loader = document.querySelector(".loader");
let actualCity = document.querySelector("#actualCity");

window.onload = loadCitiesNames; // Loading Json file from API containing list of cities when app starts 

function loadCitiesNames() {

    loader.style.visibility = "visible";

    async function fetchCitiesBadStatus() {
        const response = await fetch('https://www.wowapi.pl/pogoda/miasta');
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const cities = await response.json();
        return cities;
    }
    fetchCitiesBadStatus().catch(error => {
        let err = error.message; 'An error has occurred: 404'
        alert(`${err}`);

        // console.error(`Error fetching data ${response.status}`);
    });

    fetchCitiesBadStatus().then(unpackCitiesName);

}

function unpackCitiesName(citiesDataJson) {
    for (let i = 0; i < citiesDataJson.length; i++) {     //loop through the JSON file and pushing cities to the array
        arrCities.push(citiesDataJson[i].nazwa);
    }

    for (let j = 0; j < arrCities.length; j++) {                //loop creating datalist option for each city
        let option1 = document.createElement('option');
        option1.value = arrCities[j];
        list1.appendChild(option1);
    }
    loader.style.visibility = "hidden";
}

inputField.addEventListener("change", function () {         //event listener for change input field
    url.searchParams.set('miasto', inputField.value);
    loader.style.visibility = "visible";
    actualCity.innerHTML = inputField.value; 
    //function attaching choosen city to the URL declared

    setTimeout(clearingInputField, 1000);
    function clearingInputField() {
        inputField.value = " ";
    }

    setTimeout(downloadWeatherForecastData, 1500);
});

function downloadWeatherForecastData() {

    async function fetchDownloadWeatherForecastDataBadStatus() {
        const response2 = await fetch(url);
        if (!response2.ok) {
            const message2 = `An error has occured: ${response2.status}`;
            throw new Error(message2);
        }
        const weatherJSON2 = await response2.json();
        return weatherJSON2;
    }
    fetchDownloadWeatherForecastDataBadStatus().catch(error2 => {
        let err2 = error2.message2; 'An error has occurred: 404'
        alert(`${err2}`);
    });

    fetchDownloadWeatherForecastDataBadStatus().then(unpackWeatherForecastData);

}

function unpackWeatherForecastData(weatherJSON) {

    loader.style.visibility = "hidden";

    let nowIMG = document.querySelector(".image1");
    let tomorrowIMG = document.querySelector(".image2");
    let dayAfterTomorrow = document.querySelector(".image3");

    document.querySelector(".temp1").innerHTML = (weatherJSON.teraz.temperatura);
    document.querySelector(".description1").innerHTML = (weatherJSON.teraz.opis);
    document.querySelector(".clouds1").innerHTML = (weatherJSON.teraz.zachmurzenie);
    document.querySelector(".windDirection1").innerHTML = (weatherJSON.teraz.wiatrKierunekSłownie);
    document.querySelector(".windIMG1").style.transform = `rotate(${weatherJSON.teraz.wiatrKierunek}deg)`

    document.querySelector(".temp2").innerHTML = (weatherJSON.prognoza.jutro.temperatura);
    document.querySelector(".description2").innerHTML = (weatherJSON.prognoza.jutro.opis);
    document.querySelector(".clouds2").innerHTML = (weatherJSON.prognoza.jutro.zachmurzenie);
    document.querySelector(".windDirection2").innerHTML = (weatherJSON.prognoza.jutro.wiatrKierunekSłownie);
    document.querySelector(".windIMG2").style.transform = `rotate(${weatherJSON.prognoza.jutro.wiatrKierunek}deg)`

    document.querySelector(".temp3").innerHTML = (weatherJSON.prognoza.pojutrze.temperatura);
    document.querySelector(".description3").innerHTML = (weatherJSON.prognoza.pojutrze.opis);
    document.querySelector(".clouds3").innerHTML = (weatherJSON.prognoza.pojutrze.zachmurzenie);
    document.querySelector(".windDirection3").innerHTML = (weatherJSON.prognoza.pojutrze.wiatrKierunekSłownie);
    document.querySelector(".windIMG3").style.transform = `rotate(${weatherJSON.prognoza.pojutrze.wiatrKierunek}deg)`

    function weatherImage() {
        if ((weatherJSON.teraz.ikonka) === "burza") {
            nowIMG.innerHTML = "<img src='img/burza.png'>";
        } else if ((weatherJSON.teraz.ikonka) === "chmury1") {
            nowIMG.innerHTML = "<img src='img/chmury1.png'>";
        } else if ((weatherJSON.teraz.ikonka) === "chmury2") {
            nowIMG.innerHTML = "<img src='img/chmury2.png'>";
        } else if ((weatherJSON.teraz.ikonka) === "chmury3") {
            nowIMG.innerHTML = "<img src='img/chmury3.png'>";
        } else if ((weatherJSON.teraz.ikonka) === "deszcz1") {
            nowIMG.innerHTML = "<img src='img/deszcz1.png'>";
        } else if ((weatherJSON.teraz.ikonka) === "deszcz2") {
            nowIMG.innerHTML = "<img src='img/deszcz2.png'>";
        } else if ((weatherJSON.teraz.ikonka) === "mgla") {
            nowIMG.innerHTML = "<img src='img/mgla.png'>";
        } else if ((weatherJSON.teraz.ikonka) === "slonce") {
            nowIMG.innerHTML = "<img src='img/slonce.png'>";
        } else if ((weatherJSON.teraz.ikonka) === "snieg") {
            nowIMG.innerHTML = "<img src='img/snieg.png'>";
        }

        if ((weatherJSON.prognoza.jutro.ikonka) === "burza") {
            tomorrowIMG.innerHTML = "<img src='img/burza.png'>";
        } else if ((weatherJSON.prognoza.jutro.ikonka) === "chmury1") {
            tomorrowIMG.innerHTML = "<img src='img/chmury1.png'>";
        } else if ((weatherJSON.prognoza.jutro.ikonka) === "chmury2") {
            tomorrowIMG.innerHTML = "<img src='img/chmury2.png'>";
        } else if ((weatherJSON.prognoza.jutro.ikonka) === "chmury3") {
            tomorrowIMG.innerHTML = "<img src='img/chmury3.png'>";
        } else if ((weatherJSON.prognoza.jutro.ikonka) === "deszcz1") {
            tomorrowIMG.innerHTML = "<img src='img/deszcz1.png'>";
        } else if ((weatherJSON.prognoza.jutro.ikonka) === "deszcz2") {
            tomorrowIMG.innerHTML = "<img src='img/deszcz2.png'>";
        } else if ((weatherJSON.prognoza.jutro.ikonka) === "mgla") {
            tomorrowIMG.innerHTML = "<img src='img/mgla.png'>";
        } else if ((weatherJSON.prognoza.jutro.ikonka) === "slonce") {
            tomorrowIMG.innerHTML = "<img src='img/slonce.png'>";
        } else if ((weatherJSON.prognoza.jutro.ikonka) === "snieg") {
            tomorrowIMG.innerHTML = "<img src='img/snieg.png'>";
        }

        if ((weatherJSON.prognoza.pojutrze.ikonka) === "burza") {
            dayAfterTomorrow.innerHTML = "<img src='img/burza.png'>";
        } else if ((weatherJSON.prognoza.pojutrze.ikonka) === "chmury1") {
            dayAfterTomorrow.innerHTML = "<img src='img/chmury1.png'>";
        } else if ((weatherJSON.prognoza.pojutrze.ikonka) === "chmury2") {
            dayAfterTomorrow.innerHTML = "<img src='img/chmury2.png'>";
        } else if ((weatherJSON.prognoza.pojutrze.ikonka) === "chmury3") {
            dayAfterTomorrow.innerHTML = "<img src='img/chmury3.png'>";
        } else if ((weatherJSON.prognoza.pojutrze.ikonka) === "deszcz1") {
            dayAfterTomorrow.innerHTML = "<img src='img/deszcz1.png'>";
        } else if ((weatherJSON.prognoza.pojutrze.ikonka) === "deszcz2") {
            dayAfterTomorrow.innerHTML = "<img src='img/deszcz2.png'>";
        } else if ((weatherJSON.prognoza.pojutrze.ikonka) === "mgla") {
            dayAfterTomorrow.innerHTML = "<img src='img/mgla.png'>";
        } else if ((weatherJSON.prognoza.pojutrze.ikonka) === "slonce") {
            dayAfterTomorrow.innerHTML = "<img src='img/slonce.png'>";
        } else if ((weatherJSON.prognoza.pojutrze.ikonka) === "snieg") {
            dayAfterTomorrow.innerHTML = "<img src='img/snieg.png'>";
        }
    } (weatherImage());
}