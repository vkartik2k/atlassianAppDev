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
    person: {
        x: 10,
        y: 20,
        orientation: 0
    }
}
let templates = {
}
var coffeeshop, atlassianCard, person1, gym, stadium, office;

let officeX = 180
let officeY = 10

function loadCanvas() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    var camerax = 580, cameray = 400;
    var fps = 60;
    var img;
    var loop;

    function update() {
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGround();
        // cameray-=1;
        // camerax+=1;


    }

    function drawGround() {
        ctx.drawImage(coffeeshop, 830, 160, 226.87, 165);
        ctx.drawImage(gym, 330, 8, 250, 180);
        ctx.drawImage(stadium, 440, 140, 354.6, 275);
        ctx.drawImage(office, officeX, officeY, 224, 280);
        ctx.drawImage(atlassianCard, 520, 380, 90, 90);
        ctx.drawImage(person1, camerax, cameray, 20, 40);
    }

    function init() {
      
        canvas.width = document.getElementById("canvas").width;
        canvas.height = document.getElementById("canvas").height;
        var counter = 3;

        // canvas.globalCompositeOperation = "destination-over";
        coffeeshop = new Image();
        coffeeshop.src = "assets/coffeeshop.png";
        coffeeshop.onload = function () {
            ctx.drawImage(coffeeshop, 830, 160, 226.87, 165);
        }

        gym = new Image();
        gym.src = "assets/gym.png";
        gym.onload = function () {
            ctx.drawImage(gym, 330, 8, 250, 180);

        }
        stadium = new Image();
        stadium.src = "assets/stadium.png";
        stadium.onload = function () {
            ctx.drawImage(stadium, 440, 140, 354.6, 275);

        }
        office = new Image();
        office.src = "assets/office.png";
        office.onload = function () {
            ctx.drawImage(office, 180, 10, 224, 280);

        }
        person1 = new Image();
        person1.src = "assets/person1.png";
        // person1.onload = function () {
        //     counter--;
        //     if (counter <= 0) {
        //         ctx.drawImage(atlassianCard, 520, 380, 90, 90);
        //         ctx.drawImage(person1, 580, 390, 20, 40);
                
        //     }
        // }

        atlassianCard = new Image();
        atlassianCard.src = "assets/atlassian.png";
        // atlassianCard.onload = function () {
        //     counter--;
        //     if (counter <= 0) {
        //         ctx.drawImage(atlassianCard, 520, 380, 90, 90);
        //         ctx.drawImage(person1, 580, 390, 20, 40);
        
        //     }
        // }
    }

    function lift (building) {
        let tempY = officeY;
        let interval = setInterval(() => {
            officeY -= 0.5
        }, 100);
        setTimeout(() => {
            clearInterval(interval)
            officeY = tempY
        }, 2000)
    }

    function keyListener(e){
        e = e || window.event
       
        if(e.keyCode==37){
            if (camerax >10) {
                person1.src="assets/pl.png";
                cameray -= 5*0.5;
                camerax -= 5*0.866;
            }
        }
        else if(e.keyCode==39){
            if (camerax < 1000) {
                person1.src="assets/pr.png";
                cameray += 5*0.5;
                camerax += 5*0.866;
            }
        }
        else if(e.keyCode==38){
            if (cameray > 10) {
                person1.src="assets/pu.png";
                cameray -= 5*0.5;
                camerax += 5*0.866;
            }
        }
        else if(e.keyCode==40){
            if (cameray < 1000) {
                person1.src="assets/pd.png";
                cameray += 5*0.5;
                camerax -= 5*0.866;
            }
        }                           
     }

     window.onkeydown = function(e) {
         keyListener(e);
     }
    
    init();
    var loop = setInterval(function () {
        update();
        draw();
        document.getElementById("xvalue").innerHTML = Math.round(camerax,2);
        document.getElementById("yvalue").innerHTML = Math.round(cameray,2);
    }, 1000 / fps);
    lift(office)
    (function () {
        function checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }

        function startTime() {
            var today = new Date(),
                h = checkTime(today.getHours()),
                m = checkTime(today.getMinutes()),
                s = checkTime(today.getSeconds());
            document.getElementById('timevalue').innerHTML = h + ":" + m + ":" + s;
            t = setTimeout(function () {
                startTime()
            }, 500);
        }
        startTime();
    })();

}

$(document).ready(function () {
    // if (!localStorage.user && (typeof localStorage.user === 'undefined'))
    //  $('#overlayLogin').show()
    //  $('#overlayCollab').show()
    //  $('#overlayAboutUs').show()

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