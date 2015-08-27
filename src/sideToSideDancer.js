var SideToSideDancer = function(top, left, timeBetweenSteps){

  Dancer.apply(this, arguments);
  this.left = left;
  this.distance = randomBetween(100, 500);
  this.direction = -1;
  this.orientation = 'h';
   
};

SideToSideDancer.prototype = Object.create(Dancer.prototype);
SideToSideDancer.prototype.constructor = SideToSideDancer;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
SideToSideDancer.prototype.oldStep = SideToSideDancer.prototype.step;

SideToSideDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  if(this.orientation === 'h'){
    this.direction *= -1;
    this.left += this.distance * this.direction;
    this.$node.animate({left: this.left}, this.timeBetweenSteps);
  } else {
    this.direction *= -1;
    this.top += this.distance * this.direction;
    this.$node.animate({top: this.top}, this.timeBetweenSteps);
  }

};

SideToSideDancer.prototype.lineUp = function(top, left, time) {
  this.orientation = 'v'
  this.top = top + this.distance/2 * this.direction;
  this.left = left;
  this.$node.animate({top: this.top, left: this.left}, time);

}