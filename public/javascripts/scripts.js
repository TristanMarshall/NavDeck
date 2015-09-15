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
//                             G O O G L E M A P
////////////////////////////////////////////////////////////////////////////////
app.initMap = function(lat, long) {
  console.log('app.initMap started');
  var myLatLng = {lat: lat, lng: long};
  console.log(myLatLng);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatLng,

  });
  google.maps.event.addDomListener(window, 'load', app.initMap);
};

////////////////////////////////////////////////////////////////////////////////
//                     G O O G L E  E L E V A T I O N
////////////////////////////////////////////////////////////////////////////////
// app.log = function(data) {
//   console.log(data);
// }
// app.getDepth = {
//   crossDomain: true,
//   type:'get',
//   url: 'https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536,-104.9847034&key=AIzaSyDcw6FCHiuu8eSlHwGUk5Z0mpSb6OHk-3U',
//   dataType: 'json',
//   xhrFields: {
//
//     withCredentials: false
//   },
//   success: function(elevation) {
//     // $(".weatherStats").append("<hr><span class='current'>Depth : </span>" +  app.long + "<br><br><hr>");
//         console.log(elevation);
//   },
//   error: function(error) {
//     console.log(error);
//   }
// };
// // $(".weatherStats").empty();
// $.ajax(app.getDepth);
////////////////////////////////////////////////////////////////////////////////
//                G O O G L E M A P   G E O L O C A T I O N
////////////////////////////////////////////////////////////////////////////////
// setInterval(function () {
app.geo = function(next) {
  console.log('app.geo started');
  var latitude, longitude;

  function success(pos) {
    var crd = pos.coords;
    app.lat = parseFloat(crd.latitude.toFixed(8));
    app.long = parseFloat(crd.longitude.toFixed(8));
    console.log(crd);
    next(parseFloat(crd.latitude.toFixed(8)), parseFloat(crd.longitude.toFixed(8)));
  }
  function fail(error) {
    console.log("an error has occured: " + error);
  }
  var dt = navigator.geolocation.getCurrentPosition(success, fail, { timeout: 10000 });

  // navigator.geolocation.watchPosition(function(position) {
  // app.latitude = parseFloat(position.coords.latitude.toFixed(2));
  // app.longitude = parseFloat(position.coords.longitude.toFixed(2));
  //   console.log(app.latitude, app.longitude);
  //       currentLatOne.push(app.latitude);
  //       currentLngOne.push(app.longitude);
  // });
  // next();

};
app.geo(app.initMap);
// }, 2000);
////////////////////////////////////////////////////////////////////////////////
//                        W E A T H E R  A P I
////////////////////////////////////////////////////////////////////////////////
setTimeout(function(){

  // var oldData = null
  // function hasNewData(newData) {
  //   if (oldData) {
  //     ret = (oldData.name != newData.name) || (oldData.wind.speed != newData.wind.speed)
  //     oldData = newData
  //     return ret
  //   } else {
  //     oldData = newData
  //     return true
  //   }
  // }

  // setInterval(function () {

    app.getRequest = {

      type:'get',
      url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + app.lat + '&lon=' + app.long,
      dataType: 'json',
      success: function(data) {
          // if (hasNewData(data)) {
            $(".weatherStats").append("<br><hr>" + "<span class='current'>TEMPERATURE : </span>" +  Math.round(data.main.temp * 9/5 - 459.67) + " degrees" + "<br><br>");
            $(".weatherStats").append("<hr><span class='current'>Wind Speed : </span>"  +  Math.round(data.wind.speed * .8689762) + " knots" + "<br><br>");
            $(".weatherStats").append("<hr><span class='current'>Wind Direction : </span>" +  direction(data.wind.deg) + "<br><br>");
            $(".weatherStats").append("<hr><span class='current'>Location : </span>" +  data.name + "<br><br>");
            $(".weatherStats").append("<hr><span class='current'>Latitude : </span>" +  app.lat + "<br><br>");
            $(".weatherStats").append("<hr><span class='current'>Longitude : </span>" +  app.long + "<br><br><hr>");
            console.log(data);
          // }
      },
      error: function(error) {
        console.log(error);
      }
    };
  $(".weatherStats").empty();
  $.ajax(app.getRequest);
  // }, 2000);
}, 5000);
////////////////////////////////////////////////////////////////////////////////
//                    J Q U E R Y  A N I M A T I O N S
////////////////////////////////////////////////////////////////////////////////
$(function () {
    var $element = $('.targ');
    setInterval(function () {
        $element.fadeIn(700).delay(100).fadeOut(500).fadeIn(700);
    }, 1000);
});

$(function () {
    var $element = $('.loadh1');
    setInterval(function () {
        $element.fadeIn(700).delay(100).fadeOut(500).fadeIn(700);
    }, 1000);
});

$('.loadDiv').delay(5000).fadeOut(1000);
// 11000

$('.butt').on('click', function(){
  console.log('Button is working');
  $(".weatherStats").delay(100).empty();

  app.geo(app.initMap);
  $.ajax(app.getRequest);

});
////////////////////////////////////////////////////////////////////////////////
//                E N D  O F  D O C U M E N T . R E A D Y
////////////////////////////////////////////////////////////////////////////////
});
