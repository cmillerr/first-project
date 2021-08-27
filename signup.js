$(document).ready(function () {
	//variable for our data entered to show up in console
	//button for user to click, once clicked collects data
	$("#signupBtn").on("click", function () {
		let signUpData = $("form").serializeArray();
		let missingData = false,
			signUpObj = {};
		//object storing input info
		//loops through array and puts up red toast if data is missing in name email and pw
		for (let i = 0; i < signUpData.length; i++) {
			if (!signUpData[i].value.length) {
				missingData = true;
			}
			//condensing data array into a single object instead of three separate ones
			signUpObj[signUpData[i].name] = signUpData[i].value;
		}
		if (missingData) {
			M.toast({
				html: "Missing Data Please Complete Form",
				classes: "rounded red",
			});
			missingData = false;
		} else {
			//posting all inputted data to server to then send to a database that saves info and now can succesfully login later, tells server to expect a JSON object and data
			$.ajax({
				url: "/signup",
				method: "POST",
				contentType: "application/json",
				data: JSON.stringify(signUpObj),
				success: function (data) {
//saves token into session variable
					sessionStorage.setItem('spaceProjToken', data.token);
					console.log("datafromserver");
					console.log(data);
					//query parameter allows you to pass token through url and sends user to the specific encripted web page
					window.location.href = "/earth?t=" + data.token;
				},
				error: function (data) {
					console.log("error");
					console.log(error);
				}
			});
		}
	});
});
