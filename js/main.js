$( document ).ready(function() {

    var lineLength = 200;
    var maxLines = 50;
    var maxTime = 10;
    var minTime = 3;

    var vh = $(window).innerHeight();
    var vw = $(window).innerWidth();

    $('#bg').html("<svg height="+vh+" width="+vw+" id='svg'></svg>");

    function makePath(num) {
        var startPoint = rndWidth();
        var endPoint = rndWidth();
        var midPoint = rndHeight();

        document.getElementById('svg').innerHTML += ('<path d="M'+startPoint+' -20 ' +
        'L'+startPoint+' '+midPoint+' ' +
        'L'+endPoint+' '+midPoint+' ' +
        'L'+endPoint+' '+vh+' ' +
        '" id="path'+num+'" />');

        var path = document.querySelector('#path'+num+'');
        var length = path.getTotalLength();

        $('#path'+num+'').css("stroke-dasharray",""+lineLength+" "+(length-lineLength)+"")

        $.keyframe.define([{
            name: 'keyframe'+num,
            '0%':   {'stroke-dashoffset':""+(length)+""},
            '100%': {'stroke-dashoffset':""+(length*2)+""}
        }]);

    }

    function rndWidth() {
        return Math.floor(Math.random() * (vw - 1) + 1);
    }

    function rndHeight() {
        return Math.floor(Math.random() * (vh - 1) + 1);
    }

    function rndTime() {
        return Math.floor(Math.random() * (maxTime - minTime) + minTime);
    }

    for (var i = 0; i < maxLines; i++) {
        makePath(i);
    }

    for (var n = 0; n < maxLines; n++) {

        var dir = 'normal';

        if (n % 2 == 0){
            dir = 'reverse';
        }

        $('#path'+n).playKeyframe({
            name: 'keyframe'+n, // name of the keyframe you want to bind to the selected element
            duration: rndTime()+'s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
            timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
            delay: rndTime()+'ms', //[optional, default: 0s]  how long you want to wait before the animation starts
            iterationCount: 'infinite', //[optional, default:1]  how many times you want the animation to repeat
            direction: dir, //[optional, default: 'normal']  which direction you want the frames to flow
            fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
            complete: function () {
            } //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
        });
    }


});