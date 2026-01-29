/*
File: mock-data.sql
Written by: Jake 
Date: 1/28/26

Purpose:
Provided that tables are established via init.sql, you can run this 
script to populate with mock data for testing purposes.
*/
USE COP4331;

-- Insert mock users
INSERT INTO Users (FirstName, LastName, Login, Password) VALUES
('Jake',   'Alex',    'jalex',    'password123'),
('Alice',  'Smith',   'asmith',   'alicepass'),
('Bob',    'Johnson', 'bjohnson', 'bobpass'),
('Carol',  'Davis',   'cdavis',   'carolpass'),
('Evan',   'Brown',   'ebrown',   'evanpass');

-- Insert mock contacts
INSERT INTO Contacts (FirstName, LastName, Phone, Email, UserID) VALUES
-- Contacts for Jake (UserID = 1)
('John',  'Doe',      '555-123-4567', 'john.doe@email.com',      1),
('Sarah', 'Connor',  '555-222-1111', 'sarah.connor@email.com',  1),

-- Contacts for Alice (UserID = 2)
('Mike',  'Wilson',  '555-333-4444', 'mike.wilson@email.com',   2),
('Emma',  'Taylor',  '555-444-5555', 'emma.taylor@email.com',  2),

-- Contacts for Bob (UserID = 3)
('Chris', 'Martin',  '555-666-7777', 'chris.martin@email.com', 3),

-- Contacts for Carol (UserID = 4)
('Anna',  'White',   '555-888-9999', 'anna.white@email.com',   4),
('Paul',  'Green',   '555-101-2020', 'paul.green@email.com',   4),

-- Contacts for Evan (UserID = 5)
('Liam',  'King',    '555-303-4040', 'liam.king@email.com',    5);
