var latt;
var long;
var elevation;
var cityName;
var floodimage;


function UpdateDisplay() {
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  console.log(latt, long, elevation);
  $("<tr><td>" + cityName + "</td><td>" + latt +" , "+long+ "</td><td>" + elevation + " feet</td></tr>").prependTo("tbody");
};

function WeatherMapAPI() {
  var WMAPIquery = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=95bdc5084ebe0a4fc6446275aa22aabb";
  $.ajax({
    url: WMAPIquery,
    method: "GET"
  })
    .then(function (response) {

      latt = response.coord.lat;
      long = response.coord.lon;
      initialize(latt, long);
      elevationAPI();
    })
    .catch(function(){
      console.log("didnt work");
    })
};

function elevationAPI(){
  
  var EAPIquery = "https://elevation-api.io/api/elevation?points=(" +latt +","+long +")&key=a3MU4-erx2e7Geb2370r9663ORx-82";
  $.ajax({
    url: EAPIquery,
    method: "GET"
  })
  .then(function(result){
    elevation = result.elevations[0].elevation
    console.log(elevation);
  })
};

function initialize(lat, lng) {
  var userChosenLocation = { lat: lat, lng: lng };
  var panorama = new google.maps.StreetViewPanorama(
    document.getElementById("mapdrop"), {
      position: userChosenLocation,
      pov: {
        heading: 34,
        pitch: 10
      }
    });
};
$("#flood-water").hide();

$("#city-search").on("click", function (event) {
  event.preventDefault();
  $("#flood-water").hide();
  cityName = $("#location-search").val();
  WeatherMapAPI();
  setTimeout(function() { UpdateDisplay(); }, 1000);
});


$("#sea-level-btn").on("click", function (event) {
  event.preventDefault();
  seaLevelRise = $("#sea-level").val();
  Flood = elevation - seaLevelRise;

  if (elevation > seaLevelRise){
    //enter text into div saying that the elevation is above sea by x feet
  }
  else if (elevation==seaLevelRise){
    //enter text into div saying that the water would be the same as the gorund level, but not flooded
  }
  else{
    $("#flood-water").show();
    //enter text into div saying that the elevation is below sea level by x feet
  }
});