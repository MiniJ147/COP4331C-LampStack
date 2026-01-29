/*
File: init.sql
Written by: Jake 
Date: 1/28/26

Purpose:
migration sql script which inits our schema to store contacts

Schema Details

Users to many Contacts
*/
CREATE DATABASE IF NOT EXISTS COP4331;
USE COP4331;

CREATE TABLE IF NOT EXISTS Users (
  ID INT NOT NULL AUTO_INCREMENT,
  FirstName VARCHAR(50) NOT NULL DEFAULT '',
  LastName  VARCHAR(50) NOT NULL DEFAULT '',
  Login     VARCHAR(50) NOT NULL DEFAULT '',
  Password  VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (ID)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Contacts (
        ID              INT NOT NULL AUTO_INCREMENT,
        FirstName       VARCHAR(50) NOT NULL,
        LastName        VARCHAR(50) NOT NULL,
        Phone           VARCHAR(50) NOT NULL,
        Email           VARCHAR(50) NOT NULL,
        UserID          INT NOT NULL,
        CreatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY (ID),
        CONSTRAINT fk_user -- enforce relation
                FOREIGN KEY (UserID)
                REFERENCES Users(ID)
) ENGINE = InnoDB;