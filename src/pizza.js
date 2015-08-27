var Pizza = function(top, left, timeBetweenSteps){
  var pizzaImg = 'http://warriorcatsrpg.com/awards/39538-mini.gif?1413432237'
  ImageDancer.call(this, top, left, timeBetweenSteps, pizzaImg);
  this.top = top;
  this.left = left;

};

Pizza.prototype = Object.create(Dancer.prototype);
Pizza.prototype.constructor = Pizza;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
Pizza.prototype.oldStep = Pizza.prototype.step;

Pizza.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
};
