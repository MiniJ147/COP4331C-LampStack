<?php
/*
File: EditContact.php
Name: Nicolas Fuentes
*/

	$ContactID = isset($inData["ID"]) ? intval($inData["ID"]) : 0;
	$UserID    = isset($inData["UserID"]) ? intval($inData["UserID"]) : 0;

	$FirstName = isset($inData["FirstName"]) ? trim($inData["FirstName"]) : "";
	$LastName  = isset($inData["LastName"])  ? trim($inData["LastName"])  : "";
	$Phone     = isset($inData["Phone"])     ? trim($inData["Phone"])     : "";
	$Email     = isset($inData["Email"])     ? trim($inData["Email"])     : "";

	if ($ContactID < 1 || $UserID < 1)
	{
		returnWithError("Missing id or userId");
		exit();
	}

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=? AND UserID=?");
		$stmt->bind_param("ssssii", $FirstName, $LastName, $Phone, $Email, $ContactID, $UserID);

		if( !$stmt->execute() )
		{
			$err = $stmt->error;
			$stmt->close();
			$conn->close();
			returnWithError($err);
			exit();
		}

		// If nothing updated, either not found or no change.
		if( $stmt->affected_rows == 0 )
		{
			$stmt->close();
			$conn->close();
			returnWithError("No matching contact found (or no changes)");
			exit();
		}

		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
