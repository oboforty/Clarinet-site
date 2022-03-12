import uuid

from eme.data_access import GUID, JSON_GEN
from sqlalchemy import Column, String, Integer, Text, SmallInteger, Boolean
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
    # beats_per_measure = Column(SmallInteger())
    # beats_type = Column(SmallInteger())

    notes = Column(Text())

    def __init__(self, **kwargs):
        self.song_id = kwargs.get('song_id')

        self.set(**kwargs)

    def set(self, **kwargs):
        self.name = kwargs.get('name')
        self.artist = kwargs.get('artist')
        self.about = kwargs.get('about')
        self.instrument = kwargs.get('instrument')
        self.skey = kwargs.get('skey')
        self.strength = kwargs.get('strength')
        self.tempo = kwargs.get('tempo')
        self.beats_per_measure = kwargs.get('beats_per_measure')
        self.beats_type = kwargs.get('beats_type')
        self.notes = kwargs.get('notes')

    @property
    def view(self):
        return {
            'song_id': self.song_id,
            'name': self.name,
            'artist': self.artist,
            'about': self.about,
            'instrument': self.instrument,
            'skey': self.skey,
            'strength': self.strength,
            'tempo': self.tempo,
            # 'beats_per_measure': self.beats_per_measure,
            # 'beats_type': self.beats_type,
        }

    # @property
    # def time_signature(self):
    #     return (self.beats_per_measure, self.beats_type)