from . import ctx

# Entities
from .entities.song import Song
from .base.sqlite import EntityBase

# Repositories
from .repositories.songs import SongRepository


def drop_order():
    # determine a list of entities in which order they'll be dropped.
    # otherwise they are dropped in discovery order
    return None
