from eme.data_access import GUID
from sqlalchemy import Column, ForeignKey, SmallInteger
from sqlalchemy.orm import relationship

from core.dal.base.sqlite import EntityBase
from core.dal._unused.seamixin import SeaMixin
from core.dal import User
from core.dal._unused.harbors import Harbor


class Ship(SeaMixin, EntityBase):
    __tablename__ = 'ships'
    sid = Column(GUID(), primary_key=True)

    kind = Column(SmallInteger)

    owner_id = Column(GUID(), ForeignKey('users.uid', ondelete='CASCADE'))
    owner = relationship(User, foreign_keys=[owner_id])

    # docking harbor
    harbor_id = Column(GUID(), ForeignKey('harbors.hid', ondelete='CASCADE'))
    harbor = relationship(Harbor, foreign_keys=[harbor_id])

    # originating harbor
    mother_id = Column(GUID(), ForeignKey('harbors.hid', ondelete='CASCADE'))
    mother = relationship(Harbor, foreign_keys=[mother_id])

    # todo: later
    #move_to = Column(Integer)
    #starving = Column(Integer)
    # happyness
    # health
    # defence
    # current port dock
    # mother port
    # captain name
    # captain skin type

    def __init__(self, **kwargs):
        self.lat = kwargs.get('lat')
        self.lon = kwargs.get('lon')
        self.soldiers = kwargs.get('soldiers', 0)
        self.cannons = kwargs.get('cannons', 0)
        self.xp = kwargs.get('xp', 0)
        self.elo = kwargs.get('elo', 0)

        self.treasures = kwargs.get('treasures', {})
        self.materials = kwargs.get('materials', {})
        self.boosters = kwargs.get('boosters', {})

        self.sid = kwargs.get('sid')
        self.kind = kwargs.get('kind')

        self.owner_id = kwargs.get('owner_id')
        self.harbor_id = kwargs.get('harbor_id')
        self.mother_id = kwargs.get('mother_id')
