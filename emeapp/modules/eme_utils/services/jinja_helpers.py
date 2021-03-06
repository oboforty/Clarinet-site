import json

from eme.entities import EntityJSONEncoder


def init_jinja(app, conf):

    # Globals in Jinja:
    @app.context_processor
    def inject_dict_for_all_templates():
        return dict(
            # (current_user)
            # (current_token)

            # conf=conf,
            js_transpiled=conf.get('website.js_transpiled', True),
            ws_address=conf.get('website.ws_address'),

            # custom helpers
            is_list= lambda f: isinstance(f, list)
        )

    @app.template_filter()
    def ejson(text):
        """Converts variable to json string using eme's extended encoder."""

        return json.dumps(text, cls=EntityJSONEncoder)
