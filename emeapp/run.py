
from webapp.website import PFWebapp

# this can be used for Gunicorn as well
app = PFWebapp()


if __name__ == "__main__":
    # run it manually:
    app.start()
