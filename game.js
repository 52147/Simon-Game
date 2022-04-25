var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = []; //Check Which Button is Pressed

var started = false;
var level = 0;

$(document).keydown(function () {
  if (level === 0) {
    nextSequence();
  }
});

$(".start").click(function () {
  if (level === 0) {
    nextSequence();
  }
});

$(".btn").click(function (e) {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function (e) {
  arrows(e.keyCode);
});

function arrows(keyCode) {
  switch (keyCode) {
    case 38:
      userClickedPattern.push("green");
      playSound("green");
      animatePress("green");
      checkAnswer(userClickedPattern.length - 1);
      break;

    case 37:
      userClickedPattern.push("yellow");
      playSound("yellow");
      animatePress("yellow");
      checkAnswer(userClickedPattern.length - 1);
      break;

    case 39:
      userClickedPattern.push("blue");
      playSound("blue");
      animatePress("blue");
      checkAnswer(userClickedPattern.length - 1);
      break;

    case 40:
      userClickedPattern.push("red");
      playSound("red");
      animatePress("red");
      checkAnswer(userClickedPattern.length - 1);
      break;

    default:
      console.log("Dont you know my name is Simon")
  }

}



// $(document).keypress(function () {
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });



// $(".btn").click(function () {

//   var userChosenColour = $(this).attr("id");
//   userClickedPattern.push(userChosenColour);

//   playSound(userChosenColour);
//   animatePress(userChosenColour);

//   checkAnswer(userClickedPattern.length - 1);
// });


// Check the User's Answer Against the Game Sequence8
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000); //  Call nextSequence() after a 1000 millisecond delay.
    }
  } else {
    playSound("wrong"); // the user got one of the answers wrong, play song
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200); // remove song after 200 milliseconds.

    startOver();
  }
}

// Show the Sequence to the User with Animations and Sounds
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


// Add Animations to User Clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// Add Sounds to Button Clicks
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// StartOver if the user gets the sequence wrong
// reset the values of level, gamePattern and started variables
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}