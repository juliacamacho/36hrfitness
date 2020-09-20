$(document).ready(function(){
    changeNum(5)
    // var numbers = ["&#10111;", "&#10111;", "&#10111;", "&#10111;", "&#10111;"]
    var num = 0


    timer();
    
    // }

  });

function timer(){
    var seconds = 0
    var minutes = 0;
    setInterval(function(){ 
        if (seconds == 60){
            seconds = 0;
            minutes++;
        }
        // console.log(seconds);
        if (seconds.toString().length == 1){
            var secString = "0" + seconds.toString();
        }
        if (minutes.toString().length == 1){
            var minString = "0" + minutes.toString();
        }

        var time = "- Session Length: " + minString + ":" + secString;

        console.log(time);
        $("#infoSess").text(time); 
        seconds++;
    }, 1000);
}
//only usuable up to 10
function changeNum(number){
    // var unicodeVal = "\u278" + (number - 1).toString();
    unicodeVal = ["\u2780", "\u2781", "\u2782", "\u2783", "\u2784", "\u2785", "\u2786", "\u2787", "\u2788", "\u2789"] ;
    // print (unicodeVal);
    $(".step").text(unicodeVal[number - 1]);
    var n = number * 10.0;
    var r = (255 * n) / 100
    var g = (255 * (100 - n)) / 100 
    var b = 0
    console.log(r,g,b)
    var percentage = number / 10;
    var hue0 = -10
    var hue1 = 100;
    var hue = (percentage * (hue1 - hue0)) + hue0;


    var col = "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
    col = 'hsl(' + hue + ', 90%, 40%)'
    console.log(col);
    $(".step").css({'color': col});

}