## Udacity Fullstack Nanodegree - Product Catalog App

The Product catalog allows users to interact with the database after authentication. Authenticated Users can create, update and delete their records. 

## Project Overview
You will develop an application that provides a list of items within a variety of categories as well as provide a user registration and authentication system. Registered users will have the ability to post, edit and delete their own items.


## Technologies used
Backend: Python Flask SQLAlchemy
Frontend: HTML, CSS, JS. Fontawesome was used for the Home Icon on Page. 

## Installation and How to View This App
1. Install Vagrant and VirtualBox
2. Clone the repository
3. Launch and connect to the Vagrant VM 
```
	* Navigate to location of vagrantfile

    vagrant up
    vagrant ssh
```
4. Setup and initially populate the database
```
    # in the root directory for project:
    python database_create.py
    python lotsofproducts.py
```
5. Run the application
```
    python application.py
```
6. Access the application
Visit [http://localhost:8000](http://localhost:8000) as specified to test locally.

7. Add Google client ID and client secret to client_secrets.json for Oauth . 
8. Make sure you also update client ID in login.html, otherwise 

### Google credentials file
* Go to https://console.cloud.google.com/apis/credentials/oauthclient and setup Google OAuth API Credentials. 
* Enter ```http://localhost:5000``` in the Authorized JavaScript origins and ```http://localhost:5000/login and http://localhost:5000/gconnect``` in the Authorized redirect URIs.
* After saving, download JSON and rename the file to ```client_secrets.json``` and replace the file with the same name in the project directory.

### Facebook credentials file
* Go to https://developers.facebook.com/apps and setup a new app.
* Add a new product "Facebook Login" and add ```http://localhost:5000``` in the site URL.
* Add your Client id and secret in the ```fb_client_secret.json``` file.

## Helpful Resources
* [Google OAuth Credentials](https://console.cloud.google.com/apis/credentials/oauthclient)
* [Facebook Deveopers](https://developers.facebook.com/apps)
* [PEP8 online checker](http://pep8online.com/)
* [Flask SQL Alchemy Documentation](http://flask-sqlalchemy.pocoo.org/2.3/)