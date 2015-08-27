var PizzaDancer = function(top, left){
  
  var danceImg = 'http://rs891.pbsrc.com/albums/ac118/Deathwish_Zero/NinjaTurtlesGif.gif~c200';
  var celebrationImg = 'http://s3.amazonaws.com/rapgenius/1349066261_ngbbs4a295a544f815.gif';
  //http://media3.giphy.com/media/eXc9n3kzIjpT2/giphy.gif
  ImageDancer.call(this, top, left, 200, danceImg);
  this.left = left;
  this.top = top;
  this.speed = 50;
   
};

PizzaDancer.prototype = Object.create(Dancer.prototype);
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
  for(var i = 0; i < window.dancers.length; i++){
    debugger;
    if(window.dancers[i] instanceof Pizza) {
      var pizza = window.dancers[i];
      var pizzaCenterX = getCenter(pizza.left, pizza.scaledWidth);
      var pizzaCenterY = getCenter(pizza.top, pizza.scaledHeight);

      var distanceX = pizzaCenterX - centerX;
      var distanceY = pizzaCenterY - centerY;
      var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
      if(closestDistance === undefined || distance < closestDistance){
        closestDistance = distance;
        closestAngle = Math.atan(distanceX/distanceY);
      }
    }
  }

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

