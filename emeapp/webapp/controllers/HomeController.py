from eme.data_access import get_repo
from flask import render_template, request, Response

from core.dal import ctx
from core.dal.entities.song import Song


class HomeController:
    def __init__(self, server):
        self.debug = server.debug
        self.group = "Home"

        self.repo = get_repo(Song)

    def index(self):
        songs = self.repo.list_all()

        return render_template('/index.html', songs=songs)

    def rollback(self):
        ctx.db_session.rollback()

    def test(self):
        return render_template('/test.html')
