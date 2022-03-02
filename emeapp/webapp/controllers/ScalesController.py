import uuid

from flask import render_template, request, Response, redirect, url_for


class ScalesController:
    def __init__(self, server):
        self.group = "Scales"

    def index(self):
        return render_template('/scales/view.html')
