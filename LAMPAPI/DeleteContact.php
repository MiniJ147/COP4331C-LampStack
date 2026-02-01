<?php
/*
File: DeleteContact.php
Name: Nicolas Fuentes
*/

	$inData = getRequestInfo();

	$contactId = isset($inData["id"]) ? intval($inData["id"]) : 0;
	$userId    = isset($inData["userId"]) ? intval($inData["userId"]) : 0;

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
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE ID=? AND UserID=?");
		$stmt->bind_param("ii", $contactId, $userId);

		if( !$stmt->execute() )
		{
			$err = $stmt->error;
			$stmt->close();
			$conn->close();
			returnWithError($err);
			exit();
		}

		if( $stmt->affected_rows == 0 )
		{
			$stmt->close();
			$conn->close();
			returnWithError("No matching contact found");
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
