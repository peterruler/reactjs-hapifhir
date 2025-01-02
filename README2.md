# README
Important config commands for  ZHAW Linux Server with HAPi FHIR installation <br>
URL HAPI FHIR: http://kswcdr.ddns.net:8080/ URI: 160.85.252.222:8080

-----------

# Troubleshooting
If server is not running (can happen after periodical restart) do the following: 
1) Run `docker ps`
2) If no container is running -> start mariadb `docker start mariadb1` and wait few seconds
	else continue with 3)
3) Start mariadb1 container via run command (see section SERVER -> Start [mariadb1] mariadb )
4) If mariadb1 runs start hapi fhir server via `docker start happy1`
	else if not running continue with 5)
5) Start happy1 container with run command (see further down)
6) Check if client runs with `sudo forever list` and if not running start as described in section Client -> START CLIENT

-----------

# FIREWALL
### FIREWALL CMDS
 - sudo ufw  status
 - sudo ufw allow / deny

### Activate SSH Brute Force Prevention
 - sudo service fail2ban start
 - sudo service fail2ban stop

-----------

# SERVER (docker & mariadb)
## START SERVER
### WITHOUT Config (WITHOUT mysqldb & CORS)
 - docker run -p 8080:8080 -e hapi.fhir.default_encoding=xml hapiproject/hapi

### WITH [happy1] Config -> USE THIS (builds new container if not exists and starts it)
 - docker run -p 8080:8080 --name happy1 -v /home/ubuntu/HAPI_FHIR:/configs -e "--spring.config.location=file:///configs/another.application.yaml" hapiproject/hapi:latest
### FHIR CORS
- see yaml Line 89 - 94 for correct definition, necessary for Crosssite-Requests

### Start [mariadb1] mariadb 
 - docker run -p 3306:3306  --name mariadb1 -v /home/ubuntu/mysql:/var/lib/mysql  -e MYSQL_ROOT_PASSWORD=password -d mariadb:latest

### Install service for docker container
 - cd /etc/systemd/system/
 - sudo vi happydocker.service

### Configure docker hapi fhir as service, Content from happydocker.service

	echo 
	[Unit]
	Description=Happydocker container
	After=docker.service
	Wants=network-online.target docker.socket
	Requires=docker.socket

	[Service]
	Restart=always
	ExecStart=/usr/bin/docker start -a happy1
	ExecStop=/usr/bin/docker stop -t 10 happy1

	[Install]
	WantedBy=multi-user.target
	>> /etc/systemd/system/happydocker.service

### start docker hapi fhir as service
 - sudo systemctl start happydocker
 
### stop docker hapi fhir service
 - sudo systemctl stop happydocker

### access mariadb
 - docker exec -it mariadb1 bash

### get actual ip address to connect to mysql
 - Container IP abfragen mit: `ip address`
 - on ubuntu usually 172.17.0.2

### login to mysql inside of container
 - mysql -u root -p 

### save whole mysql database
 - mysqldump -u root -p hapi_dstu3 > /var/lib/mysql/2021-03-30-hapi_dstu3.sql

### stop mariadb service
 - sudo service mysql stop 

### check docker status
#### Get IP of container  (2te Methode) last parameter is container name
 - docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mariadb1
 - docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' happy1

### docker images list
 - docker images -a

### docker list containers
 - docker container ls

### docker start (existing container)
 - docker start $containername 
 - (mariadb1 oder happy1)

### docker stop
 - docker stop $containername

### delete images except...
 - docker rm $(docker ps -a | grep -v "my_docker" | awk 'NR>1 {print $1}')

------------

# CLIENT 
## Check Client
### CHECK IF PORT IS USED
 - sudo lsof -i -P -n | grep LISTEN
### "FREE" PORT
 - sudo fuser -k 80/tcp 
 - sudo fuser -k 3306/tcp
 - sudo fuser -k 8080/tcp
 - sudo fuser -k 9000/tcp
 
 ### CHECK IF CLIENT RUNS
 - sudo forever list 

## Start Client
### UC01 & UC05: Questionnaire und CDS Hooks
 - cd $HOME/ksw-app
 - sudo PORT=80 forever start -c "node app.js" ./
### Compile frontend UC01/UC05
#### build production installation
 - npm run-script build
#### run app without process/forever 
 - node app.js

### UC10: Studienerfassung
 - cd $HOME/ksw-studienerfassung/
 - sudo PORT=9000 forever start -c "yarn start" ./
#### Compile frontend UC10
 - yarn build 
#### run app without process/forever 
 - yarn start
 #### Missing Data 
 - Upload [Sample Data for UC05](https://github.zhaw.ch/yosepmic/BA21_acke_01/blob/master/HAPI_FHIR/CreateSampleData.json) with postman 
 
## STOP CLIENT
 - sudo forever stopall
 - sudo forever stop <PROCID>