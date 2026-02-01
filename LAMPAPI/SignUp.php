<?php
/*
File: SignUp.php
Name: Nicolas Fuentes
*/
	$inData = getRequestInfo();

	$firstName = isset($inData["firstName"]) ? trim($inData["firstName"]) : "";
	$lastName  = isset($inData["lastName"])  ? trim($inData["lastName"])  : "";
	$login     = isset($inData["login"])     ? trim($inData["login"])     : "";
	$password  = isset($inData["password"])  ? $inData["password"]        : "";

	if ($login === "" || $password === "")
	{
		returnWithError("Missing login or password");
		exit();
	}

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// Enforce unique usernames
		$stmt = $conn->prepare("SELECT ID FROM Users WHERE Login=? LIMIT 1");
		$stmt->bind_param("s", $login);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $result && $result->fetch_assoc() )
		{
			$stmt->close();
			$conn->close();
			returnWithError("Login already exists");
			exit();
		}
		$stmt->close();

		$stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES (?,?,?,?)");
		$stmt->bind_param("ssss", $firstName, $lastName, $login, $password);

		if( !$stmt->execute() )
		{
			$returnErr = $stmt->error;
			$stmt->close();
			$conn->close();
			returnWithError($returnErr);
			exit();
		}

		$newId = $conn->insert_id;

		$stmt->close();
		$conn->close();
		returnWithInfo($firstName, $lastName, $newId);
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
