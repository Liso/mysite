var map;
var geocoder;
var directionsDisplay;
var directionsDisplays = [];
var directionsService = new google.maps.DirectionsService();
var marker = new Array();
function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
    zoom: 6,
    center: chicago
  }
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  directionsDisplay.setMap(map);
}

function initMap() {
    var latLng = new google.maps.LatLng(49.47805, -123.84716);
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 12,
        center: latLng,
    });
}

function addMarker(address, name, day) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(11);
            var infowindow = new google.maps.InfoWindow({
                content: name
            });
            var newMarker = new MarkerWithLabel({
                position: results[0].geometry.location,
                draggable: false,
                map: map,
                labelContent: day,
                labelAnchor: new google.maps.Point(22, 0),
                labelClass: "labels", // the CSS class for the label
                labelStyle: {opacity: 0.75}
            });

            google.maps.event.addListener(newMarker, 'click', function() {
                infowindow.open(map,newMarker);
            });
            marker[name] = newMarker;

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}


function calcRoute() {
        alert(directionsDisplays.length);
  for (var dir = 0; dir < directionsDisplays.length; dir++) {
        directionsDisplays[i].setMap(null);
  }
  for (var day = 1; day < 24; day++) {
    var places = document.getElementsByClassName(day);
    if (places.length == 0) {
        break;
    } else {

        var polylineOptionsActual = {
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 10
        }; 

        directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true, polylineOptions: polylineOptionsActual});
  var waypts = [];
  for (var i = 1; i < places.length - 1; i++) {
      waypts.push({
          location:places[i].getAttribute("address"),
          stopover:true});
  }

  var request = {
      origin: places[0].getAttribute("address"),
      destination: places[places.length - 1].getAttribute("address"),
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setMap(map);
      directionsDisplay.setDirections(response);
        directionsDisplays.push(directionsDisplay);
/*
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions_panel');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
*/
    }
  });
    }
  }
    alert(directionsDisplays.length);
}
