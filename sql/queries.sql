/*
File: queries.sql
Written by: Jake 
Date: 1/28/26

Purpose:
This script provides the template queries the API people will need to call
from the backend in order to perform successful crud operations on the database.
This file should not be ran but rather used as a reference for API developers.
*/

-- |====== User management =======|

-- Creating new user
INSERT INTO Users (FirstName, LastName, Login, Password)
VALUES (?, ?, ?, ?);

-- |====== Contact management (per user)=======|

-- Creating a contact for a user
INSERT INTO Contacts (FirstName, LastName, Phone, Email, UserID)
VALUES (?, ?, ?, ?, ?);

-- Selecting all contacts for a user
SELECT *
FROM Contacts
WHERE UserID = ?
ORDER BY CreatedAt DESC;

-- ALlowing a user to update a contact
UPDATE Contacts
SET FirstName = ?, LastName = ?, Phone = ?, Email = ?
WHERE ID = ? AND UserID = ?;

-- Allowing a user to delete a contact
DELETE FROM Contacts
WHERE ID = ? AND UserID = ?;
