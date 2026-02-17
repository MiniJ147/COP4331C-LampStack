# COP4331C: LAMP STACK PROJECT 

## About:
This repo contains the code for group 3 in the COP4331C LAMP stack project. The goal of this application is to create a simple contact manager for users.  

### Project Requirements:
A user should be able to:  
1. sign/sign-up 
2. View Contacts
3. Create Contacts
4. Delete Contacts
5. Edit Contacts  

This project is a CRUD contact manager.

### Dependencies:
Linux: Ubuntu 24.04  
Apache  
MYSQL: mysql-server  
PHP  

## Frontend
TODO: Frontend people fill out with more information on the requirements and design decisions you have made.  

Requirements: Provide a slick frontend which enables users to preform CRUD operations as stated in the [Project Requirements](#project-requirements) section.

## API 
TODO: API people fill out with more information on the requirements and design decisions you have made.  

Requirements: Provide API end points for the frontend to hit which will query the database and return the data in a formatted JSON response.

## Database
Requirements: Design and create the database schema which will serve as our data storage for the application. Provide CRUD sql queries for API people to use.

### MySQL Commands
```bash
# installs sql server 
sudo apt install mysql-server

# reloads mysql.service units (only run if the warning message comes up)
systemctl daemon-reload 

# |==== Service Management (might require sudo) ====|

# Starts mysql
sudo systemctl start mysql

# Mysql status
service mysql status

# Restarts mysql
service mysql restart

# accessing mysql command line
# password is root
# or you can create your own user
sudo mysql -u root -p

#exit mysql command line
exit
# |====================|
```

### Using Scripts
```bash
# bring up database and tables
sudo mysql -u root < sql/init.sql 

# bring down tables
sudo mysql -u root < sql/down.sql

# puts mock data into sql database
sudo mysql -u root < sql/mock-data.sql
```

If you want information about the database files please read the header provide at the top of each file.

## AI Disclosure

AI was used in the creation of this project, including:
	
	-> Development of multiple scripts and files.
	->
