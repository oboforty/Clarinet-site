// const _scales = {
//     "C": [
//         "C3","D3","E3","F3","G3","A3","B3",
//         "C4","D4","E4","F4","G4","A4","B4",
//         "C5","D5","E5","F5","G5","A5","B5",
//     ]
// }
const scale_meta = {
    "major": "WWHWWWH"
};
const notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];


function fetch_scale(scale, oct){
    let [first_note, _ky] = scale.split('_');
    const steps = scale_meta[_ky];
    const _scale = [];

    _scale.push(first_note+oct);
    let i = notes.indexOf(first_note);

    for(let s of range(len(steps))) {
        const step = steps[s];
        const n = len(notes);

        i = i+(step=='W'?2:1);

        // increment octave if one cycle has passed
        if (i%n==0 && i != 0)
            oct++;

        // cyclic iteration
        i = (i % n + n) % n;

        _scale.push(notes[i]+oct);
    }

    return _scale;
}