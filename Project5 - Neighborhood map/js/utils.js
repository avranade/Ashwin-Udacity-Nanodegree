/*
* ##### API details #####
# API client ID, secret, version and endpointBaseUrl are specified outside of main application.js
* This is done so that multiple JS files will be able to use it if needed. 
* Also, making changes in this case, would be easier
*/
var foursquareClientID = 'LDAGABFRMUSRMYJNN1JNK0JHA0CZM0K3WKVGGGAPISAFD0LG',
	foursquareClientSecret = 'I4TSIB4WZY1AP4OFPQ3321JYZ3PJI0QMMLBBAHZZBARNLUYW',
	foursquareApiVersion = '20181210',
  endpointBaseUrl = "https://api.foursquare.com/v2/venues/";


/*
* ##### Icon Image #####
* Icon image is set here, so that multiple JS files can use it consistently. 
* Also, it makes it easy to swap. Try swapping to 'bottle_with_background.png'
*/
var iconImage = 'bottle.png'; //https://developers.google.com/maps/documentation/javascript/markers