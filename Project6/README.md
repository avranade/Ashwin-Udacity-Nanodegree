# Project 6 : Linux Server Configuration - Full Stack Nanodegree Program

This is project 6 undertaken as part of Fullstack nanodegree Program. As part of this project, the Catalog project (Project 4) will be hosted on an Amazon Lightsail instance. 

# Server details
IP address: `54.200.133.56`

SSH port: `2200`

URL: `http://54.200.133.56.xip.io`

# Configuration changes
## Start a new Ubuntu Linux Server instance on Amazon Lightsail
Refer `Section 3` of `Project : Linux Server Configuration` from Udacity Nanodegree Syllabus titled `Getting started on Lightsail` to get started and create an Amazon Lightsail instance. 

This document assumes that you already have gone through the steps above and created the instance. 

## SSH into your Server 
1. In the Amazon Lightsail Dashboard, navigate to **Account** and then download **SSH keys**. The file name in my case was along the lines of  be like _LightsailDefaultPrivateKey-us-west-2.pem_
2. On your local machine, create a new file named **lightsail_key.rsa** under ~/.ssh folder
3. Copy and paste content from downloaded private key file to **lightsail_key.rsa**
4. Set file permission as owner only : `$ chmod 600 ~/.ssh/lightsail_key.rsa`
5. SSH into the instance: `$ ssh -i ~/.ssh/lightsail_key.rsa ubuntu@<your_machine_id>`

**Note :** This is important to setup first since we will be denying access to port 22 soon. Once port 22 access is shut off, you won't be able to ssh into the machine from the Lightsail UI. 

## Update all currently installed packages
1. `sudo apt-get update` to update packages
2. `sudo apt-get upgrade` to install newest versions of packages
3. `sudo apt-get dist-upgrade` to set future upgrades

##  Change the SSH port from 22 to 2200
1. Run `$ sudo nano /etc/ssh/sshd_config` to open up the configuration file
2. Change the port number from **22** to **2200** in this file
3. Save and exit the file
4. Restart SSH: `$ sudo service ssh restart`

## Configuration of Uncomplicated Firewall (UFW)
1. By default, block all incoming connections on all ports:
`sudo ufw default deny incoming`
2. Allow outgoing connection on all ports:
`sudo ufw default allow outgoing`
3. Allow incoming connection for SSH on port 2200:
`sudo ufw allow 2200/tcp`
4. Allow incoming TCP packets on port 2200 to allow SSH: `$ sudo ufw allow 2200/tcp`
5. Allow incoming TCP packets on port 80 to allow www: `$ sudo ufw allow www`
6. Allow incoming UDP packets on port 123 to allow NTP: `$ sudo ufw allow 123/udp`
7. Close port 22: `$ sudo ufw deny 22`
8. Enable firewall: `$ sudo ufw enable`
9. Check out current firewall status: `$ sudo ufw status`
10. To check that the rules have changed: `sudo ufw show added`.
11. Then restart the SSH service: `sudo service ssh restart`
12. Open up a new terminal and verify that you can now ssh in via the new port 2200: `$ ssh -i ~/.ssh/lightsail_key.rsa ubuntu@<your_machine_id> -p 2200`

## Create a new user account **grader** and give **grader** sudo access
1. Create a new user account **grader**:`$ sudo adduser grader`
2. Create a file named grader under this path: `$ sudo touch /etc/sudoers.d/grader`
3. Edit this file: `$ sudo nano /etc/sudoers.d/grader`, add code `grader ALL=(ALL:ALL) ALL`. Save and exit

## Set SSH login using keys
1. Create an SSH key pair for **grader** using the `ssh-keygen` tool on your local machine. Save it in `~/.ssh` path
2. As root user on VM, do:
```
mkdir /home/grader/.ssh
chown grader:grader /home/grader/.ssh
chmod 700 /home/grader/.ssh
cp /root/.ssh/authorized_keys /home/grader/.ssh/
chown grader:grader /home/grader/.ssh/authorized_keys
chmod 644 /home/grader/.ssh/authorized_keys
```
3. Restart SSH: `$ sudo service ssh restart`
4. Now you are able to login in as grader: `$ ssh -i ~/.ssh/grader_key -p 2200 grader@<your_machine_id>`
5. You will be asked for grader's password. To unable it, open configuration file again: `$ sudo nano /etc/ssh/sshd_config`
6. Change `PasswordAuthentication yes` to **no**
7. Restart SSH: `$ sudo service ssh restart`

## Disable root login
Change the following line in the file `/etc/ssh/sshd_config`:
From `PermitRootLogin without-password` to `PermitRootLogin no`.

## Configure the local timezone to UTC
1. Run `$ sudo dpkg-reconfigure tzdata`
2. Choose **None of the above** to set timezone to UTC

## Install and configure Apache
1. Install **Apache**: `$ sudo apt-get install apache2`
2. Go to http://<your_machine_ip>/, if Apache is working correctly, an **Apache2 Ubuntu Default Page** shows up


## Install and configure Python mod_wsgi
1. Install the **mod_wsgi** package: `$ sudo apt-get install libapache2-mod-wsgi python-dev`
2. Enable **mod_wsgi**: `$ sudo a2enmod wsgi`
3. Restart **Apache**: `$ sudo service apache2 restart`
4. Check if Python is installed: `$ python`


## Install PostgreSQL
Install PostgreSQL with:

`sudo apt-get install postgresql postgresql-contrib`

To ensure that remote connections to PostgreSQL are not allowed, check
that the configuration file `/etc/postgresql/9.5cd/main/pg_hba.conf` only
allowed connections from the local host addresses `127.0.0.1` for IPv4
and `::1` for IPv6.

Create a PostgreSQL user called `catalog` with:
`sudo -u postgres createuser -P catalog`

You are prompted for a password. Set a password and remember to keep note of it (you will need it later to configure DB setup)

Create an empty database called `catalog` with:
`sudo -u postgres createdb -O catalog catalog`


## Install git and clone catalog application from github
1. Run `$ sudo apt-get install git`
2. Create dictionary: `$ mkdir /var/www/catalog`
3. CD to this directory: `$ cd /var/www/catalog`
4. Clone the catalog app: `$ sudo git clone https://github.com/avranade/udacity-catalog.git catalog`
5. Change the ownership: `$ sudo chown -R ubuntu:ubuntu catalog/`
6. CD to `/var/www/catalog/catalog`
7. Change file **application.py** to **__init__.py**: `$ mv application.py __init__.py`
8. Change line `app.run(host='0.0.0.0', port=8000)` to `app.run()` in **__init__.py** file


## Edit client_secrets.json file
1. Create a new project on Google API Console and download `client_secrets.json` file
2. Copy and paste contents of downloaded `client_secrets.json` to the file with same name under directory `/var/www/catalog/catalog/client_secrets.json`

## Setup for deploying a Flask App on Ubuntu VPS
1. Install pip: `$ sudo apt-get install python-pip`
2. Install packages:
```
$ sudo pip install httplib2
$ sudo pip install requests
$ sudo pip install --upgrade oauth2client
$ sudo pip install sqlalchemy
$ sudo pip install flask
$ sudo apt-get install libpq-dev
$ sudo pip install psycopg2
```

## Setup and enable a virtual host
1. Create file: `$ sudo touch /etc/apache2/sites-available/catalog.conf`
2. Add the following to the file:
```
   <VirtualHost *:80>
		ServerName <your_machine_ip>
		ServerAdmin <your_email_id>
		WSGIScriptAlias / /var/www/catalog/catalog.wsgi
		<Directory /var/www/catalog/catalog/>
			Order allow,deny
			Allow from all
			Options -Indexes
		</Directory>
		Alias /static /var/www/catalog/catalog/static
		<Directory /var/www/catalog/catalog/static/>
			Order allow,deny
			Allow from all
			Options -Indexes
		</Directory>
		ErrorLog ${APACHE_LOG_DIR}/error.log
		LogLevel warn
		CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
```

3. Run `$ sudo a2ensite catalog` to enable the virtual host
4. Restart **Apache**: `$ sudo service apache2 reload`


## Configure .wsgi file
1. Create file: `$ sudo touch /var/www/catalog/catalog.wsgi`
2. Add content below to this file and save:
```
   #!/usr/bin/python
   import sys
   import logging
   logging.basicConfig(stream=sys.stderr)
   sys.path.insert(0,"/var/www/catalog/")

   from catalog import app as application
   application.secret_key = 'super_secret_key'
```
3. Restart **Apache**: `$ sudo service apache2 reload`

## Config updates to DB setup
In `__init,py__`, `database_create.py` and `lotsofproducts.py`, replace line for `engine` with ``engine = create_engine('postgresql://catalog:INSERT_PASSWORD_FOR_DATABASE_HERE@localhost/catalog')``

## Config updates to Client secrets 
in `__init.py__`, update the path of `client_secrets.json` to `var/www/catalog/catalog/client_secrets.json`, since the app is running in default `/` working directory 


## Disable defualt Apache page
1. `$ sudo a2dissite 000-default.conf`
2. Restart **Apache**: `$ sudo service apache2 reload`

## Set up database schema
1. Run `$ sudo python database_create.py`
2. Run `$ sudo python lotsofproducts.py`
3. Restart **Apache**: `$ sudo service apache2 reload`
4. Go to Your website URL to access the application. 

## Troubleshooting 
1. To view `access` logs : `sudo tail -100 /var/log/apache2/access.log`.
2. To view `error` logs : `sudo tail -100 /var/log/apache2/error.log`.


## Reference material 
1. [Apache](https://httpd.apache.org/docs/2.2/configuring.html)
2. [BC Ko - Udacity Linux configuration](https://github.com/bcko/Ud-FS-LinuxServerConfig-LightSail)
3. [Steve Wooding](https://github.com/SteveWooding/fullstack-nanodegree-linux-server-config)
4. [Amazon Lightsail Website](https://aws.amazon.com/lightsail/?p=tile)
5. [Google API Concole](https://console.cloud.google.com/)
6. [WSGI tutorial](http://wsgi.tutorial.codepoint.net)
6. [UFW manual for Ubuntu 16.04](http://manpages.ubuntu.com/manpages/xenial/en/man8/ufw.8.html)

## Instructions for grader 
1. For grader, `ssh` key has been provided. 
2. Use this key with the command `ssh -i /path/to/key -p 2200 grader@54.200.133.56` to connect
3. Password for the grader user has also been added to the submission
