

class NotePlayer {
    constructor(instrument) {
        this.sfx_cache = {};
        this.sounds_playing = new Set();
        this.current_sound_playing = null;
        //this.prev_sound_playing = null;
        this.instrument = instrument;

        this.play_exclusive = false;
        this.set_to = "00:01";
    }

    play(note) {
        if (!note || !this.sfx_cache[note]) {
            console.error("Note sound not found:", note);
            return;
        }

        // stop previous playing sound
        if (this.current_sound_playing && this.play_exclusive) {
            this.current_sound_playing.stop();
            this.current_sound_playing.setTime(buzz.fromTimer(this.set_to));
            this.current_sound_playing = null;
        }

        console.log("Playing", note);
        this.current_sound_playing = this.sfx_cache[note];
        this.current_sound_playing.play();
        this.sounds_playing.add(this.current_sound_playing);
    }

    load_notes(notes_to_load) {
        for(let ntl of notes_to_load) {
           let notefile = ntl.includes('#') ? ntl.replace('#', 'sharp') : ntl;

            const sfx = new buzz.sound(`/sounds/${this.instrument}/${notefile}.wav`);
            sfx.setTime(buzz.fromTimer(this.set_to));

            //console.log(sfx);
            this.sfx_cache[ntl] = sfx;
        }

        console.info("Sounds loaded:", Array.from(notes_to_load));
    }

    stop_current() {
        if (this.current_sound_playing) {
            this.current_sound_playing.stop();
            this.current_sound_playing.setTime(buzz.fromTimer(this.set_to));
        }

        this.current_sound_playing = null;
    }

    stop_all() {
        this.stop_current();

        for (let sfx of this.sounds_playing) {
            sfx.stop();
            sfx.setTime(buzz.fromTimer(this.set_to));
        }

        this.sounds_playing.clear();
    }

    stop() {
        this.stop_all();
    }
}