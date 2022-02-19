from eme.data_access import Repository, RepositoryBase
from sqlalchemy import and_, func

from ..entities.song import Song


@Repository(Song)
class SongRepository(RepositoryBase):
    pass
