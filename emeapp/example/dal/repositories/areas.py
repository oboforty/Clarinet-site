from eme.data_access import Repository

from ..entities.area import Area
from ..base.childmixin import InstanceRepositoryBase


@Repository(Area)
class AreaRepository(InstanceRepositoryBase):

    def get_capital(self, iso, wid=None):
        return self.session.query(Area)\
            .filter(Area.wid == wid, Area.town_iso == iso)\
            .first()
