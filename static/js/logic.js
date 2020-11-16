var myMap = L.map("map", {
    center: [20, -100],
    zoom: 3
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

function colorChoose(depth) {
    switch (true) {
    case (depth < 5):
      return "yellow";
    case (depth < 10):
      return "orange";
    case (depth < 15):
      return "red";
    case (depth < 20):
      return "purple";
    case (depth < 25):
      return "black";
    default:
      return "green";
    }
  }

d3.json(url, function(response) {

    console.log(response);

    for (var i = 0; i < response.features.length; i++){
        var location = response.features[i].geometry.coordinates;
        var mag = response.features[i].properties.mag
        var magnitud = mag * 10000;
        var place = response.features[i].properties.place

        console.log(location[2])
        if (location){
            L.circle([location[1],location[0]], {
                color: colorChoose(location[2]),
                fillColor: colorChoose(location[2]),
                fillOpacity: 0.5,
                radius: magnitud
              }).bindPopup("<h1>Magnitud: " + mag + "</h1> <hr> <h3>Location: " + place + "</h3>").addTo(myMap)
            
        }
    }
  });