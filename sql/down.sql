/*
File: down.sql
Written by: Jake 
Date: 1/28/26

Purpose:
This is a migration script to help you test new data in tables.
Use init.sql bring the tables back if you the down.sql
*/
USE COP4331;

-- drops tables within init.sql
DROP TABLE IF EXISTS Users, Contacts;