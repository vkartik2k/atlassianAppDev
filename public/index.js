async function postData(url = '', data = {}) {
    const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data) 
    });
    return response.json();
} 

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let variables = {
}

let templates = {
}

$(document).ready(function () {
    if(!localStorage.user && (typeof localStorage.user === 'undefined')) $('.overlayLogin').show()

    $('#loginBtn').click(() => {
        const email = $("#loginEmail").val()
        const password = $("#loginPassword").val()
        postData('./route/login', { email:email, password:password })
		.then(data => { 
			if(data.done === true ) {
				localStorage.setItem("user", JSON.stringify(data.user));
				console.log(data.user)
				$('.overlayLogin').hide()
			}
			else {
                console.log("Error")
				alert(data.message)
			}
		});
    }) 

})