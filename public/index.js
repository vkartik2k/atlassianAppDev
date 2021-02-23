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
var myGamePiece;




function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}


function move(dir) {
    myGamePiece.image.src = "angry.gif";
    if (dir == "up") {myGamePiece.Yspeed = -1; }
    if (dir == "down") {myGamePiece.speedY = 1; }
    if (dir == "left") {myGamePiece.speedX = -1; }
    if (dir == "right") {myGamePiece.speedX = 1; }
}

function clearmove() {
    myGamePiece.image.src = "smiley.gif";
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}

function loadCanvas() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = document.getElementById("canvas").width;
    canvas.height = document.getElementById("canvas").height;
    
    var atlassianCard = new Image();
    atlassianCard.src = "assets/atlassian.png";
    atlassianCard.width=canvas.width;
    atlassianCard.height=canvas.height;
    // Make sure the image is loaded first otherwise nothing will draw.
    atlassianCard.onload = function () {
        ctx.drawImage(atlassianCard, 540, 340);
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