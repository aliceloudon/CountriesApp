var countriesArray = [];

var app = function(){
  var url = "https://restcountries.eu/rest/v2/all"
  makeRequest(url, requestComplete);
 var countrySelected = document.querySelector('select')
  countrySelected.onchange = handleSelectChange;
}

var requestComplete = function(){
  if(this.status !== 200) return
  var jsonString = this.responseText
  var countries = JSON.parse(jsonString)
  populateList(countries)
  countriesArray = countries
};

var handleSelectChange = function(){
  var liName = document.querySelector('#country-name')
  var liPopulation = document.querySelector('#country-population')
  var liCapital = document.querySelector('#country-capital')
  var result
  countriesArray.forEach(function(country){
    if(country.name === this.value){
      result= country }  
  }.bind(this))
  liName.innerText = result.name
  liPopulation.innerText = result.population
  liCapital.innerText = result.capital
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