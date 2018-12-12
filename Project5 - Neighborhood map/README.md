## Project 5 : Neighbourhood Map - Blue Bottle locations in San Francisco
This single page application was created to show a map of locations where Blue Bottle Coffee is available.  

## Frameworks/APIs used
* Knockout JS
* Google Maps
* Foursquare
* Bootstrap 

## Project Overview

* You will develop a single page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.

## Implementation
* UI has been made with boilerplate [Bootstrap 3](https://getbootstrap.com/docs/3.3/)
* Google Map API has been integrated
* Foursquare API doesn't provide one single mechanism in the Places API, to get all Venue details
* 2 API calls are made : 1. to find the Venue ID of a venue from Coordinates and 2. to get Venue Details based on Venue ID. 
* InfoWindow is populated based on this 2nd API call


## How to View This App
* Clone the repo or download project as zip file
* Once you have the code, navigate to and open index.html

## Notes on editing this app/ Troubleshooting
* In some instances, the error message 'Oops... Foursquare is not responding....' might appear. This could be because the API has hit it's limit. 
* In this case, either wait or create your own foursquare client ID and secret on [Foursquare for Developers](https://developer.foursquare.com/) and update client ID and secret in 'utils.js' file
* In case you face an issue in Google map not coming up, please create your own Google Map API key and update it in 'index.html' 


## Helpful Resources
* [Google Maps APIs](https://developers.google.com/maps/)
* [Bootstrap 3](https://getbootstrap.com/docs/3.3/)
* [Foursquare for Developers](https://developer.foursquare.com/)
* [Knockout Documentation](http://knockoutjs.com/documentation/introduction.html)
* [Google Maps Javascript API - Control options](https://developers.google.com/maps/documentation/javascript/examples/control-options)
* [Google Map styling](https://developers.google.com/maps/documentation/javascript/examples/maptype-styled-simple)
* [Google map : Custom markers](https://developers.google.com/maps/documentation/javascript/markers)
* [Apple Tweak - Google map style](https://snazzymaps.com/style/125057/apple-tweak)
* [Foursquare Places API](https://developer.foursquare.com/places-api)
* [Bottle Icon Outline Filled - Iconshop Free icons for Commercial use](https://freeiconshop.com/icon/bottle-icon-outline-filled/)
* [Bottle Icon Flat - Iconshop Free icons for Commercial use](https://freeiconshop.com/icon/bottle-icon-flat/)
* [Material Design palette](https://www.materialpalette.com/blue-grey/light-blue)
* [Powered by Foursquare logo - Foursquare developer site resources](https://foursquare.com/about/logos)
* Javascript Beautifier : https://beautifier.io/
* [Postman](https://www.getpostman.com/)

## Further improvements 
* While the page is currently standalone, it is based on canned data. A further improvement will be getting locations from API calls
* Accessibility text hasn't been added specifically. In terms of Accessibility, this might fail 

