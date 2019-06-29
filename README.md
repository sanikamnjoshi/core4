core4os - THE PYTHON INSIGHT PLATFORM
=====================================

Develop, Operate and Collaborate on Data and Analytics

Automated - Flexible - Secure - Scalable


Data scientists use a variety of both open and closed source Python and R modules to create relevant insights based on multiple sets of data from many different sources. core4os enables data scientists and business users to integrate an 
existing insight-generation processing chain into a fault-tolerant, distributed system, thereby automating the whole data analytics process from data transformation to insight generation without the usual need to worry about the underlying software or hardware requirements. 

core4os takes care of everything that is essential to using and operating such a distributed system, from central logging and configuration to deployment, all while scaling to hundreds of servers, allowing for rapid progress from development to production deployment and even enabling the developer to deploy a REST API quickly based on the output of the data-processing, which provides a shortcut for creating beautiful, frontend applications.


prerequisite installation guide
-------------------------------

core4os has on the following prerequisites:

* Linux flavor operating system, preferably Debian 9 or Ubuntu 18.04
* Python 3.5 or higher
* MongoDB database instance version 3.6 or higher up-and-running,
  see https://www.mongodb.com/download-center#community
* pip 18.1 or higher
* git 2 or higher


Install pip for Python 3, python-venv and git with:

    # install prerequisites
    sudo apt-get install python3-pip python3-venv python3-dev git dirmngr --yes


Install MongoDB and enable the service to start at boot time with:

    # install MongoDB
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
    echo "deb http://repo.mongodb.org/apt/debian "$(lsb_release -sc)"/mongodb-org/4.0 main" | sudo tee /etc/apt/sources.list.d/mongodb.list
    sudo apt-get update
    sudo apt-get install mongodb-org --yes
    sudo systemctl start mongod.service
    sudo systemctl enable mongod.service


Please note that MongoDB requires further configuration. See below.

Install nodejs, yarn and npm to build and setup web tools:

    # install nodejs and npm
    wget -qO- https://deb.nodesource.com/setup_11.x | sudo bash -
    sudo apt-get update
    sudo apt-get install -y nodejs
    
    # install yarn
    wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update
    sudo apt-get install yarn --yes
    sudo npm -g install vue-cli

    
core4os installation 
--------------------

Clone and install core4os framework in a Python virtual environment:

    # clone core4
    git clone https://github.com/plan-net/core4.git
    
    # setup and enter Python virtual environment
    cd core4
    python3 -m venv .venv
    source enter_env
    
    # install core4
    pip install --upgrade pip
    pip install .
    

MongoDB setup
-------------

MongoDB requires further configuration to setup a replica set. core4os uses some special features of MongoDB which are only available with replica set.

The interactive script ``local_setup.py`` simplifies this configuration. Start the script with ``python local_setup.py`` in the Python virtual environment created above. 


MongoDB protection
------------------

Please note that running the core4os regression tests requires two additional steps. First, the user ``core`` must exists as a MongoDB user with password ``654321``. Second, the MongoDB hostname must have an additional domain name ``testmongo``.


Ensure the setup is reflected with your core4os ``local.yaml`` configuration file.

Pass the following JavaScript to the mongo shell to create user ``core`` with password ``654321``:

    mongo <<- EOF
    use admin
    db.createUser(
      {
        user: "core",
        pwd: "654321",
        roles: [ { role: "root", db: "admin" } ]
      }
    );
    EOF


Edit the MongoDB configuration file ``/etc/mongod.conf`` and add the following lines:

    security:
      authorization: enabled


Add hostname ``testmongo`` to the ``/etc/hosts`` file:

    127.0.0.1   localhost
    127.0.0.1   devops
    127.0.0.1   testmongo


Finally, restart mongod with:

    service mongod restart


Test the settings and MongoDB connection with:

    mongo --username=core --password=654321 --authenticationDatabase admin


build web tools
---------------

Use core4os tool ``cadmin`` to build all web tools inside the Python virtual environment created above:

    # build core4 web apps
    cadmin build


further reads
-------------

Find the latest core4os documentation at https://core4os.readthedocs.io/en/latest/ or build the sphinx documentation with

    cd core4
    pip install -e ".[tests]" 
    cd core4/docs
    make html
    

Both methods of accessing the documentation provide further installation instructions and an Ubuntu 18.04 step-by-step installation guide.


3rd party systems and licenses
------------------------------

All external packages used within core4os have the associated license placed within the 
``LICENSES`` directory.
