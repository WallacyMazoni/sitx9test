// start the communication with the platform!
const platform = new H.service.Platform({
    apikey: 'SPvQgljlwTf5wxtpL-7GRoPltebs4i_fZ3iIuUt5Mo4'
}); // here we put the apikey to use the api

// Default options for the base layers that are used to render a map - see documentation
var defaultLayers = platform.createDefaultLayers();

// Call and start of the map, the zoom was set by testing
var map = new H.Map(document.getElementById('map'), 
    defaultLayers.vector.normal.map, {
        zoom: 17,
        center: { lat: -26.920965, lng: -48.675647 } // I used the coordinates of the office
    }
);

// With this event, the window can be resized every time the screen is changed - see documentation
window.addEventListener('resize', () => map.getViewPort().resize());

// call the functions for interate with the map - see documentation
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Creates the default UI components - without this line of command, we don´t have buttons to interact whith the map
var ui = H.ui.UI.createDefault(map, defaultLayers);

//------------------------
var group = new H.map.Group();
map.addObject(group);

//this way we can create de bubbles
group.addEventListener('tap', function (evt) {
            
    var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
        content: evt.target.getData()
    });
    
    ui.addBubble(bubble);
}, false);

// create the markers | i will create de markers for the office and for the Montes Claros.
var officemarker = new H.map.Marker({lat: -26.920965, lng: -48.675647});
officemarker.setData("<div><p>This is the Office of the SITx9!</p></div>");
group.addObject(officemarker);

var montesclarosmarker = new H.map.Marker({lat:-16.772096, lng:-43.840122});
montesclarosmarker.setData("<div><p>Montes Claros - MG</p></div>");
group.addObject(montesclarosmarker);


//-------------------------
// an instance of the routing service
var router = platform.getRoutingService(null, 8);

// Create the parameters for the routing request:
var routingParameters = {
    'routingMode': 'fast',
    'transportMode': 'truck',
    // The start:
    'origin': '-8.3678162,-35.0315702',
    // The end
    'destination': '-23.1019916,-46.9665265',
    // Include the route shape
    'return': 'polyline'
};

// Define a callback function to process the routing response:
var onResult = function(result) {
    // ensure that at least one route was found
    if (result.routes.length) {
        result.routes[0].sections.forEach((section) => {
            let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

            // Create a polyline to display the route:
            let routeLine = new H.map.Polyline(linestring, {
                style: { strokeColor: 'green', lineWidth: 6 }
            });

            // Create a marker for the start point:
            let startMarker = new H.map.Marker(section.departure.place.location);

            // Create a marker for the end point:
            let endMarker = new H.map.Marker(section.arrival.place.location);

            // Add the route polyline
            map.addObjects([routeLine]);

        });
    }
};

router.calculateRoute(routingParameters, onResult, function(error) {
    alert(error.message);
});

//---------------------- Markers (start)

var LocationOfMarker = { lat: -8.3678162, lng: -35.0315702 };

        //resize a PNG to a specific size
        var pngIcon = new H.map.Icon("/scr/start.svg", { size: { w: 56, h: 56 } });
        var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });

        // Adding the marker to the map:
        map.addObject(marker);
        
        //Zooming
        map.setZoom(8);

//---------------------- Markers (start)


var Markerend = { lat: -23.1019916, lng: -46.9665265 };

        var pngIcon = new H.map.Icon("/scr/end.svg.svg", { size: { w: 56, h: 56 } });
        var marker = new H.map.Marker(Markerend, { icon: pngIcon });

        // Adding the marker to the map:
        map.addObject(marker);
        
        //Zooming
        map.setZoom(8);


  // area:
  var circle = new H.map.Circle({lat: -23.089533, lng: -46.949870}, 200000);
  
  // Add the area to the map:
  map.addObject(circle);

  // area:
var circle2 = new H.map.Circle({lat: -8.398104, lng: -46.949870}, 100000);
  
// Add the area to the map:
map.addObject(circle2);

var circle3 = new H.map.Circle({lat: -8.367838, lng: -35.03406}, 1000);
  
// Add the area to the map:
map.addObject(circle3);