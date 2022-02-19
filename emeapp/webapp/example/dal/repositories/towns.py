from eme.data_access import Repository
from sqlalchemy.orm.attributes import flag_modified
from sqlalchemy import and_, or_

from ..base.childmixin import InstanceRepositoryBase
from ..entities.town import Town
from ..entities.user import User


@Repository(Town)
class TownRepository(InstanceRepositoryBase):

    def mark_changed(self, town):
        # todo: solve this in a better way
        flag_modified(town, 'buildings')
        flag_modified(town, 'gatherers')
        flag_modified(town, 'resources')
        flag_modified(town, 'placements')

    def count_with_players(self, wid):
        return len(list(self.list_with_players(wid)))

    def list_with_players_both(self, wid, wid2):
        """
        Lists all countries and player uids in both worlds, paired
        """
        return self.session.query(Town, User.uid) \
            .filter(or_(Town.wid == wid, Town.wid == wid2)) \
            .outerjoin(User, and_(User.iso == Town.iso, Town.wid == User.wid))

    def list_with_players(self, wid):
        """
        Lists countries that are associated with a user
        """
        return self.session.query(User, Town) \
            .filter(User.wid == wid) \
            .join(Town, and_(User.iso == Town.iso, User.wid == Town.wid))

    def list_without_players(self, wid):
        """
        lists countries that are empty
        """
        return self.session.query(Town) \
            .filter(Town.wid == wid) \
            .outerjoin(User, and_(User.iso == Town.iso, User.wid == Town.wid)) \
            .filter(User.iso == None)
