// declaring global variables
var map;
var infoWindow;
var bounds;

//Set up Maps
// google maps initialize
function initializeMap() {
    // Based on Google Maps API documentation
    var mapOptions = {
        //Set base
        center: {
            lat: 37.797093,
            lng: -122.423218
        },
        zoom: 15,

        //Set Google Map Style. Based on : https://snazzymaps.com/style/125057/apple-tweak
        styles: [{
                "featureType": "landscape.man_made",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f7f1df"
                }]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#d0e3b4"
                }]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "simplified"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#bde6ab"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffe15f"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#efd151"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "black"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#a2daf2"
                }]
            }
        ],

        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    bounds = new google.maps.LatLngBounds();
    infoWindow = new google.maps.InfoWindow({
        maxWidth: 150})
        ;
    ko.applyBindings(new ViewModel());

    // Dismiss infoWindow with out of bound click
    map.addListener("click", function() {
        infoWindow.close(infoWindow);
        //Reset map to center
        map.fitBounds(bounds);
    });

    // Reset map to center upon window resize
    window.onresize = function() {
        map.fitBounds(bounds);
    };
}


// handle map error
function mapRenderError() {
    alert('An error occurred with Google Maps! Please check your connection and/or firewall settings');
}

//Toggle bouncing for marker : Refer Google Maps API docs

function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 1400);
    }
}


/* Point of interest location Model */
var poiMarker = function(data) {
    var self = this;

    // Title : to set DOM
    // Postion : to use in API call
    this.title = data.title;
    this.position = data.location;
    this.venueId = this.visible = ko.observable(true);

    // Build a request URL for JSON request of foursquare data
    var request = endpointBaseUrl +
                    '/search?ll=' +
                    this.position.lat +
                    ',' +
                    this.position.lng +
                    '&client_id=' +
                    foursquareClientID + '&client_secret=' +
                    foursquareClientSecret +
                    '&v=' + foursquareApiVersion +
                    '&query=' + this.title;

    // Make a GET Call and parse request to get Venue ID
    // We will pass it along to the renderInfoWindow function to make another API call 
    $.getJSON(request).done(function(data) {
        var results = data.response.venues[0];
        self.venueId = results.id ? results.id : 'N/A';
    }).fail(function() {
        alert('Oops... Foursquare is not responding. Please check your internet connection and/or firewall and try later');
    });

    // Using each location's position, create marker 
    this.marker = new google.maps.Marker({
        position: this.position,
        // Title is set here to set up the DOM. 
        // It won't be used for display on infoWindow. InfoWindow uses separate API calls
        title: this.title,
        animation: google.maps.Animation.DROP,
        icon: iconImage
    });

    self.filterMarkers = ko.computed(function() {
        // set marker and extend bounds
        if (self.visible() === true) {
            self.marker.setMap(map);
            bounds.extend(self.marker.position);
            map.fitBounds(bounds);
        } else {
            self.marker.setMap(null);
        }
    });

    // Open infoWindow for each marker onClick
    this.marker.addListener('click', function() {
        toggleBounce(this);
        renderInfoWindow(this, self.venueId, infoWindow);
        map.panTo(this.getPosition());
        //Adjusting view points so that Info window is not clipped
        map.panBy(0, -200);
    });

    // show item info when selected from list
    // This is bound to the venueList in index.html. Clicking on the list item will pass on a click to the corresponding marker on the map
    this.show = function(location) {
        google.maps.event.trigger(self.marker, 'click');
    };

};

/* View Model setup*/
var ViewModel = function() {

    var self = this;
    this.mapList = ko.observableArray([]);
    
    // Refer stack overflow : https://stackoverflow.com/questions/39799600/how-to-use-knockoutjs-click-binding-to-create-a-hamburger-menu
    this.hamburgerVisible = ko.observable(false);
    this.showHamburgerMenu = function () {
        this.hamburgerVisible(!this.hamburgerVisible());
    };

    // add location markers for each location into the array
    locations.forEach(function(location) {
        self.mapList.push(new poiMarker(location));
    });

    this.filterItem = ko.observable('');
    // locations viewed on map
    this.venueList = ko.computed(function() {
        var filter = self.filterItem().toLowerCase();
        if (filter) {
            return ko.utils.arrayFilter(self.mapList(), function(location) {
                var str = location.title.toLowerCase();
                var result = str.includes(filter);
                location.visible(result);
                return result;
            });
        }
        self.mapList().forEach(function(location) {
            location.visible(true);
        });
        return self.mapList();
    }, self);
};


// this function populates the Info Window
// Another call is made to the Places API in Foursquare to get best image and short Url for Foursquare
// Foursquare API has 2 separate calls for 
// 1. Search : Based on the name and location, get the Foursquare ID 
// 2. Details : Based on the foursquare ID, get the details (image, URL) of a venue
// 2nd API call is made only on clicking marker
function renderInfoWindow(marker, venueId, infowindow) {

    // Check to make sure the infowindow is not yet open.
    if (infowindow.marker != marker) {
        // Clear infoWindow before setting new value, since it is a Global var
        infowindow.setContent('');
        infowindow.marker = marker;

        // clear marker if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
            map.fitBounds(bounds);
        });

        // Construct the venueRequest to get details on the venue
        var venueRequest = endpointBaseUrl +
                            venueId +
                            "?" +
                            '&client_id=' + foursquareClientID +
                            '&client_secret=' + foursquareClientSecret +
                            '&v=' + foursquareApiVersion;

        // Get call to get JSON response with venue details
        $.getJSON(venueRequest).done(function(data) {
            var venueResults = data.response;

            var imageUrl = venueResults.venue.bestPhoto.prefix + "height150" +
                venueResults.venue.bestPhoto.suffix;
            var shortUrl = venueResults.venue.shortUrl ? venueResults.venue.shortUrl : "(Not Found)";
            var name = venueResults.venue.name ? venueResults.venue.name : "(Not Found)";
            var street = venueResults.venue.location.formattedAddress[0] ? venueResults.venue.location.formattedAddress[0] : "(Not Found)";
            var city = venueResults.venue.location.formattedAddress[1] ? venueResults.venue.location.formattedAddress[1] : "(Not Found)";
            var phone = venueResults.venue.contact.formattedPhone ? venueResults.venue.contact.formattedPhone : "(Not Found)";

            infoWindowContent = "<div class='scrollFix' id='info-window-content'>" +
                                "<img src='Powered-by-Foursquare-black-600.png' style='width:150px;height:25px;''>" +
                                "<div style='width:200px;min-height:120px'>" +
                                "<img src=" + "'" + imageUrl + "'>" +
                                "</div>" +
                                "<h4>" + name + "</h4>" +
                                "<p>" +
                                street +
                                "<br>" +
                                city +
                                "<br>" +
                                "<span> Ph: " + phone + "</span>" +
                                "<br>" +
                                "<div>" +
                                "<a href='" + shortUrl + "'>Check it out on Foursquare</a>" +
                                "<br><br>" +
                                "</div>" ;

            // console.log('infoWindowContent' + infoWindowContent);
            infowindow.setContent(infoWindowContent);
        }).fail(function() {
            alert('Oops... Foursquare is not responding. Please check your internet connection and/or firewall and try later');
        });
        infowindow.open(map, marker);
    }
}