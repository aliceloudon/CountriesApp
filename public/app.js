var app = function(){
  var url = "https://restcountries.eu/rest/v2/all"
  makeRequest(url, requestComplete)
}

var requestComplete = function(){
  if(this.status !== 200) return
  var jsonString = this.responseText
  var countries = JSON.parse(jsonString)
  populateList(countries)
}

var populateList = function(countries){
  var dropDown = document.querySelector('#drop-down')

  countries.forEach(function(country){
    var option = document.createElement('option')
    option.innerText = country.name
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