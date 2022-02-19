from hashlib import md5 
from flask import render_template, request, Response

class ExamplesController:
    def __init__(self, server):
        self.group = "Examples"
        self.allowed_refs = (
            md5(b'software').hexdigest(),
            md5(b'fintech').hexdigest(),
            md5(b'bioinformatics').hexdigest(),
            md5(b'gamedev').hexdigest(),
        )

    def get(self):
        return render_template('/examples/index.html')

    def get_vue(self):
        return render_template('/examples/vue.html')

    def get_react(self):
        return render_template('/examples/react.html')

    def get_angular(self):
        return render_template('/examples/angular.html')
