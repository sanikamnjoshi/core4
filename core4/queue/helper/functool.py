#
# Copyright 2018 Plan.Net Business Intelligence GmbH & Co. KG
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

"""
The :mod:`functool <core4.queue.helper.functool` module implements the helper
functions :func:`enqueue` and :func:`execute`.
"""

import core4.logger
import core4.queue.main
import core4.queue.worker
import core4.service.setup
import core4.util.node


def enqueue(job, **kwargs):
    """
    Eenqueue a job.

    :param job: qual_name or job class
    :param kwargs: arguments to be passed to the job

    :return: enqueued job object
    """
    if isinstance(job, str):
        kwargs["name"] = job
    else:
        kwargs["cls"] = job
    queue = core4.queue.main.CoreQueue()
    return queue.enqueue(**kwargs)


def execute(job, **kwargs):
    """
    Enqueue and immediately execute a job in foreground. This
    method is used in development::

        execute(DummyJob, sleep=15)

    :param job: qual_name or job class
    :param kwargs: job arguments

    :return: final MongoDB job document from ``sys.queue``
    """
    setup = core4.service.setup.CoreSetup()
    setup.make_all()
    core4.logger.logon()
    enq_doc = enqueue(job, **kwargs)
    worker = core4.queue.worker.CoreWorker(name="manual")
    worker.at = core4.util.node.mongo_now()
    worker.start_job(enq_doc.serialise(), async=False)
    doc = worker.queue.job_detail(enq_doc._id)
    worker.config.sys.queue.delete_one(filter={"_id": enq_doc._id})
    worker.config.sys.journal.delete_one(filter={"_id": enq_doc._id})
    return doc


def find_job(**kwargs):
    """
    Finds the job using the passed ``kwargs`` as filter arguments.

    :param kwargs: MongoDB filter arguments
    :return: list of jobs matching the filter criteria
    """
    queue = core4.queue.main.CoreQueue()
    return list(queue.config.sys.queue.find(filter=kwargs))
