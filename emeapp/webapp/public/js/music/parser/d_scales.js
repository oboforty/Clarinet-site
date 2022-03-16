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

const lists = {
    'lower': 3,
    'mid': 4,
    'high': 5,
}


function fetch_scale(scale, oct){
    const _scale = [];

    if (scale[0] == 'R') {
        // register list
        // let first_note = 'C';
        let sc = lists[scale.split('_')[1]];
        // let i = notes.indexOf(first_note);

        for(let note of notes) {
            _scale.push(note+sc);
            // i++;
        }
    } else {
        if (!scale.includes('_'))
            return [];

        // scale
        let [first_note, _ky] = scale.split('_');
        const steps = scale_meta[_ky];

        if (!steps)
            return [];
    
        _scale.push(first_note+oct);
        let i = notes.indexOf(first_note);
        let prev_i = i-1;
    
        for(let s of range(len(steps))) {
            const step = steps[s];
            const n = len(notes);
    
            i = i+(step=='W'?2:1);

            // increment octave if one cycle has passed
            const octave_step_up = i != 0 && (i%n==0 || i%n < prev_i);
            //console.log(i, i%n, octave_step_up);
            if (octave_step_up)
                oct++;
    
            // cyclic iteration
            i = (i % n + n) % n;
    
            _scale.push(notes[i]+oct);
        }
    }

    return _scale;
}

function fetch_complete_scale(scale) {
    const is = [3,4,5,6,7];

    let _notes = [];
    for (let oct of is)
      _notes = _notes.concat(fetch_scale(scale, oct));
    _notes = [...new Set(_notes)];
    
    return _notes;
}