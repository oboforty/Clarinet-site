from eme.data_access import get_repo
from flask import render_template, request, Response

from core.dal import Song, SongRepository


class SongsController:
    def __init__(self, server):
        self.group = "Songs"
        self.repo: SongRepository = get_repo(Song)

    def index(self):
        songs = self.repo.list_all()

        return render_template('/songs/list.html', songs=songs)

    def get_view(self, song_id):
        song = self.repo.get(song_id)
        return render_template('/songs/view.html', song=song)

    def get_edit(self, song_id):
        song = self.repo.get(song_id)
        return render_template('/songs/edit.html', song=song)

    def get_create(self):
        return render_template('/songs/create.html')

    def post(self):
        pass

    def put(self, song_id):
        pass

    def delete(self, song_id):
        pass