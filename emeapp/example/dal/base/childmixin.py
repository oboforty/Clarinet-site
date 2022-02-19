from eme.data_access import RepositoryBase


class InstanceRepositoryBase(RepositoryBase):

    def count(self, wid=None):
        if wid:
            return self.session.query(self.T)\
                .filter(self.T.wid == wid)\
            .count()
        else:
            return self.session.query(self.T).count()

    def get(self, eid, wid):
        return super().get([eid, wid])

    def list_all(self, wid=None):
        if wid:
            return self.session.query(self.T)\
                .filter(self.T.wid == wid)
        else:
            return self.session.query(self.T)

    def delete_all(self, wid=None, commit=True):
        if wid:
            self.session.query(self.T)\
                .filter(self.T.wid == wid)\
            .delete()
        else:
            self.session.query(self.T).delete()

        if commit:
            self.session.commit()
