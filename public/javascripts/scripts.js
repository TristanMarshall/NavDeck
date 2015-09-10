///////////////////////G O O G L E M A P ///////////////////////////////////////
var app = app || {};

function initMap() {
  app.markers = [];
  var myLatLng = {lat: 43.787, lng: -86.531};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: myLatLng
  });

}

google.maps.event.addDomListener(window, 'load', initMap);


/////////////////////// W E A T H E R ///// A P I //////////////////////////////
// var getRequest = {
//   type:'get',
//   url: 'http://api.openweathermap.org/data/2.5/weather?zip=48309,us',
//   dataType: 'json',
//   success: function(data) {
//       $(".weatherStats").append("<span class='current'>The current weather is:</span>" + "<br><br>" +  Math.round(data.main.temp * 9/5 - 459.67) + " degrees, with " + data.weather[0].description);
//       console.dir(data);
//   },
//   error: function(error) {
//     console.log(error);
//
//   }
//
// };
