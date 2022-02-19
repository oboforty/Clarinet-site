import uuid

from eme.data_access import GUID, JSON_GEN
from sqlalchemy import Column, ForeignKey, SmallInteger, String, Boolean
from sqlalchemy.orm import relationship

from ..base.sqlite import EntityBase


class Area(EntityBase):
    __tablename__ = 'areas'

    # (aid, wid) as primary key
    aid = Column(String(6), primary_key=True)
    wid = Column(GUID(), ForeignKey('worlds.wid'), primary_key=True)

    name = Column(String(20))
    iso = Column(String(5))
    town_iso = Column(String(5), default=None)    # if area belonging to town

    active_spell = Column(GUID())
    #soldiers = relationship("soldiers", foreign_keys="soldiers.sid")

    @property
    def view(self):
        return {
            "aid": self.aid,
            "name": self.name,
            "iso": self.iso,
            "town_iso": self.town_iso,
            "active_spell": self.active_spell,
            "has_hidden": False
        }

    def get_view(self, hidden):
        v = self.view
        v["has_hidden"] = hidden
        return v

    def __repr__(self):
        fos = "HQ" if self.town_iso == self.iso else (self.town_iso if self.town_iso else "area")
        return f"{self.aid} (type: {fos} owner: {self.iso} )"
