<?php
/*
File: DeleteContact.php
Name: Nicolas Fuentes
*/

	$inData = getRequestInfo();

	$ContactID = isset($inData["ID"]) ? intval($inData["ID"]) : 0;
	$UserID    = isset($inData["UserID"]) ? intval($inData["UserID"]) : 0;

	if ($ContactID < 1 || $UserID < 1)
	{
		returnWithError("Missing ID or UserID");
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
		$stmt->bind_param("ii", $ContactID, $UserID);

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
