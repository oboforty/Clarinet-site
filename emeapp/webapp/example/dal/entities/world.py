from eme.data_access import GUID
from sqlalchemy import Column, ForeignKey, SmallInteger, String
from sqlalchemy.orm import relationship

from ..base.sqlite import EntityBase
from ..base.worldmixin import WorldMixin


class World(WorldMixin, EntityBase):
    __tablename__ = 'worlds'

    owner_id = Column(GUID(), ForeignKey('users.uid', ondelete='CASCADE'))
    #owner = relationship(User, foreign_keys=[owner_id])

    #players = relationship("users", foreign_keys="users.wid")
    towns = relationship("Town", cascade="delete")

    max_senate_lvl = Column(SmallInteger)
    max_senate_iso = Column(String(5))

    def __init__(self, **kwargs):
        self.wid = kwargs.get('wid')
        self.name = kwargs.get('name')
        self.map = kwargs.get('map')
        self.max_players = kwargs.get('max_players')
        self.invlink = kwargs.get('invlink')
        self.owner_id = kwargs.get('owner_id')

    @property
    def view(self):
        return {
            "wid": self.wid,
            "name": self.name,
            "map": self.map,
            "max_players": self.max_players,
            "invlink": self.invlink,
            "owner_id": self.owner_id,
            "created_at": self.created_at,
            "last_update": self.last_update,
        }

