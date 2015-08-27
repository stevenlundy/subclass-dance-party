var DizzyDancer = function(top, left, timeBetweenSteps){

  Dancer.apply(this, arguments);
  this.left = left;
  this.top = top;
  this.direction = 1;
  this.radius = randomBetween(20, 50);
  this.theta = 8* Math.PI;
  this.centerY = top;
  this.centerX = this.left - this.radius;
   
};

DizzyDancer.prototype = Object.create(Dancer.prototype);
DizzyDancer.prototype.constructor = DizzyDancer;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
DizzyDancer.prototype.oldStep = DizzyDancer.prototype.step;

DizzyDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();

  this.theta -= 0.5;
  this.top = this.centerY +  this.radius * Math.sin(this.theta);
  this.left = this.centerX + this.radius * Math.cos(this.theta);
  var styleSettings = {
    top: this.top,
    left: this.left
  };
  this.$node.animate(styleSettings, this.timeBetweenSteps, 'linear');
};

DizzyDancer.prototype.lineUp = function(top, left, time){
  this.centerX = left;
  this.centerY = top;
}