$(document).ready(function(){
  window.dancers = [];


  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");
    spawnDancer(dancerMakerFunctionName);

  });
  $(".lineEmUp").on("click", function(event){
    var top = $("body").height()/2;
    var margin = $("body").width()/window.dancers.length/2;
    var spacing = 2 * margin;
    for (var i = 0; i < window.dancers.length; i++){
      var left = margin + i * spacing;
      window.dancers[i].lineUp(top, left, 500);
    }
  });
  $('body').mousemove(function(event){
    window.mouseX = event.pageX;
    window.mouseY = event.pageY;
  });
  $('.character').on('click', function(event) {
    $(this).toggleClass('selected');
  });
  $('.submit-chars').on('click', function(){
    window.chars = [];
    $('.character').filter('.selected').each(function(){
      chars.push($(this).attr('id'));
    });
    if (window.chars.length > 0){
      $('.topbar').toggle();
      $('.char-select').toggle();

      spawnDancer('ShredderDancer', window.mouseY, window.mouseX);

      $('body').on('keypress', function (event) {

        if(event.which === 'n'.charCodeAt(0)){
          spawnDancer('PizzaDancer');
        } else if(event.which === 'p'.charCodeAt(0)){
          spawnDancer('Pizza');
        } else if(event.which === 'l'.charCodeAt(0)){
          $(".lineEmUp").click();
        }
      });
    }
  });
});

var spawnDancer = function(dancerMakerFunctionName, top, left, time){
  top = top === undefined ? randomBetween(50, $("body").height() - 250) : top;
  left = left === undefined ? randomBetween(50, $("body").width() - 250) : left;
  time = time === undefined ? randomBetween(200, 1000) : time;
    // get the maker function for the kind of dancer we're supposed to make
  var dancerMakerFunction = window[dancerMakerFunctionName];

  var dancer = new dancerMakerFunction(top, left, time);
  window.dancers.push(dancer);
  $('body').append(dancer.$node);

};