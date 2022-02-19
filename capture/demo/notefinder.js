function find_notes(frequencyData) {
    let m = max_n(frequencyData);


    return m
}


function max_n(a) {
    return a.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
}