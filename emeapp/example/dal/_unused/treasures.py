from eme.data_access import GUID
from sqlalchemy import Column, ForeignKey, Float, String
from sqlalchemy.orm import relationship

from core.dal.base.sqlite import EntityBase
from core.dal.base.childmixin import ChildMixin
from core.dal import User


class Treasure(ChildMixin, EntityBase):
    __tablename__ = 'treasures'

    tid = Column(GUID(), primary_key=True)

    chest_kind = Column(String)
    lat = Column(Float)
    lon = Column(Float)

    owner_id = Column(GUID(), ForeignKey('users.uid', ondelete='CASCADE'))
    owner = relationship(User, foreign_keys=[owner_id])


    def __init__(self, **kwargs):
        self.wid = kwargs.get('wid')
        self.name = kwargs.get('name')
        self.owner_id = kwargs.get('owner_id')

        self.chest_kind = kwargs.get('chest_kind')

    @property
    def view(self):
        return {
            "wid": self.wid,
            "wid": self.wid,
            "wid": self.wid,
            "wid": self.wid,
            "wid": self.wid,
            "wid": self.wid,
            "wid": self.wid,
            "wid": self.wid,
            "wid": self.wid,
        }