import uuid

from eme.data_access import GUID, JSON_GEN
from sqlalchemy import Column, ForeignKey, SmallInteger, String, Boolean, Float
from sqlalchemy.orm import relationship

from ..base.sqlite import EntityBase


class Soldier(EntityBase):
    __tablename__ = 'soldiers'

    # UUID primary key
    sid = Column(GUID(), primary_key=True, default=uuid.uuid4)

    name = Column(String(20))
    type = Column(SmallInteger())
    wid = Column(GUID(), ForeignKey('worlds.wid'))
    iso = Column(String(5), ForeignKey('towns.iso'))

    # if soldier outside in world, in an area:
    aid = Column(String(6), ForeignKey('areas.aid'))
    # inventory slot of soldier
    defend = Column(Boolean())

    # Town activity in bid:
    activity_bid = Column(String(10))

    # general stats:
    health = Column(Float(), default=100)
    happiness = Column(Float(), default=100)
    lvl = Column(SmallInteger(), default=1)
    kills = Column(SmallInteger(), default=0)
    xp = Column(Float(), default=0)
    elo = Column(Float())

    @property
    def view(self):
        return {
            "sid": self.sid,
            "name": self.name,
            "type": self.type,
            "wid": self.wid,
            "aid": self.aid,
            "defend": self.defend,
            "iso": self.iso,
            "kills": self.kills,
            "xp": self.xp,
            "elo": self.elo,
            "lvl": self.lvl,
            "activity_bid": self.activity_bid,
            "health": self.health,
            "happiness": self.happiness,
        }

    def __init__(self, **kwargs):
        self.type = kwargs.get('type')
        self.wid = kwargs.get('wid')
        self.defend = kwargs.get('defend')
        self.aid = kwargs.get('aid')
        self.sid = kwargs.get('sid')
        self.iso = kwargs.get('iso')
        self.activity_bid = kwargs.get('activity_bid')
        self.name = kwargs.get('name')
        self.lvl = kwargs.get('lvl', 1)
        self.happiness = kwargs.get('happiness', 100)
        self.health = kwargs.get('health', 100)
        self.elo = kwargs.get('elo', 100)
        self.xp = kwargs.get('xp', 0)
        self.kills = kwargs.get('kills', 0)

    def __repr__(self):
        n = self.name if self.name else self.sid

        d = 'def ' if self.defend else ''
        t = 'LACBX'[self.type]
        a = self.aid if self.aid else 'town'
        return f"{t}-{n} @{a} (iso {self.iso} {d}lvl {self.lvl}, hp {self.health})"
