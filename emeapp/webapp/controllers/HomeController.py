from flask import render_template, request, Response

from core.dal import ctx


class HomeController:
    def __init__(self, server):
        self.debug = server.debug
        self.group = "Home"

    def index(self):
        return render_template('/index.html')

    def rollback(self):
        ctx.db_session.rollback()

    def test(self):
        return render_template('/test.html')
