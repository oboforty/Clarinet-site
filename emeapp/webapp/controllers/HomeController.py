from flask import render_template, request, Response


class HomeController:
    def __init__(self, server):
        self.debug = server.debug
        self.group = "Home"

    def index(self):
        return render_template('/index.html')
