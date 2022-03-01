
from core.dal import ctx


def init_teardown(app):

    @app.teardown_request
    def teardown_request(exception):
        if exception:
            ctx.db_session.rollback()
        ctx.db_session.remove()

    if app.debug:
        app.config["PRESERVE_CONTEXT_ON_EXCEPTION"] = True
