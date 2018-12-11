/*
* Author : Ashwin R. 
* For : Udacity Fullstack Nanodegree Program
*/



// Declare Foursquare API params
// Foursquare API Url parameters in global scope
var BaseUrl = "https://api.foursquare.com/v2/venues/",
    foursquareClientId = "client_id=QTQWQHM4I3ZAFVDLDIW13ER0DJP3WNE04R5LQD5XYSYXYCKT",
    foursquareClientSecret = "client_secret=SB25OMNTETZVZVXIEXCCOQEZS3SSXNYZJNWTZ4WHXHHXRZ1Y",
    foursquareApiVersion = "v=20181507";

 
// Global Variable declaration  
// Global variables to use in google maps
var map,
  infoWindow,
  bounds;

//Call initMap() on page Load to initialize map
function initMap() {
  "use strict";

  //Start customizing Google map elements 
  //Ref : https://developers.google.com/maps/documentation/javascript/examples/control-options 
  //Google map elements - setup custom map marker
  var image = {
    // Source : https://freeiconshop.com/icon/bottle-icon-outline-filled/
    "url": "img/blue_bottle.png",
    // Set Marker dimensions
    "size": new google.maps.Size(32, 32),
    // Set Marker origin
    "origin": new google.maps.Point(0, 0),
    // Set anchor
    "anchor": new google.maps.Point(0, 32)
  };

  //Google map elements - set map options
  var mapOptions = {
    //Set base
    "center": {
      "lat": 37.776190,
      "lng": -122.423218
    },
    zoom: 13,

    //Set Google Map Style. Based on : https://snazzymaps.com/style/125057/apple-tweak
    styles: [
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f7f1df"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d0e3b4"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
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
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe15f"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efd151"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "black"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a2daf2"
            }
        ]
    }
],
    
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    mapTypeControlOptions: {
    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    }
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  infoWindow = new google.maps.InfoWindow({
    maxWidth: 150,
    content: ""
  });
  //Set bounds
  bounds = new google.maps.LatLngBounds();

  // Dismiss infoWindow with out of bound click
  map.addListener("click", function(){
    infoWindow.close(infoWindow);
  });

  // Reset map to center upon window resize
  window.onresize = function () {
    map.fitBounds(bounds);
  };


  //Creating Space object
  var Space = function (data, id, map) {
    var self = this;
    this.name = ko.observable(data.name);
    this.location = data.location;
    this.shortUrl = "";
    this.imageUrl = "";
    this.marker = "";
    this.markerId = id;
    this.fs_id = data.fs_id;
    
  }

  // Populate infoWindows
  function getContent(space) {
    var contentString = "<h3>" + space.name +
      "</h3><br><div style='width:200px;min-height:120px'><img src=" + '"' +
      space.imageUrl + '"></div><div><a href="' + space.shortUrl +
      '" target="_blank">Explore in Foursquare</a><img src="img/Foursquare_150.png">';
    var errorString = "Something went wrong, Foursquare content not available."
    if (space.name.length > 0) {
      return contentString;
      } else {
      return errorString;
      }
  }

  // Make the Marker bounce
  function markerBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 700);
    }
  };

 function ViewModel() {
    var self = this;

    // Nav button control
    this.isNavClosed = ko.observable(false);
    this.navClick = function () {
      this.isNavClosed(!this.isNavClosed());
    };

    // Creating list elements from the spaceList
    this.spaceList = ko.observableArray();
    // Getting data from data.js
      qualifiedLocations.forEach(function(item){
      self.spaceList.push(new Space(item));
    });

    // Render a marker for each qualified
    this.spaceList().forEach(function(space) {
      var marker = new google.maps.Marker({
        map: map,
        position: space.location,
        icon: image,
        animation: google.maps.Animation.DROP
      });
      space.marker = marker;
      // Extend the boundaries of the map for each marker
      bounds.extend(marker.position);
      // Create an onclick event to open an infowindow and bounce the marker at each marker
      marker.addListener("click", function(e) {
        map.panTo(this.position);
        //pan down infowindow by 200px to keep whole infoWindow on screen
        map.panBy(0, -100)
        infoWindow.setContent(getContent(space));
        infoWindow.open(map, marker);
        markerBounce(marker);
    });
  });

    // Foursquare API Call mechanism
    // API request
    self.getFoursquareData = ko.computed(function(){
      self.spaceList().forEach(function(space) {

        // URL builder for each location
        var  venueId = space.fs_id + "/?";
        var foursquareUrl = BaseUrl + venueId + foursquareClientId + "&" + foursquareClientSecret + "&" + foursquareApiVersion;

        // Foursquare Ajax Call : https://developer.foursquare.com/places-api
        $.ajax({
          type: "GET",
          url: foursquareUrl,
          dataType: "json",
          cache: false,
          success: function(data) {
            var response = data.response ? data.response : "";
            var venue = response.venue ? data.venue : "";
                space.name = response.venue["name"];
                space.shortUrl = response.venue["shortUrl"];
                space.imageUrl = response.venue.bestPhoto["prefix"] + "height150" +
                response.venue.bestPhoto["suffix"];
          }
        });
      });
    });

    // List item click
    this.itemClick = function (space) {
      var markerId = space.markerId;
      google.maps.event.trigger(space.marker, "click");
    }

    // Filters for list of locations
    self.filter = ko.observable("");

    this.filteredSpaceList = ko.dependentObservable(function() {
      var q = this.filter().toLowerCase();
     
      if (!q) {
        return ko.utils.arrayFilter(self.spaceList(), function(item) {
        item.marker.setVisible(true);
        return true;
      });
      } else {
        return ko.utils.arrayFilter(this.spaceList(), function(item) {
          if (item.name.toLowerCase().indexOf(q) >= 0) {
          return true;
          } else {
            item.marker.setVisible(false);
          return false;
          }
        });
      }
    }, this);
  };

 // Apply knockout.js bindings 
ko.applyBindings(new ViewModel());
}