var gamePattern = [];
var userPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

function playSound(color) {
    var audio = new Audio($("#"+color+"A").attr("src"))
    audio.play();
}

function checkAnswer() {
    var user = [];
        for (let i = 0; i < gamePattern.length; i++) {
            if (userPattern[i] === gamePattern[i]) {
                user.push(true);
            }
            else {
                user.push(false);
            }}
        if (user.every(userA => userA)) {
                level = ++level;
                $("h1").text("Level "+level);
                userPattern = [];
                nextSequence();
        }
        else {
            $("h1").text("Failed, Press Any Key To Restart");
            setTimeout(function () {
                playSound("wrong");
            }, 300)  
        }
}

function nextSequence() {
    setTimeout(function() {
        var randNum = Math.floor(Math.random()*4);
        var randomColor = (buttonColors[randNum]);
        gamePattern.push(randomColor);
        $("#"+gamePattern[gamePattern.length -1]).addClass("pressed").fadeOut(100).fadeIn(100).removeClass("pressed");
        playSound(randomColor);
    }, 1000);
    
}

$(".btn").click(function() {
    userPattern.push(this.id);
    playSound(this.id);
    $("#"+this.id).addClass("pressed").fadeOut(100).fadeIn(100).removeClass("pressed");
    if (userPattern.length === gamePattern.length) {
        checkAnswer();
    }
    else {}
})


$(document).on("keypress", function() {
    if ($("h1").text() === "Press A Key to Start") {
        nextSequence();
        $("h1").text("Level "+level); 
    }
    if ($("h1").text() === "Failed, Press Any Key To Restart") {
            gamePattern = [];
            level = 0;
            userPattern = [];
            $("h1").text("Level "+level); 
            nextSequence();
        }
    else {
    }
});