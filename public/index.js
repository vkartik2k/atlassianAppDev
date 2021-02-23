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

function loadCanvas() {
    let canvas = document.getElementById("main");
    ctx = canvas.getContext("2d");

    canvas.width = document.getElementById("main").width;
    canvas.height = document.getElementById("main").height;
    var background = new Image();
    background.src = "http://www.samskirrow.com/background.png";

    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = function () {
        ctx.drawImage(background, 0, 0);
    }
}

$(document).ready(function () {
    if (!localStorage.user && (typeof localStorage.user === 'undefined')) $('.overlayLogin').show()

    $('#loginBtn').click(() => {
        const email = $("#loginEmail").val()
        const password = $("#loginPassword").val()
        postData('./route/login', { email: email, password: password })
            .then(data => {
                if (data.done === true) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    console.log(data.user)
                    $('.overlayLogin').hide()
                    loadCanvas()
                }
                else {
                    console.log("Error")
                    alert(data.message)
                }
            });
    })

})