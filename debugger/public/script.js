

var easySpeed = 0.5,
    mediumSpeed = 1,
    hardSpeed = 1.5,
    extraHardSpeed = 2

var speed; 

var counter = 0;
var timerId = 60;
var timer = 60;

$.fn.bounce = function(speed) {
    var speed = speed
    return $(this).each(function() {
      var $this = $(this),
      $parent = $this.parent(),
      height = $parent.height(),
      width = $parent.width(),
      top = (Math.floor(Math.random() * (height / 2)) + height / 4),
      left = (Math.floor(Math.random() * (width / 2)) + width / 4),
      vectorX = speed * (Math.random() > 0.5 ? 1 : -1),
      vectorY = speed * (Math.random() > 0.5 ? 1 : -1);

      $this.css({
        'top': top ,
        'left': left
      }).data('vector', {
        'x': vectorX ,
        'y': vectorY
      });

      move = function($e) {
        position = $e.position(),
        width = $e.width(),
        height = $e.height(),
        vector = $e.data('vector'),
        $parent = $e.parent();
        if (position.left <= 0 && vector.x < 0) {
          vector.x = -1 * vector.x;
        }
        if ((position.left + width) >= $parent.width()) {
          vector.x = -1 * vector.x;
        }
        if (position.top <= 0 && vector.y < 0) {
          vector.y = -1 * vector.y;
        }
        if ((position.top + height) >= $parent.height()) {
          vector.y = -1 * vector.y;
        }

        $e.css({
          'top': position.top + vector.y + 'px',
          'left': position.left + vector.x + 'px'
        }).data('vector', {
          'x': vector.x,
          'y': vector.y
        });

        setTimeout(function() {move($e)}, 50);

      };

      move($this);
    });

};

function startCountdown(timer) {
    timer = 60; 
    clearInterval(timerId);
    timerId = setInterval(updateTime, 1000)
}

function updateTime() {
  timer-- ;
  $("#timer").text("Timer: "  + timer);
  if (timer === 0){
    endGame()
  }
}

function removeABug(bug) {
  bug.remove();
}


function updateScore(counter){
  $('#score').html("");
  $('#score').append("<h3>Score: "+ counter +"</h3>");
  if(counter === 15){
    $('#container').html("").append("<div id = 'winner'><h2>Hello, World!</h2></div>")
    clearInterval(timerId)
  }
}

function updateSpeed(){
  var myArray = [-1, 1]
  $.each($('#board img'), function(index, val){
    $val = $(val);
    $parent = $val.parent(),
    height = $parent.height(),
    width = $parent.width(),
    top = (Math.floor(Math.random() * (height / 2)) + height / 4),
    left = (Math.floor(Math.random() * (width / 2)) + width / 4),
    vectorX = speed * (Math.random() > 0.5 ? 1 : -1),
    vectorY = speed * (Math.random() > 0.5 ? 1 : -1);
    move($val);
  });
}

function endGame(){
  $('#container').html("").append("<div id = 'loser'><img class= 'massive' src= 'images/bug.gif'><h1>Hahahah, we win......</h1></div>");
  clearInterval(timerId);
  counter = 0;
}

bugsClicked = function(){
  var bug  = event.target
   counter += 1 ;
  updateScore(counter);
  removeABug(bug);
  updateSpeed();
  // debugger;
  // var newSpeed + 0.1;
}

function startGame() {
  var id = $(this).attr('id');
  switch (id) {
    case "easy":
    speed = easySpeed
    break;
    case "medium":
    speed = mediumSpeed;
    break;
    case "hard":
    speed = hardSpeed;
    case "extra-hard":
    speed = extraHardSpeed;
    break;
  }
  startCountdown(timer)
  var $board = $('#board');
  for(var i = 0; i<15;i++){
    $board.append('<img class = "bug" src="images/bug.gif">')
    $('#board img').bounce(speed);
  }
}

$(function() {
  $('#newgame').hide();
  $("#levels button").on("click", startGame);
  $("#board").on('click','.bug',  bugsClicked);
  $("#board")
    // .mouseup(function() {
    //   $(".mouse").removeClass("rotate");
    // })
    .click(function() {
        $(".mouse").addClass("rotate");
        setTimeout(function() { $(".mouse").removeClass("rotate")}, 200);
      });

  $('#newgame').click(function() {
      location.reload();
  });
  $("#levels button").click(function(){
   $("#levels").toggle();
   $('#newgame').show();
  });
        
  $("#new button").click(function(){
   $("#newgame").toggle();
  });
  $('#board').on('mousemove', function(e){
      $('.mouse').css({
         left:  e.pageX -450,
         top:   e.pageY -450
      });
  });
});