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
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = document.getElementById("canvas").width;
    canvas.height = document.getElementById("canvas").height;
    var counter = 7;

    // canvas.globalCompositeOperation = "destination-over";
    var coffeeshop = new Image();
    coffeeshop.src = "assets/coffeeshop.png";
    coffeeshop.onload = function () {
        ctx.drawImage(coffeeshop, 835, 175, 198, 144);
        counter--;
    }

    var gym = new Image();
    gym.src = "assets/gym.png";
    gym.onload = function () {
        ctx.drawImage(gym, 350, 20, 227, 164);
        counter--;
    }
    var stadium = new Image();
    stadium.src = "assets/stadium.png";
    stadium.onload = function () {
        ctx.drawImage(stadium, 480, 170, 307, 238);
        counter--;
    }
    var office = new Image();
    office.src = "assets/office.png";
    office.onload = function () {
        ctx.drawImage(office, 150, 60, 200, 250);
        counter--;
    }
    var person1 = new Image();
    person1.src = "assets/person1.png";
    person1.onload = function () {
        counter--;
        if (counter<=0) {
            ctx.drawImage(person1, 550, 370, 35, 70);
            ctx.drawImage(person2, 450, 340);
            ctx.drawImage(atlassianCard, 550, 370, 90, 90);
        }
    }
    
    var person2 = new Image();
    person2.src = "assets/person2.png";
    person2.onload = function () {
        counter--;
        if (counter<=0) {
            ctx.drawImage(person1, 550, 370, 35, 70);
            ctx.drawImage(person2, 450, 340);
            ctx.drawImage(atlassianCard, 550, 370, 90, 90);
        }
    }
    var atlassianCard = new Image();
    atlassianCard.src = "assets/atlassian.png";
    atlassianCard.onload = function () {
        counter--;
        if (counter<=0) {
            ctx.drawImage(person1, 550, 370, 35, 70);
            ctx.drawImage(person2, 450, 340);
            ctx.drawImage(atlassianCard, 550, 370, 90, 90);
        }
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

                }
                else {
                    console.log("Error")
                    alert(data.message)
                }
            });
    })
    loadCanvas();
})