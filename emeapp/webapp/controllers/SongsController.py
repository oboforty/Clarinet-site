import uuid

from eme.data_access import get_repo
from flask import render_template, request, Response, redirect, url_for

from core.dal import Song, SongRepository


class SongsController:
    def __init__(self, server):
        self.group = "Songs"
        self.repo: SongRepository = get_repo(Song)

        server.preset_endpoints({
            'GET /songs/<song_id>': 'Songs:get_view'
        })

    def index(self):
        songs = self.repo.list_all()

        return render_template('/songs/list.html', songs=songs)

    def get_view(self, song_id):
        song = self.repo.get(song_id)

        notes = song.notes.split()

        return render_template('/songs/view.html', song=song, notes=notes)

    def get_edit(self, song_id):
        song = self.repo.get(song_id)
        return render_template('/songs/edit.html', song=song)

    def get_create(self):
        return render_template('/songs/create.html')

    def post(self):
        song_data = request.form.copy()
        song = Song(**song_data)
        song.song_id = uuid.uuid4()

        self.repo.create(song)

        return redirect(url_for("Songs:get_index"))

    def post_edit(self, song_id):
        song = self.repo.get(song_id)

        song_data = request.form.copy()
        song.set(**song_data)

        self.repo.save()

        return redirect(url_for("Songs:get_index"))

    def delete(self, song_id):
        pass