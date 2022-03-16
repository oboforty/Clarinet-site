from flask import render_template

from core.dal import ctx


def init_teardown(app):

    # @app.teardown_request
    # def teardown_request(exception):
    #     if exception:
    #         ctx.db_session.rollback()
    #     ctx.db_session.remove()

    @app.errorhandler(500)
    def internal_error(error):
        ctx.db_session.rollback()
        return render_template('errors/500.html'), 500

    if app.debug:
        app.config["PRESERVE_CONTEXT_ON_EXCEPTION"] = True
