/*
Author : Ashwin R.
    Model data goes here
    Instead of hard coding it inside the main app.js file, this is abstracted out, so as to make it easier to edit

    In normal applications, this file would probably handle the Api calling mechanism, to decouple the data gathering from main code
    Title and location are used for setting marker on Google Map 
*/


var locations = [
    {
        title: 'Blue Fog Market',
        location: {
            lat: 37.797093,
            lng: -122.427315
        }
    },
    {
        title: 'San Francisco Museum of Modern Art',
        location: {
            lat: 37.785831,
            lng: -122.427315
        }
    },
    {
        title: 'Velo Rouge Cafe',
        location: {
            lat: 37.775660, 
            lng: -122.458226
        }
    },
    {
        title: 'Humphry Slocombe',
        location: {
            lat: 37.752831,
            lng: -122.412167
        }
    },
    {
        title: 'Haight Street market',
        location: {
            lat: 37.770360,
            lng: -122.447592
        }
    },
    {
        title: 'Blue Bottle Coffee',
        location: {
            lat: 37.776190,
            lng: -122.423218
        }
    },
    {
        title: 'The Fog Lifter Café',
        location: {
            lat: 37.725222,
            lng: -122.462440
        }
    },
    {
        title: 'Vinyl Coffee & Wine Bar',
        location: {
            lat: 37.773071,
            lng: -122.437574
        }
    },
    {
        title: 'Jackson Place Cafe',
        location: {
            lat: 37.797243,
            lng: -122.401164
        }
    },    

];
