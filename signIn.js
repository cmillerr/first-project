$(document).ready(function () {

//variable for our data entered to show up in console 
//button for user to click, once clicked collects data 
	$("#signInBtn").on("click", function () {
		let signInData = $('form').serializeArray();
		let missingData = false, signInObj = {};
		//object storing input info
		//loops through array and puts up red toast if data is missing in name email and pw
		for (let i = 0; i< signInData.length; i++){
			if (!signInData[i].value.length){
				missingData = true;
			}
			//condensing data array into a single object instead of three separate ones 
			signInObj[signInData[i].name] = signInData[i].value;
		}
		if (missingData) {
			M.toast({html: 'Missing Data Please Complete Form', classes: 'rounded red'})
			missingData = false;
		}
		else {
//posting all inputted data to server to then send to a database that saves info and now can succesfully login later, tells server to expect a JSON object and data 
		$.ajax({
		url:"/signIn",
		method:"POST",
		contentType: 'application/json',
		data: JSON.stringify(signInObj),
//function that sends error response message if their is no account  	
		error: function(err){
			console.log(err)
			M.toast({html: err.responseJSON.message, classes: 'rounded red'})
		},
		success: function(data){
//saves token into session variable
		sessionStorage.setItem('spaceProjToken', data.token);
		console.log("datafromserver")
		console.log(data)
	//query parameter allows you to pass data through url and sends user to the specific encripted web page
		window.location.href = "/earth?t=" + data.token
		},
		})
		}
		console.log(JSON.stringify(signInObj))
	});
});



