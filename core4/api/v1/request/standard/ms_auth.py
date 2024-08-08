#
# Copyright 2018 Plan.Net Business Intelligence GmbH & Co. KG
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

# authenticate users using Microsoft's authentication library for 2-factor authentication

import msal
from core4.base.main import CoreBase

class MSAuth(CoreBase):
    """
    funtions for authenticating users using Microsoft's authentication library for 2-factor authentication
    """

    def get_ms_auth_application(self):
        client_id = self.config.ms_auth.client_id
        client_secret = self.config.ms_auth.client_secret
        tenant_id = self.config.ms_auth.tenant_id
        authority = 'https://login.microsoftonline.com/' + str(tenant_id)
        # redirect_uri = self.config.ms_auth.redirect_uri  # TODO sjo 20240808 what do I add as the redirect uri?
        scope = ['User.Read']  # TODO sjo 20240808 is this needed? why is it in this specific format?

        app = msal.ConfidentialClientApplication(
            client_id=client_id,
            client_credential=client_secret,
            authority=authority
        )

        return app
