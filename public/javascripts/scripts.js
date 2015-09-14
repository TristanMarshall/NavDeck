////////////////////////////////////////////////////////////////////////////////
//                            N A M E S P A C E
////////////////////////////////////////////////////////////////////////////////

var app = app || {};
var currentLatOne = [];
var currentLngOne = [];

////////////////////////////////////////////////////////////////////////////////
//                       D O C U M E N T . R E A D Y
////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){

////////////////////////////////////////////////////////////////////////////////
//           W I N D / D E G R E E / T E X T   F U N C T I O N
////////////////////////////////////////////////////////////////////////////////

function direction(data) {
  var direct;
  if (data >= 348.75 && data <= 360) {
    direct = "North";
  }
  if (data >= 0 && data <= 11.25){
    direct = "North";
  }
  if (data >= 11.25 && data <= 33.75){
    direct = "North by North East";
  };
  if (data >= 33.75 && data <= 56.25){
    direct = "North East";
  };
  if (data >= 56.25 && data <= 78.75){
    direct = "East by North East";
  };
  if (data >= 78.75 && data <= 101.25){
    direct = "East";
  };
  if (data >= 101.25 && data <= 123.75){
    direct = "East by South East";
  };
  if (data >= 123.75 && data <= 146.25){
    direct = "South East";
  };
  if (data >= 146.25 && data <= 168.75){
    direct = "South by South East";
  };
  if (data >= 168.75 && data <= 191.25){
    direct = "South";
  };
  if (data >= 191.25 && data <= 213.75){
    direct = "South by South West";
  };
  if (data >= 213.75 && data <= 236.25){
    direct = "South West";
  };
  if (data >= 236.25 && data <= 258.75){
    direct = "West by South West";
  };
  if (data >= 258.75 && data <= 281.25){
    direct = "West";
  };
  if (data >= 281.25 && data <= 303.75){
    direct = "West by North West";
  };
  if (data >= 303.75 && data <= 326.25){
    direct = "North West";
  };
  if (data >= 326.25 && data <= 348.75 ){
    direct = "North by North West";
  };
  return direct;
};
////////////////////////////////////////////////////////////////////////////////
//                G O O G L E M A P   G E O L O C A T I O N
////////////////////////////////////////////////////////////////////////////////

var geo = function() {
  var latitude, longitude;
  navigator.geolocation.watchPosition(function(position) {
  app.latitude = parseFloat(position.coords.latitude.toFixed(2));
  app.longitude = parseFloat(position.coords.longitude.toFixed(2));
    console.log(app.latitude, app.longitude);
        currentLatOne.push(app.latitude);
        currentLngOne.push(app.longitude);

  });


};

geo();


////////////////////////////////////////////////////////////////////////////////
//                             G O O G L E M A P
////////////////////////////////////////////////////////////////////////////////

function initMap() {
  var myLatLng = {lat: currentLatOne[0], lng: currentLngOne[0]};
  console.log(myLatLng);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    setCenter: myLatLng
  });
}
google.maps.event.addDomListener(window, 'load', initMap);

////////////////////////////////////////////////////////////////////////////////
//                        W E A T H E R  A P I
////////////////////////////////////////////////////////////////////////////////

var getRequest = {

  type:'get',
  url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + currentLatOne[0] + '&lon=' + currentLngOne[0],
  dataType: 'json',
  success: function(data) {
      $(".weatherStats").append("<br><hr>" + "<span class='current'>TEMPERATURE : </span>" +  Math.round(data.main.temp * 9/5 - 459.67) + " degrees" + "<br><br>");
      $(".weatherStats").append("<hr><span class='current'>Wind Speed : </span>"  +  Math.round(data.wind.speed * .8689762) + " knots" + "<br><br>");
      $(".weatherStats").append("<hr><span class='current'>Wind Direction : </span>" +  direction(data.wind.deg) + "<br><br>");
      $(".weatherStats").append("<hr><span class='current'>City : </span>" +  data.name + "<br><br><hr>");


      console.log(data);


  },
  error: function(error) {
    console.log(error);
  }
};

$.ajax(getRequest);

////////////////////////////////////////////////////////////////////////////////
//                    J Q U E R Y  A N I M A T I O N S
////////////////////////////////////////////////////////////////////////////////

$(function () {
    var $element = $('.targ');
    setInterval(function () {
        $element.fadeIn(700).delay(100).fadeOut(500).fadeIn(700);
    }, 1000);
});


////////////////////////////////////////////////////////////////////////////////
//                E N D  O F  D O C U M E N T . R E A D Y
////////////////////////////////////////////////////////////////////////////////

});
