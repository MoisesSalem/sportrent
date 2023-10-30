//Declaración de datos
const apiKey ='9600ec29bd0c6237d488cc9c1967d68d';
//Disponibilidad de la geolocalización
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(success);
}else{
 alert("Geolocalización no disponible")
}


function success(geolocationPosition){
console.log(geolocationPosition);
positionData = geolocationPosition.coords; 
var lat = positionData.latitude.toFixed(2);
var lon = positionData.longitude.toFixed(2);
getWheatherStatus(lat,lon);
}

//Función que obtiene los datos de la API
function getWheatherStatus(latitude,longitude){
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+apiKey;
    console.log(url);
    fetch(url)
    .then(data =>{
      return data.json();
    })
    .then(dataJSON => {
    console.log(dataJSON);
    showWeatherData(dataJSON);
    })
    .catch(error => {
      console.error('Error al obtener el clima', error);
    });
}

function showWeatherData(data){
  const {name, main:{temp}, weather:[array]} = data;
  const degrees = kelvinToCentigrade(temp);
  console.log(degrees);
  var tempIcon = 'https://openweathermap.org/img/wn/'+array.icon+'@2x.png';
  var cityName = document.getElementById("city-name");
  var temperature = document.getElementById("temp");
  var temperatureIcon = document.getElementById("icon-temp");

  temperatureIcon.src = tempIcon;
  cityName.textContent = name;
  temperature.textContent = degrees+' C°';
}

function kelvinToCentigrade(temp){
  var centigrade = temp - 273.15;
  return centigrade.toFixed(0);
}