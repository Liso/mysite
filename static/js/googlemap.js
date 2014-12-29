var map;
var geocoder;
var marker = new Array();
function initMap() {
     var homeLatLng = new google.maps.LatLng(49.47805, -123.84716);
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

