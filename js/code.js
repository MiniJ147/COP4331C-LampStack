const urlBase = 'http://group3lamp.xyz/LAMPAPI'; //URL for API needs to be changed to server URL
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "contact.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

// DeAndre Bailey

function doSignup()
{
	let firstName = document.getElementById("firstName").value;
	let lastName = document.getElementById("lastName").value;
	let signupName = document.getElementById("signupName").value;
	let password = document.getElementById("signupPassword").value;

	document.getElementById("signupResult").innerHTML = "";

	let tmp = {
		firstName:firstName,
		lastName:lastName,
		login:signupName,
		password:password
	};

	let jsonPayload = JSON.stringify( tmp );
	let url = urlBase + '/SignUp.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{


			if (this.readyState == 4 && this.status == 200)
			{
				let jsonObject = JSON.parse( xhr.responseText );

				if ( jsonObject.error != "" )
				{
					document.getElementById("signupResult").innerHTML = jsonObject.error;
					return;
				}

				userId = jsonObject.id;
				
				saveCookie();

				window.location.href = "contact.html"; // redirect to page needed when logged in
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
//		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

//DeAndre Bailey

function addContact()
{
	let first = document.getElementById("contactFirst").value;
	let last = document.getElementById("contactLast").value;
	let phone = document.getElementById("contactPhone").value;
	let email = document.getElementById("contactEmail").value;

	document.getElementById("contactAddResult").innerHTML = "";

	// Validating AddContact.php requirements (FirstName, LastName, Phone, Email, UserID)
	let tmp = {
		FirstName: first, 
		LastName: last, 
		Phone: phone, 
		Email: email, 
		UserID: userId 
	};
	
	let jsonPayload = JSON.stringify( tmp );
	let url = urlBase + '/AddContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
				// Clear inputs
				document.getElementById("contactFirst").value = "";
				document.getElementById("contactLast").value = "";
				document.getElementById("contactPhone").value = "";
				document.getElementById("contactEmail").value = "";
				
				// Refresh the contact list
				searchContacts();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
}

function deleteContact(id)
{
	// Validating DeleteContact.php requirements (ID, UserID)
	let tmp = {ID: id, UserID: userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/DeleteContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				// Reload list to show deletion
				searchContacts();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}

function searchContacts()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";

	// SearchContact.php requirements (search, userId)
	let tmp = {search:srch, userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactSearchResult").innerHTML = "Contacts retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				let html = "<table><tr><th>First Name</th><th>Last Name</th><th>Phone</th><th>Email</th><th>Actions</th></tr>";

				if( jsonObject.error )
				{
					document.getElementById("contactSearchResult").innerHTML = jsonObject.error;
					return;
				}

				for( let i=0; i<jsonObject.results.length; i++ )
				{
					let cur = jsonObject.results[i];
					
					// match SearchContact.php return keys (firstName, lastName, phone, email, id)
					html += "<tr>";
					html += "<td>" + cur.firstName + "</td>";
					html += "<td>" + cur.lastName + "</td>";
					html += "<td>" + cur.phone + "</td>";
					html += "<td>" + cur.email + "</td>";
					
					// For delete, we can directly call deleteContact with the contact's ID. Make sure SearchContact.php returns the contact's ID as 'id'.
					html += "<td><button type='button' onclick='deleteContact(" + cur.id + ")'>Delete</button></td>";
					html += "<td><button type ='button onclick='openEdit'("+ cur.id + ", " + + cur.firstName + ", " + cur.lastName + ", " + cur.phone + ", " + cur.email +")'>Edit</button></td>"; 
					html += "</tr>";
				}
				html += "</table>";
				
				document.getElementById("contactSearchResult").innerHTML = html;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

function updateContact(currentContactId)
{
	if( currentContactId < 0 ) return;

	let first = document.getElementById("contactFirst").value;
	let last = document.getElementById("contactLast").value;
	let phone = document.getElementById("contactPhone").value;
	let email = document.getElementById("contactEmail").value;

	// EditContact.php requirements (ID, UserID, FirstName, LastName, Phone, Email)
	let tmp = {
		ID: currentContactId,
		UserID: userId,
		FirstName: first, 
		LastName: last, 
		Phone: phone, 
		Email: email 
	};
	
	let jsonPayload = JSON.stringify( tmp );
	let url = urlBase + '/EditContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been updated";
				currentContactId = -1;
				
				// Refresh list
				searchContacts();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

	function openEdit(id, first, last, phone, email){
		ECI = id;

		document.getElementById("editF").value = first;
		document.getElementById("editL").value = last;
		document.getElementById("editP").value = phone;
		document.getElementById("editE").value = email;

		document.getElementById("eRes")
	}

	function closeEdit()
	{
		ECI = -1;
		document.getElementById("pUp").style.display = "none";
	}

	function cEdit(){
	if(ECI < 0) return;

	let tmp = {
		ID: ECI,
		UserID: userId,
		FirstName: document.getElementsById("editF").value,
		LastName: document.getElementById("editL").value,
		Phone: document.getElementById("editP").value,
		Email: document.getElementById("editE").value
	};

	let jsonPayload = JSON.stringify( tmp );
	let url = urlBase + '/EditContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	xhr.onreadystatechange = function()
	{
		if(this.readyState == 4)
		{
			if(this.status == 200)
			{
				document.getElementById("eResults").innerHTML = "Updated Contact!"
			
			setTimeout(() => {
				closeEdit();
				searchContacts
			}, 700);
		}
		else
		{
			document.getElementById("editResult").innerHTML = "Failed Updating Contact.";
		}
	}
	};
	xhr.send(jsonPayload);
	}
}