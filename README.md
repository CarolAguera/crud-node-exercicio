# Projeto em Node.Js
 
## Criar Image MYSQL utilizando dockerfile
```
sudo docker build --tag=mysql-image -f ./docker/dockerfile .
```
## Criar o Container

```
docker run --name mysql-container  \
-p 3306:3306 -p 33060:33060  \
-e MYSQL_ROOT_HOST='%' -e MYSQL_ROOT_PASSWORD='gazin'   \
-d mysql-image:latest 
```

## Entrando dentro do container do MYSQL
```
docker exec -it mysql-container mysql -uroot -pgazin
```