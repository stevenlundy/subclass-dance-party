// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){

    // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  this.timeBetweenSteps = timeBetweenSteps;

  this.step(); 
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);


};

Dancer.prototype.step = function(){
    // the basic dancer doesn't do anything interesting at all on each step,
    // it just schedules the next step
  this.timerID = setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.endStep = function() {
  clearTimeout(this.timerID);
};

Dancer.prototype.setPosition = function(top, left){
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.lineUp = function(top, left, time) {
  this.$node.animate({top: top, left: left}, time);
}

Dancer.prototype.playAudio = function(audioURL) {
  var audio = new Audio();
  audio.src = audioURL;
  audio.play();
}

window.randomBetween = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

window.getCenter = function (distance, dimension) {
  return distance + dimension/2;
}