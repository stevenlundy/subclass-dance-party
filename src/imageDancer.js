var ImageDancer = function(top, left, timeBetweenSteps, imgURL){
  imgURL = imgURL || './img/NinjaTurtlesGif.gif';
  Dancer.apply(this, arguments);
  this.top = top;
  this.left = left;
  if(isNaN(top) || isNaN(left)){
    debugger;
  }
  this.setImage(imgURL);

  this.$node.css({
    border:'0px'
  });

};

ImageDancer.prototype = Object.create(Dancer.prototype);
ImageDancer.prototype.constructor = ImageDancer;

ImageDancer.prototype.lineUp = function(top, left, time) {

  this.top = top - this.scaledHeight/2;
  this.left = left - this.scaledWidth/2;
  this.$node.animate({top: this.top, left: this.left}, time);

}

ImageDancer.prototype.setImage = function(imgURL, maxDimension) {
  var maxDimension = maxDimension || 200;
  var img = new Image();
  img.src = imgURL;

  img.onload = function(){
    this.actualHeight = img.height;
    this.actualWidth = img.width;
    this.scaleFactor = 1;
    
    if(Math.max(this.actualWidth, this.actualHeight) > maxDimension){
      this.scaleFactor = Math.max(this.actualHeight, this.actualWidth)/maxDimension;
    }
    this.scaledHeight = this.actualHeight/this.scaleFactor;
    this.scaledWidth = this.actualWidth/this.scaleFactor;

    this.$node.css({
      'background-image': 'url("'+ imgURL + '")',
      'background-size' : this.scaledWidth+'px ' + this.scaledHeight+'px ',
      width: this.scaledWidth+'px ',
      height: this.scaledHeight+'px '
    });
  }.bind(this);
};