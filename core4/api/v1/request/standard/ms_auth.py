#
# Copyright 2018 Plan.Net Business Intelligence GmbH & Co. KG
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

# authenticate users using Microsoft's authentication library for 2-factor authentication

import msal
from core4.base.main import CoreBase
from core4.api.v1.request.main import CoreRequestHandler


class MSAuth(CoreBase):
    """
    functions for authenticating users using Microsoft's authentication library for 2-factor authentication
    """

    def get_ms_auth_application(self):
        client_id = self.config.ms_auth.client_id
        client_secret = self.config.ms_auth.client_secret
        tenant_id = self.config.ms_auth.tenant_id

        # TODO sjo: printlining - remove later
        self.logger.info("***************************************** client id is %s", client_id)
        self.logger.info("***************************************** client secret is %s", client_secret)
        self.logger.info("***************************************** tenant id is %s", tenant_id)

        authority = 'https://login.microsoftonline.com/' + str(tenant_id)
        # redirect_uri = self.config.ms_auth.redirect_uri  # TODO sjo 20240808 what do I add as the redirect uri?
        # scope = ['User.Read']  # TODO sjo 20240808 is this needed? why is it in this specific format?

        # # create a client application
        # # TODO sjo does this have to be a ConfidentialClientApplication class or can it be a ClientApplication class?
        # app = msal.ConfidentialClientApplication(
        #     client_id=client_id,
        #     client_credential=client_secret,
        #     authority=authority
        # )

        # public applicaton
        app = msal.PublicClientApplication(
            client_id=client_id,
            authority=authority
        )

        return app
