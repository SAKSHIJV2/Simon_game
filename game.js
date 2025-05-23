var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var useClickedPattern=[];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})
$(".btn").click(function(){
    var userChoosenColor=$(this).attr("id");
    useClickedPattern.push(userChoosenColor);    
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(useClickedPattern.length-1);
});
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === useClickedPattern[currentLevel]) {
    console.log("success");
    if (useClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

        }
    } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
    $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    }
}
function nextSequence(){
    useClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor((Math.random()*4));
    var randomChoosenColor=buttonColors[randomNumber];
    console.log(randomChoosenColor);
    gamePattern.push(randomChoosenColor);
    
    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChoosenColor); 
    animatePress(userChoosenColor);   
}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();  
}
function animatePress(currentColor){
   $("#"+currentColor).click(function(){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
   })
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


