from .entities.user import User
from .entities.area import Area
from .entities.soldier import Soldier
from .entities.world import World
from .entities.town import Town

from . import ctx
from .base.sqlite import EntityBase
from .views import UserView

from .repositories.users import UserRepository
from .repositories.areas import AreaRepository
from .repositories.soldiers import SoldierRepository
from .repositories.worlds import WorldRepository
from .repositories.towns import TownRepository


def drop_order():
    # determine a list of entities in which order they'll be dropped.
    # otherwise they are dropped in discovery order
    return None
