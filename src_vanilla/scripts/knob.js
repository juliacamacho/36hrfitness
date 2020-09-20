let knobs = {
    'knee': null,
    'back': null,
    'elbow': null,
    'hip': null,
};

function createKnobs() {
    for (let key in knobs) {
        const el = $('#pog_' + key);
        let myKnob = pureknob.createKnob(el.width() / 2, el.height() / 2);
        document.getElementById("pog_" + key).appendChild(myKnob.node());

        knobs[key] = myKnob;
    }
}

createKnobs();