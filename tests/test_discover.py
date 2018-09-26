import unittest

import core4.service.discover


class TestDiscovery(unittest.TestCase):

    def setUp(self):
        pass

    def test_discovery(self):
        discover = core4.service.discover.CoreDiscovery()
        self.assertIsNotNone(discover.ip_address)
        self.assertIsNotNone(discover.hostname)
        self.assertGreater(discover.cpu_count, 0)
        print(discover.mountpoints)
        print(list(discover.get_disk_usage()))
        print(list(discover.get_cpu_usage()))


if __name__ == '__main__':
    unittest.main()
