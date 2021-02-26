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

let socket = io()

var coffeeshop, atlassianCard, person1, gym, stadium, office;

let people = {}

let officeX = 155
let officeY = 10
let officeYTrue = 10

let X = {
    'office': 158,
    'coffeeshop': 801,
    'atlassianCard': 542,
    'gym':287,
    'stadium':425
}
let Y = {
    'office': -17,
    'coffeeshop': 142,
    'atlassianCard':378,
    'gym':-14,
    'stadium':133
}

// hitbox toggles
let officeBox = false
let coffeehopBox = false
let atlassianCardBox = false
let gymBox = false
let stadiumBox = false

let Up = {
    'office': false,
    'coffeeshop': false,
    'atlassianCard': false,
    'gym': false,
    'stadium': false
}

let user

if (!localStorage.user && (typeof localStorage.user === 'undefined')) user = ""
else user = JSON.parse(localStorage["user"])

function loadCanvas() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    var camerax = 609, cameray = 423;
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
        ctx.drawImage(coffeeshop, X['coffeeshop'], Y['coffeeshop']);
        ctx.drawImage(gym, X['gym'], Y['gym']);
        ctx.drawImage(stadium, X['stadium'], Y['stadium']);
        ctx.drawImage(office, X['office'], Y['office']);
        ctx.drawImage(atlassianCard, X['atlassianCard'], Y['atlassianCard'], 85, 85);
        
        
        ctx.fillStyle = "black";
        ctx.fillRect(camerax-2, cameray-15, 18, 12);
        ctx.font = "10px Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Me", camerax+7, cameray-5);
        

        ctx.drawImage(person1, camerax, cameray, 20, 40);



        //SPAWNING DONT MIND!
        const keys = Object.keys(people);

        keys.forEach((key) => {
            let dummyPerson=people[key];

            ctx.fillStyle = "white";
            ctx.fillRect(dummyPerson.x-15, dummyPerson.y-15, 40, 12);
            ctx.font = "10px Comic Sans MS";
            ctx.fillStyle = "blue";
            ctx.textAlign = "center";
            let username=key.split("@")[0];
            ctx.fillText(username, dummyPerson.x+7, dummyPerson.y-5);
            person2.src="assets/p"+dummyPerson["o"]+".png";
            ctx.drawImage(person2, dummyPerson.x, dummyPerson.y, 20, 40);
        });
    }

    function init() {
      
        canvas.width = document.getElementById("canvas").width;
        canvas.height = document.getElementById("canvas").height;
        var counter = 3;

        // canvas.globalCompositeOperation = "destination-over";
        coffeeshop = new Image();
        coffeeshop.src = "./assets/coffeeshop.png";
        coffeeshop.onload = function () {
            ctx.drawImage(coffeeshop, 830, 160, 226.87, 165);
        }

        gym = new Image();
        gym.src = "./assets/gym.png";
        gym.onload = function () {
            ctx.drawImage(gym, 330, 8, 250, 180);

        }
        stadium = new Image();
        stadium.src = "./assets/stadium.png";
        stadium.onload = function () {
            ctx.drawImage(stadium, 440, 140, 354.6, 275);

        }
        office = new Image();
        office.src = "./assets/office.png";
        office.onload = function () {
            ctx.drawImage(office, 180, 10, 224, 280);

        }
        person1 = new Image();
        person1.src = "./assets/person1.png";
        // person1.onload = function () {
        //     counter--;
        //     if (counter <= 0) {
        //         ctx.drawImage(atlassianCard, 520, 380, 90, 90);
        //         ctx.drawImage(person1, 580, 390, 20, 40);
                
        //     }
        // }
        person2 = new Image();
        person2.src = "./assets/person1.png";
        atlassianCard = new Image();
        atlassianCard.src = "./assets/atlassian.png";
        // atlassianCard.onload = function () {
        //     counter--;
        //     if (counter <= 0) {
        //         ctx.drawImage(atlassianCard, 520, 380, 90, 90);
        //         ctx.drawImage(person1, 580, 390, 20, 40);
        
        //     }
        // }
    }

    function dist(x1, y1, x2, y2){
        var a = x1 - x2;
        var b = y1 - y2;
        var c = Math.sqrt( a*a + b*b );
        return c
    }

    function lift (building) {
        Up[building] = true
        let tempY = officeY;
        let interval = setInterval(() => {
            Y[building] -= 2
        }, 50);
        setTimeout(() => {
            clearInterval(interval)
        }, 250)
    }
    function drop (building) {
        Up[building] = false
        let interval = setInterval(() => {
            Y[building] += 2
        }, 50);
        setTimeout(() => {
            clearInterval(interval)
        }, 250)
    }

    function keyListener(e){
        e = e || window.event
       
        if(e.keyCode==37){
            if (camerax >10) {
                person1.src="./assets/pl.png";
                
                cameray -= 5*0.5;
                camerax -= 5*0.866;
                socket.emit('locsend', {
                    x: camerax,
                    y: cameray,
                    o: "l",
                    user : user.email
                })

            }
        }
        else if(e.keyCode==39){
            if (camerax < 1000) {
                person1.src="./assets/pr.png";
                cameray += 5*0.5;
                camerax += 5*0.866;
                socket.emit('locsend', {
                    x: camerax,
                    y: cameray,
                    o: "r",
                    user : user.email
                })
            }
        }
        else if(e.keyCode==38){
            if (cameray > 10) {
                person1.src="./assets/pu.png";
                cameray -= 5*0.5;
                camerax += 5*0.866;
                socket.emit('locsend', {
                    x: camerax,
                    y: cameray,
                    o: "u",
                    user : user.email
                })
            }
        }
        else if(e.keyCode==40){
            if (cameray < 1000) {
                person1.src="./assets/pd.png";
                cameray += 5*0.5;
                camerax -= 5*0.866;
                socket.emit('locsend', {
                    x: camerax,
                    y: cameray,
                    o: "d",
                    user : user.email
                })
            }
        }       
        // Enter key press for lifted building
        if(e.keyCode==13){
            if(Up['office']){
                 $('#overlayOffice').show()
                 $('#crossBtn').show()
            }
            if(Up['atlassianCard']){
                    $('#overlayAboutUs').show()
                    $('#crossBtn').show()
            }
            if(Up['gym']){
                 $('#overlayGym').show()
                $('#crossBtn').show()
            }
            if(Up['coffeeshop']){
                 $('#overlayCafe').show()
                $('#crossBtn').show()
            }
            if(Up['stadium']){
                 $('#overlayStadium').show()
                $('#crossBtn').show()
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
    let checkTriggerShift = setInterval(() => {
        if(officeBox==true && Up['office']==false){
            lift('office')
        }
        else if(officeBox==false && Up['office']==true)
            drop('office')

        if(gymBox==true && Up['gym']==false){
            lift('gym')
        }
        else if(gymBox==false && Up['gym']==true)
            drop('gym')


        if(atlassianCardBox==true && Up['atlassianCard']==false){
            lift('atlassianCard')
        }
        else if(atlassianCardBox==false && Up['atlassianCard']==true)
            drop('atlassianCard')

        if(stadiumBox==true && Up['stadium']==false){
            lift('stadium')
        }
        else if(stadiumBox==false && Up['stadium']==true)
            drop('stadium')

        if(coffeehopBox==true && Up['coffeeshop']==false){
            lift('coffeeshop')
        }
        else if(coffeehopBox==false && Up['coffeeshop']==true)
            drop('coffeeshop')

    }, 100);
    let checkHitbox = setInterval(() => {
        if(dist(camerax,cameray,355,235) < 20)
            officeBox = true
        else
            officeBox = false

        if(dist(camerax,cameray,537,90) < 20)
            gymBox = true
        else
            gymBox = false

        if(dist(camerax,cameray,609,423) < 20)
            atlassianCardBox = true
        else
            atlassianCardBox = false

        if(dist(camerax,cameray,522,298) < 20)
            stadiumBox = true
        else
            stadiumBox = false

        if(dist(camerax,cameray,864,276) < 20){
            coffeehopBox = true
        }
            
        else{
            coffeehopBox = false
        }

        if(coffeehopBox === true || stadiumBox === true ||atlassianCardBox === true || gymBox === true || officeBox === true) {
            $('.infobar2').show()
        }
        else $('.infobar2').hide()


            
    }, 50);
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
    if (!localStorage.user && (typeof localStorage.user === 'undefined'))
        $('#overlayLogin').show()
    $('#overlayGym').hide()
    $('#overlayStadium').show()
    $('#overlayOffice').hide()
    $('#overlayAboutUs').hide()
    $('#overlayCafe').hide()
    $('#crossBtn').hide()
    $('.gameWindow').hide()

    let game1 = false
    let game2 = false
    let game3 = false
    let game4 = false

    setTimeout(() => {
        console.log("Sending request to Socket")
        socket.emit('connected', {
            message :"Connection Successful!"
        })
        socket.on('locrec', data => {
            if(data.user != user.email) {
                people[data.user] = data
            }
            console.log(data)
        })
    }, 500)

    $('#loginBtn').click(() => {
        const email = $("#loginEmail").val()
        const password = $("#loginPassword").val()
        postData('./route/login', { email: email, password: password })
            .then(data => {
                if (data.done === true) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    user = data.user
                    console.log(data.user)
                    $('.overlayLogin').hide()

                }
                else {
                    console.log("Error")
                    alert(data.message)
                }
            });
    })
    $('#crossBtn').click(() => {
        console.log('clicked')
        if($('#overlayOffice').is(":visible")){
            $('#overlayOffice').hide()
            $('#crossBtn').hide()
        }
        if($('#overlayLogin').is(":visible")){
            $('#overlayLogin').hide()
            $('#crossBtn').hide()
        }
        if($('#overlayAboutUs').is(":visible")){
            $('#overlayAboutUs').hide()
            $('#crossBtn').hide()
        }
        if($('#overlayCafe').is(":visible")){
            $('#overlayCafe').hide()
            $('#crossBtn').hide()
        }
        if($('#overlayStadium').is(":visible")){
            $('#overlayStadium').hide()
            $('#crossBtn').hide()
        }
        if($('#overlayGym').is(":visible")){
            document.getElementById('videoPlayer').pause()
            $('#overlayGym').hide()
            $('#crossBtn').hide()
        }
    })
    $('#game1').click(() => {
        document.getElementById("game1").style.border = "3px solid rgb(58, 232, 255)";
        document.getElementById("game2").style.border = "none";
        document.getElementById("game3").style.border = "none";
        document.getElementById("game4").style.border = "none";
        game1 = true
        game2 = false
        game3 = false
        game4 = false
    })
    $('#game2').click(() => {
        document.getElementById("game1").style.border = "none";
        document.getElementById("game2").style.border = "3px solid rgb(58, 232, 255)";
        document.getElementById("game3").style.border = "none";
        document.getElementById("game4").style.border = "none";
        game1 = false
        game2 = true
        game3 = false
        game4 = false
        
    })
    $('#game3').click(() => {
        document.getElementById("game1").style.border = "none";
        document.getElementById("game2").style.border = "none";
        document.getElementById("game3").style.border = "3px solid rgb(58, 232, 255)";
        document.getElementById("game4").style.border = "none";
        game1 = false
        game2 = false
        game3 = true
        game4 = false
    })
    $('#game4').click(() => {
        document.getElementById("game1").style.border = "none";
        document.getElementById("game2").style.border = "none";
        document.getElementById("game3").style.border = "none";
        document.getElementById("game4").style.border = "3px solid rgb(58, 232, 255)";
        game1 = false
        game2 = false
        game3 = false
        game4 = true
    })
    $('#gameCrossBtn').click(() => {
        document.getElementById("game1").style.border = "none";
        document.getElementById("game2").style.border = "none";
        document.getElementById("game3").style.border = "none";
        document.getElementById("game4").style.border = "none";
        game1 = false
        game2 = false
        game3 = false
        game4 = false
        $('.gameWindow').hide()
        $('.recCenter').show()
        $('.chooseGame').show()
    })

    $('#createGame').click(() => {
        if(game1 == true)
            document.getElementById("gameWindow").src = "https://skribbl.io/"
        if(game2 == true)
            document.getElementById("gameWindow").src = "https://codenames.game/"
        if(game3 == true)
            document.getElementById("gameWindow").src = "https://cardsagainsthumanity.com/"
        if(game4 == true)
            document.getElementById("gameWindow").src = "https://www.catan.com/game/catan-universe#"
            $('.gameWindow').show()
            $('.recCenter').hide()
            $('.chooseGame').hide()
        })
    $('#joinGame').click(() => {
        if(game1 == true)
            document.getElementById("gameWindow").src = "https://skribbl.io/"
        if(game2 == true)
            document.getElementById("gameWindow").src = "https://codenames.game/"
        if(game3 == true)
            document.getElementById("gameWindow").src = "https://cardsagainsthumanity.com/"
        if(game4 == true)
            document.getElementById("gameWindow").src = "https://www.catan.com/game/catan-universe"
            $('.gameWindow').show()
            $('.recCenter').hide()
            $('.chooseGame').hide()
        })
    $('#joinPrivate').click(() => {
        if(game1 == true)
            document.getElementById("gameWindow").src = "https://skribbl.io/"
        if(game2 == true)
            document.getElementById("gameWindow").src = "https://codenames.game/"
        if(game3 == true)
            document.getElementById("gameWindow").src = "https://cardsagainsthumanity.com/"
        if(game4 == true)
            document.getElementById("gameWindow").src = "https://www.catan.com/game/catan-universe#"
        $('.gameWindow').show()
        $('.recCenter').hide()
        $('.chooseGame').hide()
    })
    loadCanvas();
})