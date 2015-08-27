var RainbowBlinkyDancer = function(top, left, timeBetweenSteps){

  BlinkyDancer.apply(this, arguments);
  this.color = 0;
   
};

RainbowBlinkyDancer.prototype = Object.create(BlinkyDancer.prototype);
RainbowBlinkyDancer.prototype.constructor = RainbowBlinkyDancer;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
RainbowBlinkyDancer.prototype.midStep = RainbowBlinkyDancer.prototype.step;

RainbowBlinkyDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.midStep();

  this.color = randomBetween(0, 360);
  var styleSettings = {
    'border-color': 'hsl('+this.color+', 100%, 40%)'
  };
  this.$node.css(styleSettings);
};