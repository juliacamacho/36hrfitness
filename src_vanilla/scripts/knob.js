let knobs = {
    'knee': null,
    'neck': null,
    'elbow': null,
    'hip': null,
};

function createKnobs() {
    for (let key in knobs) {
        const el = $('#pog_' + key);
        let myKnob = pureknob.createKnob(el.width() / 2, el.height() / 2);
        document.getElementById("pog_" + key).appendChild(myKnob.node());


        // let cur = document.getElementById("pog_" + key);
        // cur.innerHTML = cur.innerHTML + `<div><span style="font-size: 20px; font-weight: bold; font-family: 'Raleway', sans-serif" id="comment_elbow">Hi</span></div>`;

        knobs[key] = myKnob;
    }
}

createKnobs();