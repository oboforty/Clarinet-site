
from dataclasses import dataclass


@dataclass
class UserView:
    uid: str
    username: str
    admin: bool
    wid: str
    iso: str
    xp: float
    elo: float
    lauren: int
    sapphire: int
    emerald: int

    # face: str = None
    client_id: str = None
    client = None

    def __init__(self, **kwargs):
        self.uid = kwargs.get('uid')
        self.username = kwargs.get('username')
        self.admin = kwargs.get('admin')
        self.wid = kwargs.get('wid')
        self.iso = kwargs.get('iso')
        self.xp = kwargs.get('xp')
        self.elo = kwargs.get('elo')
        self.lauren = kwargs.get('lauren')
        self.sapphire = kwargs.get('sapphire')
        self.emerald = kwargs.get('emerald')
