var PizzaDancer = function(top, left){

  var dancerImages = {
    don: 'https://dl.dropboxusercontent.com/u/19660570/donnie.gif', 
    raph: 'http://rs891.pbsrc.com/albums/ac118/Deathwish_Zero/NinjaTurtlesGif.gif~c200',
    leo: 'https://dl.dropboxusercontent.com/u/19660570/leo.gif',
    mike: 'https://dl.dropboxusercontent.com/u/19660570/mike.gif'
  };
  var charIdx = randomBetween(0, window.chars.length)
  var danceImg = dancerImages[chars[charIdx]];
  this.celebrationImg = 'http://media3.giphy.com/media/eXc9n3kzIjpT2/giphy.gif';
  debugger;
  ImageDancer.call(this, top, left, 100, danceImg);
  this.speed = 25;
  this.cowabunga = 'http://66.90.91.26/ost/teenage-mutant-ninja-turtles-iv-turtles-in-time/nwiqpcavnr/32.cowabunga-.mp3';
   
};

PizzaDancer.prototype = Object.create(ImageDancer.prototype);
PizzaDancer.prototype.constructor = PizzaDancer;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
PizzaDancer.prototype.oldStep = PizzaDancer.prototype.step;

PizzaDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  var centerX = getCenter(this.left, this.scaledWidth);
  var centerY = getCenter(this.top, this.scaledHeight);
  var closestDistance;
  var closestAngle;
  var mouseThreshold = Math.PI/3;
  var mouseDistanceX = window.mouseX - centerX;
  var mouseDistanceY = window.mouseY - centerY;
  var mouseDistance = Math.sqrt(Math.pow(mouseDistanceX, 2) + Math.pow(mouseDistanceY, 2));
  var mouseAngle = Math.atan(mouseDistanceX/mouseDistanceY);

  if (window.mouseY < centerY){
    mouseAngle += Math.PI;
  }


  window.dancers.filter(function(dancer){
    return dancer instanceof Pizza;
  }).forEach(function(pizza){
    var pizzaCenterX = getCenter(pizza.left, pizza.scaledWidth);
    var pizzaCenterY = getCenter(pizza.top, pizza.scaledHeight);

    var distanceX = pizzaCenterX - centerX;
    var distanceY = pizzaCenterY - centerY;
    var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

    if(distance < this.speed){
      // got to a pizza

      var pizzaIndex = dancers.indexOf(pizza);
      dancers.splice(pizzaIndex, 1);
      this.endStep();
      pizza.$node.animate({height: 0, width: 0}, 2000, 'swing', function(){
        pizza.$node.remove();
        this.setImage(this.celebrationImg);
        this.playAudio(this.cowabunga);
        this.$node.animate({
          width: 250,
          height: 250,
          'background-size': 250
        }, 2500, 'linear', function(){
          this.$node.remove();
          var dancerIndex = dancers.indexOf(this);
          dancers.splice(dancerIndex, 1);
        }.bind(this))
      }.bind(this));
    }
    if(closestDistance === undefined || distance < closestDistance){
      closestAngle = Math.atan(distanceX/distanceY);
      if (pizzaCenterY < centerY){
        closestAngle += Math.PI;
      }

      // Avoid mouse maths
      if(distance > mouseDistance && mouseDistance < 400){
        if(mouseAngle - mouseThreshold < closestAngle && closestAngle < mouseAngle + mouseThreshold){
          if(closestAngle < mouseAngle){
            closestAngle = mouseAngle - mouseThreshold;
          } else {
            closestAngle = mouseAngle + mouseThreshold;
          }
        }
      }
      closestDistance = distance;
    }
  }.bind(this));

  if(closestAngle !== undefined){
    this.top += this.speed * Math.cos(closestAngle);
    this.left += this.speed * Math.sin(closestAngle);

    var styleSettings = {
      top: this.top,
      left: this.left
    }

    this.$node.animate(styleSettings, this.timeBetweenSteps, 'linear');   
  }
};

