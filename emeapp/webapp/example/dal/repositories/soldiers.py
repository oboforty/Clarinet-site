from eme.data_access import Repository
from sqlalchemy import func, case

from ..entities.area import Area
from ..entities.soldier import Soldier
from ..base.childmixin import InstanceRepositoryBase


@Repository(Soldier)
class SoldierRepository(InstanceRepositoryBase):

    def get(self, eid, wid=None):
        return self.session.query(Soldier).get(eid)

    def list_by_area(self, area: Area, defenders=True):
        """
        lists soldiers per area
        """
        q = self.session.query(Soldier) \
            .filter(Soldier.aid == area.aid, Soldier.wid == area.wid) \

        if not defenders:
            q = q.filter(Soldier.defend == False)

        return q

    def count_by_area(self, area: Area):
        """
        lists soldiers per area
        """
        sr = self.session.query(func.SUM(case([(Soldier.defend, 100), ], else_=1)).label("n_d")) \
            .filter(Soldier.aid == area.aid, Soldier.wid == area.wid) \
            .scalar()

        attack = sr % 100
        defend = sr // 100
        return attack, defend

        # todo: does the above work in postgres? if not, condiional:
        # q = self.session.query(func.count(Soldier.sid).label('n'), func.count(func.IF(Soldier.defend)).label('n_defend')) \
        #     .filter(Soldier.aid == area.aid, Soldier.wid == area.wid) \
        #     .first()

    def count_by_iso(self, iso, wid):
        q = self.session.query(func.count(Soldier.sid).label('n')) \
            .filter(Soldier.iso == iso, Soldier.wid == wid) \
            .scalar()
        return q['n']

