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
    var counter = 3;

    // canvas.globalCompositeOperation = "destination-over";
    var coffeeshop = new Image();
    coffeeshop.src = "assets/coffeeshop.png";
    coffeeshop.onload = function () {
        ctx.drawImage(coffeeshop, 830, 160, 226.87, 165);
    }

    var gym = new Image();
    gym.src = "assets/gym.png";
    gym.onload = function () {
        ctx.drawImage(gym, 330, 8, 250, 180);
        
    }
    var stadium = new Image();
    stadium.src = "assets/stadium.png";
    stadium.onload = function () {
        ctx.drawImage(stadium, 440, 140, 354.6, 275);
        
    }
    var office = new Image();
    office.src = "assets/office.png";
    office.onload = function () {
        ctx.drawImage(office, 180, 10, 224, 280);
        
    }
    var person1 = new Image();
    person1.src = "assets/person1.png";
    person1.onload = function () {
        counter--;
        if (counter<=0) {
            ctx.drawImage(atlassianCard, 520, 380, 90, 90);
            ctx.drawImage(person1, 580, 390, 35, 70);
            ctx.drawImage(person2, 450, 340, 35, 70);
        }
    }
    
    var person2 = new Image();
    person2.src = "assets/person2.png";
    person2.onload = function () {
        counter--;
        if (counter<=0) {
            ctx.drawImage(atlassianCard, 520, 380, 90, 90);
            ctx.drawImage(person1, 580, 390, 35, 70);
            ctx.drawImage(person2, 450, 340, 35, 70);
        }
    }
    var atlassianCard = new Image();
    atlassianCard.src = "assets/atlassian.png";
    atlassianCard.onload = function () {
        counter--;
        if (counter<=0) {
            ctx.drawImage(atlassianCard, 520, 380, 90, 90);
            ctx.drawImage(person1, 580, 390, 35, 70);
            ctx.drawImage(person2, 450, 340, 35, 70);
        }
    }
    

}

$(document).ready(function () {
    // if (!localStorage.user && (typeof localStorage.user === 'undefined'))
    //  $('#overlayLogin').show()
    //  $('#overlayCollab').show()
     $('#overlayAboutUs').show()

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