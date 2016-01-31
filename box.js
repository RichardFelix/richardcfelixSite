/* Make box flash after 10 seconds */
var Timer = setTimeout(function() {
    
  Timer = setInterval(function () {
      
    if(document.getElementById("image").style.opacity != .5)
        document.getElementById("image").style.opacity = .5;
    else
        document.getElementById("image").style.opacity = 1;
      
  }, 1000);
    
}, 10000);