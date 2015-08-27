var ShredderDancer = function(top, left){
  var shredderImg = 'http://img34.photobucket.com/albums/v103/orochichimera/spriterips/animatedspriterips/shredderaltskx.gif';
  ImageDancer.call(this, top, left, 10, shredderImg);

  this.$node.css({'z-index': -1});
};

ShredderDancer.prototype = Object.create(ImageDancer.prototype);
ShredderDancer.prototype.constructor = ShredderDancer;

// we plan to overwrite the step function below, but we still want the superclass step behavior to work,
// so we must keep a copy of the old version of this function
ShredderDancer.prototype.oldStep = ShredderDancer.prototype.step;

ShredderDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  
  this.top = window.mouseY - this.scaledHeight/2;
  this.left = window.mouseX - this.scaledWidth/2;


  this.setPosition(this.top, this.left);
};

ShredderDancer.prototype.lineUp = function(){};
