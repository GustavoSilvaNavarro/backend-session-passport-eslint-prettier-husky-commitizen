# DESAFIO SERVIDOR CON BALANCE DE CARGA
## Node
- Se inicia el servidor en modo fork con el siguiente comando:
```
npm start
```
- Para ver los procesos activos utilizo el comando:
```
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186904469-c8ac293e-d7e0-479a-8c07-7a6035b8ef2b.png)

- Se inicia el servidor en modo cluster con el siguiente comando:
```
"start": "node . -m cluster",
```
- Para ver los procesos activos utilizo el comando:
```
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186905299-2c2482d6-d53c-4693-8263-9b030e1d8f68.png)

## Nodemon
- Se inicia el servidor en modo fork con el siguiente comando:
```
"start:dev": "start http://localhost:8080 && nodemon .",
```
- Para ver los procesos activos utilizo el comando:
```
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186905941-1eba07a5-cf9b-43d0-87c2-bd03e7b92934.png)

- Se inicia el servidor en modo cluster con el siguiente comando:
```
"start:dev-args": "nodemon . -p 3000 -n Gustavo -m cluster",
```
- Para ver los procesos activos utilizo el comando:
```
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186906463-88bae961-dff6-4b9a-947e-f8fb91ae443a.png)

## Forever
- Se inicia el servidor en modo fork con el siguiente comando:
```
"start:forever": "forever start -w . -m fork",
```
- Para ver los procesos activos, por sistema operativo utilizo el comando:
```
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186907497-8dfc5086-4a9a-43cc-9cb5-64663cefe1db.png)

- Para ver los procesos activos, por **Forever Command** utilizo el comando:
```
forever list
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186907941-b4544d0f-1ef9-4572-8b69-d43507af35cf.png)

- Se inicia el servidor en modo cluster con el siguiente comando:
```
"start:forever": "forever start -w . -m cluster",
```
- Para ver los procesos activos, por sistema operativo utilizo el comando:
```
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186908885-5fe417a4-2352-4774-be01-fc52fd6995c3.png)

- Para ver los procesos activos, por **Forever Command** utilizo el comando:
```
forever list
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186909198-608ebb85-69cf-4a51-8c37-4657035c5b77.png)

- Para matar un proceso por consola usar (caso nueva terminal windows es kill), para CMD de windows usar taskkill :
```
kill <pid>
taskkill <pid>
```

## PM2
- Se inicia el servidor en modo fork con el siguiente comando:
```
"start:pm2": "pm2 start src/app.js --watch",
```
- Para ver los procesos activos, por sistema operativo utilizo el comando:
```
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186935503-d682f5d7-9aa9-484f-954e-e3bf0a60b8e8.png)

- Para ver los procesos activos, por **PM2 Command** utilizo el comando:
```
pm2 list
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186935940-08abb3e4-d57f-4fea-86be-9f0178031524.png)

- Se inicia el servidor en modo cluster con el siguiente comando:
```
"start:pm2": "pm2 start src/app.js --watch -i max",
```
- Para ver los procesos activos, por sistema operativo utilizo el comando:
```
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186936784-32e56a1d-1dad-4f27-9e14-326a3fbd0217.png)

- Para ver los procesos activos, por **PM2 Command** utilizo el comando:
```
pm2 list
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186936675-0cd2189b-d04b-48e0-a410-fec590e9d01c.png)

# Correr servidor en modo Cluster y Fork por Codigo
1. Mirar configuracion de archivo **app.js**
2. Escribir el siguiente comando:
```
pm2 start src/app.js --watch -- -- 8081 cluster
```
3. Para no tener que copiar otro archivo y hacer que mi servidor corra en modo fork, escribo:
```
pm2 start src/app.js -f --watch -- -- 8080 fork
```
4. Para redirigir solo la consulta a ruta **/api/randoms** al puerto **8081** que esta en modo **CLUSTER**, y el resto de mis rutas al puerto unico **8080** que esta en modo **FORK**, el archivo de configuracion de NGINX sera de la siguiente manera:
## NGINX FILE
```
events {
}

http {
  include       mime.types;
  default_type  application/octet-stream;

  # New Server Gustavo Silva
  upstream node_app_routes {
    server 127.0.0.1:8080;
  }

  upstream random_route {
    server 127.0.0.1:8081;
  }

  server {
    listen 80;
    server_name  nginx_node;

    location / {
      proxy_pass http://node_app_routes;
    }

    location /products {
      proxy_pass http://node_app_routes;
    }

    location /signup {
      proxy_pass http://node_app_routes;
    }

    location /login {
      proxy_pass http://node_app_routes;
    }

    location /logout {
      proxy_pass http://node_app_routes;
    }

    location /info {
      proxy_pass http://node_app_routes;
    }

    location /api/randoms {
      proxy_pass http://random_route;
    }

    # THIS IS HOW TO SERVE STATIC FILES WHEN THE FOLDER IS IN A DIFFERENT PATH AND HAVE SPACES IN THE MAIN RUOUTE DONT FORGET THE """
    # location /public/ {
    #  root "E:/Users/Gustavo Silva/Desktop/CoderHouse/testNginx/";
    # }

    # error_page   500 502 503 504  /50x.html;
    location /50x.html {
      root html;
    }
  }
}
```
# Correr servidor en modo Cluster (gestionado por NGINX) y Fork
1. Mirar configuracion de archivo **app.js**
2. Escribir el siguiente comando:
```
pm2 start src/app.js --watch -- -- 8080 fork
```
3. Para no tener que copiar otro archivo y hacer que mi servidor corra en modo fork, escribo los siguiente comando con los puertos que gestionara **NGINX**:
```
pm2 start src/app.js -f --watch -- -- 8082 fork
pm2 start src/app.js -f --watch -- -- 8083 fork
pm2 start src/app.js -f --watch -- -- 8084 fork
pm2 start src/app.js -f --watch -- -- 8085 fork
```
4. Para redirigir solo la consulta a ruta **/api/randoms** al puerto **8082, 8083, 8084, 8085** que estara en modo **CLUSTER pero manejado por NGINX**, y el resto de mis rutas al puerto unico **8080** que esta en modo **FORK**, el archivo de configuracion de NGINX sera de la siguiente manera:

## NGINX FILE
```
events {
}

http {
  include       mime.types;
  default_type  application/octet-stream;

  # New Server Gustavo Silva
  upstream node_app_routes {
    server 127.0.0.1:8080;
  }

  upstream random_route {
    server 127.0.0.1:8082;
    server 127.0.0.1:8083;
    server 127.0.0.1:8084;
    server 127.0.0.1:8085;
  }

  server {
    listen 80;
    server_name  nginx_node;

    location / {
      proxy_pass http://node_app_routes;
    }

    location /products {
      proxy_pass http://node_app_routes;
    }

    location /signup {
      proxy_pass http://node_app_routes;
    }

    location /login {
      proxy_pass http://node_app_routes;
    }

    location /logout {
      proxy_pass http://node_app_routes;
    }

    location /info {
      proxy_pass http://node_app_routes;
    }

    location /api/randoms {
      proxy_pass http://random_route;
    }

    # THIS IS HOW TO SERVE STATIC FILES WHEN THE FOLDER IS IN A DIFFERENT PATH AND HAVE SPACES IN THE MAIN RUOUTE DONT FORGET THE """
    # location /public/ {
    #  root "E:/Users/Gustavo Silva/Desktop/CoderHouse/testNginx/";
    # }

    # error_page   500 502 503 504  /50x.html;
    location /50x.html {
      root html;
    }
  }
}
```

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)