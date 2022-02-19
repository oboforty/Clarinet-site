from eme.data_access import GUID
from sqlalchemy import Column, ForeignKey, SmallInteger
from sqlalchemy.orm import relationship

from core.dal.base.sqlite import EntityBase
from core.dal._unused.seamixin import SeaMixin
from core.dal import User


class Harbor(SeaMixin, EntityBase):
    __tablename__ = 'harbors'
    hid = Column(GUID(), primary_key=True)

    workers = Column(SmallInteger)
    # health
    # has_factory
    # has_cannon_factory

    owner_id = Column(GUID(), ForeignKey('users.uid', ondelete='CASCADE'))
    owner = relationship(User, foreign_keys=[owner_id])

    def __init__(self, **kwargs):
        self.lat = kwargs.get('lat')
        self.lon = kwargs.get('lon')
        self.soldiers = kwargs.get('soldiers', 0)
        self.cannons = kwargs.get('cannons', 0)
        self.xp = kwargs.get('xp', 0)
        self.treasures = kwargs.get('treasures', {})
        self.materials = kwargs.get('materials', {})
        self.boosters = kwargs.get('boosters', {})

        self.hid = kwargs.get("hid")
        self.workers = kwargs.get("workers", 0)
        self.owner_id = kwargs.get("owner_id")

