from flask import render_template, request, Response


class ExampleApi:
    def __init__(self, server):
        self.group = "ExampleApi"
        self.route = "/api"

        server.preset_endpoints({
            "GET /api/worlds/<wid>/data": 'WorldDataApi:get_data',
        })
    
    def get(self):
        # todo: core/dal: sqlite DB
        pass