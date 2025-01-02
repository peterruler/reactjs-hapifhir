# replace with gateway given machine address to outside

"your-router-machine-ip"

# mysql settings differ

# choose latest yaml config from hapifhir github repo with latest tag as basis

 - [HAPI FHIR](https://github.com/peterruler/hapi-fhir/blob/main/another.application.yaml)

# mariadb container

docker run -p 3306:3306 --name mariadb1 -v C:/Projects/HAPI_FHIR/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=password -d mariadb:latest

# run cmd in interactive mode in container

docker exec -it mariadb1 mysql -u root -p

# make mysql available from outside Y(es) via gateway address

mysql_secure_installation

# get ip: isn't woking om my machine

docker inspect mariadb1

docker exec -it <CONTAINER_ID>  mysql -uroot -p

mysql>  CREATE USER 'nilu'@'172.17.0.1' IDENTIFIED BY 'password';

mysql> GRANT ALL PRIVILEGES ON *.* TO 'nilu'@'172.17.0.1' WITH GRANT OPTION;

mysql> flush privileges;
 
mysql> exit 


# client is needed to access via localhost

brew install mysql-client

# with mysql

docker run -p 8080:8080 --name happy1 -v C:/Projects/HAPI_FHIR:/configs -e "--spring.config.location=file:///configs/another.application.yaml" hapiproject/hapi:latest

# run a container without mysql, is either or on Port 8080, or choose different port

docker run -p 8080:8080 --name happy5 hapiproject/hapi:latest

# alernative on macos with mysql via brew

# brew install

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# mysql install

brew install mysql

# mysql start/stop
mysql.server start
mysql.server stop

mysql_secure_installation

# mysql-client is needed to properly access databases on localhost

brew install mysql-client

(linux: apt install mysql-client aequivalent)

# /opt/homebrew/Cellar/mysql-client/8.0.28/bin

echo 'export PATH=/opt/homebrew/Cellar/mysql-client/8.0.28/bin:$PATH' >> ~/.bash_profile
source ~/.bash_profile