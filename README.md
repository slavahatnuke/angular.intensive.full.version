## AngularJS Intensive + server side

### How to start

#### docker:
```
## get docker IP
> docker-machine ip
192.168.99.100 ## this is dynamic [docker-ip]

## install deps
> docker-compose run app bash
> npm run setup
> exit

## start project
> npm run start.docker
```
visit: [http://[docker-ip]:5100/](http://[docker-ip]:5100/)

#### vagrant:
```
## up
> vagrant up
> vagrant ssh
> cd ~/project

## setup
> npm run setup

## start project
> nodemon app.js
```
visit: [http://[vagrant-ip]:3000/](http://[vagrant-ip]:3000/)
