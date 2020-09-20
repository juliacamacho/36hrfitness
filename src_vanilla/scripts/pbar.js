// var bar = new ProgressBar.Circle(document.getElementById("match_pct_1"), {
//     color: '#aaa',
//     // This has to be the same size as the maximum width to
//     // prevent clipping
//     strokeWidth: 4,
//     trailWidth: 1,
//     easing: 'easeInOut',
//     duration: 1400,
//     text: {
//         autoStyleContainer: false
//     },
//     from: { color: '#aaa', width: 1 },
//     to: { color: '#333', width: 4 },
//     // Set default step function for all animate calls
//     step: function(state, circle) {
//         circle.path.setAttribute('stroke', state.color);
//         circle.path.setAttribute('stroke-width', state.width);
//
//         var value = Math.round(circle.value() * 100);
//         if (value === 0) {
//             circle.setText('');
//         } else {
//             circle.setText(value);
//         }
//
//     }
// });
// bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
// bar.text.style.fontSize = '2rem';
//
// bar.animate(1.0);  // Number from 0.0 to 1.0

var bar = new ProgressBar.Circle(document.getElementById("match_pct_1"), {
    color: '#000000',
    trailColor: '#eee',
    trailWidth: 1,
    duration: 1400,
    easing: 'bounce',
    strokeWidth: 6,
    from: {color: '#FFEA82', a:0},
    to: {color: '#ED6A5A', a:1},
    // Set default step function for all animate calls
    step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
            circle.setText('');
        } else {
            circle.setText(value);
        }
    }
});

bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '2rem';
bar.text.style.fontWeight = 'bold';

bar.to = {color: '#ED6A5A', a:0.5}

bar.animate(1.0);  // Number from 0.0 to 1.0
