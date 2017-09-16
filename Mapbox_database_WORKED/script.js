
L.mapbox.accessToken = 'pk.eyJ1IjoiamVmZnN0ZXJuIiwiYSI6IlAzRFFiN0EifQ.mNWvayrLEw9wULuq0sopyA';
var map = L.mapbox.map('map', 'mapbox.streets')
  .setView([38.12367, -76.81229], 9);

var myLayer = L.mapbox.featureLayer().addTo(map);
var geojson;
var origjson;

$(document).ready(function(){
    var URL = "1KjhBY_C3m6bmEQik7fJ5FYTwPv86Cq5VXDwXU1AH4Fo";
    Tabletop.init( { key: URL, callback: convertToGeoJSON, simpleSheet: true } )
});

function convertToGeoJSON(data) {
    console.log(data);
    origjson = data;
    places = []
    for(i = 0; i < data.length; i++) {
        console.log(data[i]);
        place = { type: 'Feature',             
        properties: {
                    title: data[i]["name"],
                    description: data[i]["popup"],
                    'marker-color': data[i]["hexcolor"],
                    'marker-size': 'large',
                    'marker-symbol': data[i]["markersymbol"],
                },
                geometry: {
                    type: 'Point',
                    coordinates: [data[i]["long"], data[i]["lat"]]
                }
        }
        
        places.push(place);
    }
    geojson = { type: 'FeaturesCollection', features: places};
    setupMap(geojson);
}


function setupMap(geo) {
    myLayer.setGeoJSON(geo); // Adds all of the points to the map
    map.fitBounds(myLayer.getBounds());
}
