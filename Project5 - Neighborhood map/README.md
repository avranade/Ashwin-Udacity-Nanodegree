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
* Currently the repo is hosted under a common repo which has all Nanodegree projects. In the future, they will be separated, so that projects can be hosted on github.io pages

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
* [Css tricks](https://css-tricks.com/almanac/properties/o/overflow/)
* [How to use knockoutjs click binding to create a hamburger menu](https://stackoverflow.com/questions/39799600/how-to-use-knockoutjs-click-binding-to-create-a-hamburger-menu)
* [FontAwesome - For hamburger nav](https://fontawesome.com/icons/bars?style=solid)

## Other student submissions referred
Only for UI : https://github.com/melzareix/Full-Stack-Nanodegree/tree/master/6-NeighbourhoodMap
Solution seemed elegant, but needed some more work. My UI borrows some parts from this, but also adds more changes to make it more material design-ish and also needed more UI customizations. Used w3schools, bootstrap and material design palette along with this to make my new UI. 

## Revisions
* Removed unnecessary code
* Recreated UI based on a combination of Udacity learning material, Bootstrap, w3schools, Material design palette and other online resources. Added responsive design
* Set max width of InfoWindow and also fixed overflow
* Removed redundant valueUpdate

## Further improvements 
* While the page is currently standalone, it is based on canned data. A further improvement will be getting locations from API calls
* CRUD operations on markers. A future application is to make this a CRUD application which can be used for making and sharing a list to others.
* Abstract map setup out of application.js. This is to make it easier to switch map providers and also to make it easier for other JS files to use it. To be researched. 

