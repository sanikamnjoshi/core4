#
# Copyright 2018 Plan.Net Business Intelligence GmbH & Co. KG
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

import core4.base

# todo: use other name
class BaseHandler(core4.base.CoreBase):
    """
    This abstract class is the base class to all database access permission
    handlers managed by :class:`.CoreAccessManager`.

    All handlers have to implement all methods of this abstract base class.
    """

    def __init__(self, role, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.role = role

    def create_token(self):
        """
        This method creates a random access token, e.g. a password for the
        user to access the database

        .. note:: The token is to be created only once during the handler
                  workflow and lifecycle of the :class:`.BaseHandler` class.

        :return: token/password (str)
        """
        raise NotImplementedError()  # pragma: no cover

    async def revoke_access(self):
        """
        This method deletes user, when exists
        :return:
        """

    async def revoke(self):
        """
        This method deletes the role if exists.
        """
        raise NotImplementedError()  # pragma: no cover

    async def grant_access(self):
        """
        This method creates the role and returns the token/password created by
        :meth:`.create_token`.

        :return: token/password (str)
        """
        raise NotImplementedError()  # pragma: no cover

    async def grant(self, database):
        """
        This method grants read-only access to the passed database.

        :param database: str
        """
        raise NotImplementedError()  # pragma: no cover

    async def finish(self):
        """
        This optional method finishes the workflow of the handler.
        """
        pass



