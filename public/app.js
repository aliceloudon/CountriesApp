var countriesArray = [];
var mainMap;

var app = function(){
  var url = "https://restcountries.eu/rest/v2/all"
  makeRequest(url, requestComplete);
  var countrySelected = document.querySelector('select')
  countrySelected.onchange = handleSelectChange;
  var startLocation = { lat: 0, lng: 0 }
  
  var container = document.querySelector('#main-map')
   mainMap = new MapWrapper(container, startLocation, 1)
}

var requestComplete = function(){
  if(this.status !== 200) return
  var jsonString = this.responseText
  var countries = JSON.parse(jsonString)
  populateList(countries)
  countriesArray = countries
};

var handleSelectChange = function(event){
  var liName = document.querySelector('#country-name')
  var liPopulation = document.querySelector('#country-population')
  var liCapital = document.querySelector('#country-capital')
  var result;

  countriesArray.forEach(function(country){
    if(country.name === this.value){
      result = country 
      console.log(country)
      }  
  }.bind(this))

  liName.innerText = "Name: " +result.name
  liPopulation.innerText ="Population: " + result.population
  liCapital.innerText = "Capital: " + result.capital

  var data = JSON.stringify(result)
  localStorage.setItem("selection", data)
  
  var jsonString = localStorage.getItem("selection")
  var location = JSON.parse(jsonString)
  var locationCoords = { lat: location.latlng[0], lng: location.latlng[1] }
  mainMap.googleMap.setCenter(locationCoords)
  mainMap.googleMap.setZoom(5)
  mainMap.addMarker(locationCoords, result.name)
};

var populateList = function(countries){
  var dropDown = document.querySelector('#drop-down')

  countries.forEach(function(country,index){
    var option = document.createElement('option')
    option.innerText = country.name
    option.id = index
    dropDown.appendChild(option)
  })
}


var makeRequest = function(url, callback){
  var request = new XMLHttpRequest()
  request.open("GET", url)
  request.onload = callback
  request.send()
}

window.onload = app