import uuid

from eme.data_access import GUID, JSON_GEN
from sqlalchemy import Column, String, Integer, Text, SmallInteger
from core.dal.base.sqlite import EntityBase


class Song(EntityBase):
    __tablename__ = 'songs'

    song_id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    name = Column(String(255))
    artist = Column(String(255))
    about = Column(Text())

    instrument = Column(SmallInteger())
    skey = Column(String(20))
    strength = Column(SmallInteger())
    tempo = Column(SmallInteger())

    notes = Column(JSON_GEN())

    def __init__(self, **kwargs):
        self.song_id = kwargs.get('song_id')
        self.name = kwargs.get('name')
        self.artist = kwargs.get('artist')
        self.about = kwargs.get('about')
        self.instrument = kwargs.get('instrument')
        self.skey = kwargs.get('skey')
        self.strength = kwargs.get('strength')
        self.tempo = kwargs.get('tempo')
        self.notes = kwargs.get('notes')
