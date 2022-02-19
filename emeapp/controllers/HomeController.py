from hashlib import md5 
from flask import render_template, request, Response


class HomeController:
    def __init__(self, server):
        self.debug = server.debug
        self.group = "Home"
        self.allowed_refs = (
            md5(b'software').hexdigest(),
            md5(b'fintech').hexdigest(),
            md5(b'bioinformatics').hexdigest(),
            md5(b'gamedev').hexdigest(),
        )

    def index(self):
        ref_cv = request.args.get('ref_cv', None)

        if ref_cv not in self.allowed_refs:
            ref_cv = None
        if ref_cv is None and self.debug:
            ref_cv = 'ek'

        return render_template('/index.html', ref_cv=ref_cv)

    def gamedev(self):
        return render_template('/gamedev.html')

    def software(self):
        return render_template('/software.html')

    def bioinformatics(self):
        return render_template('/bioinformatics.html')
