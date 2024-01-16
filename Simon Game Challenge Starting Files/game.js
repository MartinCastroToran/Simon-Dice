
var start = false
var gamePattern = [];
var userClickedPattern = [];
var randomNumber = Math.floor(Math.random() * 4);
var level = 0
var buttonsColour = ["red", "blue", "green", "yellow"];
var randomChosenColour = buttonsColour[randomNumber];
var userChosenColour = "";

$(".btn").click(function(){
    if(start === true){
        console.log(this);
        userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
    }
    makeSound(userChosenColour);
    animatePress(this);
    checkAnswer(userClickedPattern);
})

$(document).keypress(function(event){

    if(event.key === "a"){
        if(start !== true){
            nextSequence();
            start = true;
            $("#level-title").html("level " + level);  
        }
    }
})


function nextSequence(){
    level++;
    userClickedPattern = [];
    $("#level-title").html("level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonsColour[randomNumber];
    gamePattern.push(randomChosenColour);
    setTimeout(function(){
        makeSound(randomChosenColour);
        animatePress("#" + randomChosenColour);
    }, 1000)
    }

function makeSound(name){
    
    switch(name){
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break; 
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break; 
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break; 
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play(); 
            break;             
    }
                
}

function animatePress(currentColor){
    $(currentColor).addClass("pressed");
    setTimeout(function(){
        $(currentColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(userList){
    if(start === true){
        var i = userList.length - 1
            if(userList[i] === gamePattern[i]){
                if(userList.length === gamePattern.length){
                    nextSequence()
                }
            }
            else{
                gameOver()
            }
        }


    }

function gameOver(){
    $("h1").html("GAME OVER, press 'a' to continue");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play(); 
    console.log(gamePattern);
    console.log(userClickedPattern);
    start = false
    level = 0
    gamePattern = [];
    userClickedPattern = [];
}