import uuid

from eme.data_access import GUID, JSON_GEN
from sqlalchemy import Column, ForeignKey, SmallInteger, String, Boolean
from sqlalchemy.orm import relationship

from ..base.sqlite import EntityBase


class Town(EntityBase):
    __tablename__ = 'towns'

    # (iso, wid) as primary key
    iso = Column(String(5), primary_key=True)
    wid = Column(GUID(), ForeignKey('worlds.wid', ondelete='CASCADE'), primary_key=True)

    world = relationship("World", foreign_keys=[wid])
    name = Column(String(20))
    ai = Column(Boolean(), default=False)

    heightmap = Column(SmallInteger)

    # res_id -> lvl
    gatherers = Column(JSON_GEN())
    # res_id -> amount
    resources = Column(JSON_GEN())
    # build_id -> lvl
    buildings = Column(JSON_GEN())
    # build_id -> [x, y]
    placements = Column(JSON_GEN())

    def __init__(self, **kwargs):
        self.wid = kwargs.get('wid')
        self.iso = kwargs.get('iso')
        self.name = kwargs.get('name')

        self.heightmap = kwargs.get('heightmap')

        self.gatherers = kwargs.get('gatherers', {})
        self.resources = kwargs.get('resources', {})
        self.buildings = kwargs.get('buildings', {})
        self.placements = kwargs.get('placements', {})


        if isinstance(self.wid, str):
            self.wid = uuid.UUID(self.wid)

    @property
    def view(self):
        return {
            "iso": self.iso,
            "name": self.name,
            "wid": str(self.wid),

            "heightmap": self.heightmap,

            "gatherers": self.gatherers,
            "resources": self.resources,
            "buildings": self.buildings,
            "placements": self.placements,
        }

    @property
    def view_public(self):
        return {
            "iso": self.iso,
            "name": self.name,
            "wid": str(self.wid),

            # only visuals are provided, levels and resources aren't
            "placements": self.placements,
            "resources": {
                "level": self.resources['level'],
                "pop": self.resources['pop']
            },
            "buildings": {
                "senate": self.buildings['senate']
            }
        }

    def __hash__(self):
        return hash(str(self.wid) + str(self.iso))
