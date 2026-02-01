<?php
/*
File: EditContact.php
Name: Nicolas Fuentes
*/

	$inData = getRequestInfo();

	$contactId = isset($inData["id"]) ? intval($inData["id"]) : 0;
	$userId    = isset($inData["userId"]) ? intval($inData["userId"]) : 0;

	$firstName = isset($inData["firstName"]) ? trim($inData["firstName"]) : "";
	$lastName  = isset($inData["lastName"])  ? trim($inData["lastName"])  : "";
	$phone     = isset($inData["phone"])     ? trim($inData["phone"])     : "";
	$email     = isset($inData["email"])     ? trim($inData["email"])     : "";

	if ($contactId < 1 || $userId < 1)
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
		$stmt->bind_param("ssssii", $firstName, $lastName, $phone, $email, $contactId, $userId);

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
