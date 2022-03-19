
function guiOnNoteChange() {
    // on note change

    $("#nrpage").innerText = `${player_ctx.i_page} / ${player_ctx.total_pages}`;
}

function init_gui(tempo) {
    $("#nrpage").innerText = `1 / ${player_ctx.total_pages}`;

    if (tempo) {
      $("#bpmrange").value = tempo;
      $("#tempo").innerText = $("#bpmrange").value;
    }

    return guiOnNoteChange;
}

$("#play").onclick = function () {
    if (!player_ctx.is_playing) {
        this.classList.add("btn-danger");
        this.classList.remove("btn-light");

        player_ctx.start();

        $("#bpmrange").disabled = true;
    } else {
        this.classList.remove("btn-danger");
        this.classList.add("btn-light");

        player_ctx.reset();

        $("#bpmrange").disabled = false;
    }
};

$("#pause").onclick = function () {
    if (player_ctx.is_playing) {
        this.classList.add("btn-danger");
        this.classList.remove("btn-light");

        player_ctx.pause();

        $("#bpmrange").disabled = false;
    } else {
        this.classList.remove("btn-danger");
        this.classList.add("btn-light");

        player_ctx.start();

        $("#bpmrange").disabled = true;
    }
};

$("#stop").onclick = function () {
    $("#play").classList.add("btn-light");
    $("#play").classList.remove("btn-danger");

    player_ctx.stop();

    $("#bpmrange").disabled = false;
};

$("#bpmrange").oninput = function() {
    ropts.bpm = parseInt(this.value);

    $("#tempo").innerText = ropts.bpm;
};

$("#prev").onclick = function() {
    const page = player_ctx.i_page - 1;

    if (page >= 0)
        player_ctx.set_page(page);
}

$("#next").onclick = function() {
    const page = player_ctx.i_page + 1;

    if (page < player_ctx.total_pages)
        player_ctx.set_page(page);
}

$("#play-metronome").onclick = function () {
    ropts.play_metronome = !ropts.play_metronome;

    if (ropts.play_metronome) {
        $("#play-metronome-ind").classList.remove("ra-speaker-off");
        $("#play-metronome-ind").classList.add("ra-speaker");
    } else {
        $("#play-metronome-ind").classList.remove("ra-speaker");
        $("#play-metronome-ind").classList.add("ra-speaker-off");
    }
};

$("#play-notes").onclick = function () {
    ropts.play_sound = !ropts.play_sound;

    if (ropts.play_sound) {
        $("#play-notes-ind").classList.remove("ra-speaker-off");
        $("#play-notes-ind").classList.add("ra-speaker");
    } else {
        $("#play-notes-ind").classList.remove("ra-speaker");
        $("#play-notes-ind").classList.add("ra-speaker-off");
    }
};

$("#show-notes").onclick = function () {
    ropts.show_notes = !ropts.show_notes;

    if (ropts.show_notes) {
        $("#show-notes-ind").classList.remove("ra-sound-off");
        $("#show-notes-ind").classList.add("ra-sound-on");
    } else {
        $("#show-notes-ind").classList.remove("ra-sound-on");
        $("#show-notes-ind").classList.add("ra-sound-off");
    }
};

$("#show-instrument").onclick = function () {
    ropts.show_instrument = !ropts.show_instrument;

    if (ropts.show_instrument) {
        $("#show-instrument-ind").classList.remove("ra-cancel");
    } else {
        $("#show-instrument-ind").classList.add("ra-cancel");
    }
};
