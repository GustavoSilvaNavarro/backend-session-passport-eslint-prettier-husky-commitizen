# DESAFIO SERVIDOR CON BALANCE DE CARGA
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
## Node
- Se inicia el servidor en modo fork con el siguiente comando:
```bash
npm start
```
- Para ver los procesos activos utilizo el comando:
```bash
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186904469-c8ac293e-d7e0-479a-8c07-7a6035b8ef2b.png)

- Se inicia el servidor en modo cluster con el siguiente comando:
```bash
"start": "node . -m cluster",
```
- Para ver los procesos activos utilizo el comando:
```bash
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186905299-2c2482d6-d53c-4693-8263-9b030e1d8f68.png)

## Nodemon
- Se inicia el servidor en modo fork con el siguiente comando:
```bash
"start:dev": "start http://localhost:8080 && nodemon .",
```
- Para ver los procesos activos utilizo el comando:
```bash
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186905941-1eba07a5-cf9b-43d0-87c2-bd03e7b92934.png)

- Se inicia el servidor en modo cluster con el siguiente comando:
```bash
"start:dev-args": "nodemon . -p 3000 -n Gustavo -m cluster",
```
- Para ver los procesos activos utilizo el comando:
```bash
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186906463-88bae961-dff6-4b9a-947e-f8fb91ae443a.png)

## Forever
- Se inicia el servidor en modo fork con el siguiente comando:
```bash
"start:forever": "forever start -w . -m fork",
```
- Para ver los procesos activos, por sistema operativo utilizo el comando:
```bash
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186907497-8dfc5086-4a9a-43cc-9cb5-64663cefe1db.png)

- Para ver los procesos activos, por **Forever Command** utilizo el comando:
```bash
forever list
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186907941-b4544d0f-1ef9-4572-8b69-d43507af35cf.png)

- Se inicia el servidor en modo cluster con el siguiente comando:
```bash
"start:forever": "forever start -w . -m cluster",
```
- Para ver los procesos activos, por sistema operativo utilizo el comando:
```bash
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186908885-5fe417a4-2352-4774-be01-fc52fd6995c3.png)

- Para ver los procesos activos, por **Forever Command** utilizo el comando:
```bash
forever list
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186909198-608ebb85-69cf-4a51-8c37-4657035c5b77.png)

- Para matar un proceso por consola usar (caso nueva terminal windows es kill), para CMD de windows usar taskkill :
```bash
kill <pid>
taskkill <pid>
```

## PM2
- Se inicia el servidor en modo fork con el siguiente comando:
```bash
"start:pm2": "pm2 start src/app.js --watch",
```
- Para ver los procesos activos, por sistema operativo utilizo el comando:
```bash
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186935503-d682f5d7-9aa9-484f-954e-e3bf0a60b8e8.png)

- Para ver los procesos activos, por **PM2 Command** utilizo el comando:
```bash
pm2 list
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186935940-08abb3e4-d57f-4fea-86be-9f0178031524.png)

- Se inicia el servidor en modo cluster con el siguiente comando:
```bash
"start:pm2": "pm2 start src/app.js --watch -i max",
```
- Para ver los procesos activos, por sistema operativo utilizo el comando:
```bash
tasklist/fi "imagename eq node.exe"
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186936784-32e56a1d-1dad-4f27-9e14-326a3fbd0217.png)

- Para ver los procesos activos, por **PM2 Command** utilizo el comando:
```bash
pm2 list
```
* Se obtiene lo siguiente:

![image](https://user-images.githubusercontent.com/66889974/186936675-0cd2189b-d04b-48e0-a410-fec590e9d01c.png)

# Correr servidor en modo Cluster y Fork por Codigo
1. Mirar configuracion de archivo **app.js**
2. Escribir el siguiente comando:
```bash
pm2 start src/app.js --watch -- -- -p 8081 -m cluster
```
3. Para no tener que copiar otro archivo y hacer que mi servidor corra en modo fork, escribo:
```bash
pm2 start src/app.js -f --watch -- -- -p 8080 -m fork
```
4. Para redirigir solo la consulta a ruta **/api/randoms** al puerto **8081** que esta en modo **CLUSTER**, y el resto de mis rutas al puerto unico **8080** que esta en modo **FORK**, el archivo de configuracion de NGINX sera de la siguiente manera:
## NGINX FILE
```javascript
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
```bash
pm2 start src/app.js --watch -- -- -p 8080 -m fork
```
3. Para no tener que copiar otro archivo y hacer que mi servidor corra en modo fork, escribo los siguiente comando con los puertos que gestionara **NGINX**:
```bash
pm2 start src/app.js -f --watch -- -- -p 8082 -m fork
pm2 start src/app.js -f --watch -- -- -p 8083 -m fork
pm2 start src/app.js -f --watch -- -- -p 8084 -m fork
pm2 start src/app.js -f --watch -- -- -p 8085 -m fork
```
4. Para redirigir solo la consulta a ruta **/api/randoms** al puerto **8082, 8083, 8084, 8085** que estara en modo **CLUSTER pero manejado por NGINX**, y el resto de mis rutas al puerto unico **8080** que esta en modo **FORK**, el archivo de configuracion de NGINX sera de la siguiente manera:

## NGINX FILE
```javascript
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

## COMPRESSION USING GZIP
1. This package is pretty useful to compress the responses to the client using less bytes.
2. Example of the total memory used for the computer

![image](https://user-images.githubusercontent.com/66889974/188130759-cc595b47-eed3-4609-860a-3ef29613df1b.png)

3. Luego aplicaremos la compresion a todas nuestras respuestas con el middleware:
```javascript
app.use(compression());
```
![image](https://user-images.githubusercontent.com/66889974/188130291-e8a0a6df-0bc9-45b7-b0b2-1e8cb83205bf.png)

Se ve la diferencia notable entre ambas respuestas debido a la diferencia entre 3.6 Kb y 1.7Kb para la version comprimida

# Analisis de Performance / PROFILING
## Artillery
### Ruta /info mostrando resultado, antes de enviar al cliente
1. Levanto servidor empleando la herramienta de NodeJs para el profiling
```bash
node --prof src/app.js -p 3000 -n Christa -m fork
```
2. Crear peticion a la ruta seleccionada en este caso con **_curl_**:
```bash
curl -X GET "http://localhost:3000/info"
```
3. Basicamente en base a los requrimientos de test de carga se procede con el siguiente comando de artillery
```bash
artillery quick --count 20 -n 50 http://localhost:3000/info > src/tests/result_clg_fork.txt
```
4. Obteniendose los siguiente resultados

![clg](https://user-images.githubusercontent.com/66889974/188287648-e145344f-e455-460b-9721-e903452ee9c8.png)

5. Luego se tiene que procesar la informacion con el comando, cuyo resultado se encontrar en la carpeta tests:
```bash
node --prof-process clg_fork_v8.log > src/tests/clg_fork_v8_prof_process.txt
```

### Ruta /info sin mostrar resultados por consola antes de enviar al cliente
1. Levanto servidor empleando la herramienta de NodeJs para el profiling
```bash
node --prof src/app.js -p 3000 -n Christa -m fork
```
2. Crear peticion a la ruta seleccionada en este caso con **_curl_**:
```bash
curl -X GET "http://localhost:3000/info"
```
3. Basicamente en base a los requrimientos de test de carga se procede con el siguiente comando de artillery
```bash
artillery quick --count 20 -n 50 http://localhost:3000/info > src/tests/result_noClg_fork.txt
```
4. Se obtiene el siguiente resultado empleando **_ARTILLERY_**:

![no_clg](https://user-images.githubusercontent.com/66889974/188287623-79791295-fa40-4754-ab9c-6792fe673808.png)

5. Luego se tiene que procesar la informacion con el comando, cuyo resultado se encontrar en la carpeta tests:
```bash
node --prof-process no_clg_fork_v8.log > src/tests/no_clg_fork_v8_prof_process.txt
```

### CONCLUSION
Debido a que la diferencia entre los procesos de ambas rutas son los mismo con la diferencia de que uno cuenta con un console.log extra mas que el otros los resultados son muy parecido, en el caso del que tiene el console.log extra cuenta con menos ticks pero basicamente los tiempos son los mismos.

## Autocannon
### Ruta /info mostrando resultado, antes de enviar al cliente
1. Para los test con autocanon se realizaron con 100 conexiones durante un periodo de 20 segundos para lo cual se empleo la configuracion del archivo ubicado en la carpeta **utils** el archivo llamado **_autocannon.js_**.
2. Para correr las pruebas y evaluar los tiempos de los procesos se utilizo la herramienta de google chrome **_chrome://inspect_** y se arraco el servidor en modo inspect con el siguiente comando
```bash
node --inspect src/app.js
```
3. Luego abro la herramienta de google chrome typing in google chrome browser
```bash
chrome://inspect
```
4. Ir a **Profiler** y dar click en start para grabar
5. Una vez este grabando hago los test empleando el script y/o comando:
```bash
"test": "node src/utils/autocannon.js"
```
  5.a. En caso se quiere emplear la linea de comandos de la terminal en lugar de utilizar un archivo de configuracion para hacer los test, simplemente escribo el siguiente comando en la terminal:
``` bash
autocannon -c 100 -d 20 -l http://localhost:8080/info
```
  5.b. El resultado sera el mismo muy parecido al anteriro:

![image](https://user-images.githubusercontent.com/66889974/188328139-666f01c2-0b2d-4d03-9265-7f7700a8d889.png)

6. Una vez terminen los test paro la grabacion en el profiler y aun no cierro mi servidor ya que necesito ver primero los resultados en las rutas establecidas.
7. Obtengo los siguientes resultados:

![cl_autocannon_times_test](https://user-images.githubusercontent.com/66889974/188323914-9ae225b5-7f5d-4fbf-962b-3a0bbca86b34.png)

8. Seguido si queremos realizar la prueba de nuevo y emitir un diagrama de flama para analisar lo tiempos de los pocesos menos performantes se debe inicar el servidor con el comando 0x, en este caso iniciamos el servidor con el siguiente script:
```bash
"start:0xtest": "0x src/app.js",
```
9. Repetimos las pruebas con autocannon empleando el comando:
```bash
"test": "node src/utils/autocannon.js"
```
10. Se obtienen los siguientes resultado de autocannon:

![clg_autocannon_test](https://user-images.githubusercontent.com/66889974/188324093-42b39b66-3a02-4fa2-9eb2-b2f425ca8edf.png)

11. El diagrama de flama se vera dentro de la carpeta que se genere en este caso la carpeta es la **_28204.0x_**. En este caso hemos anadido un console.log antes de enviar la respuesta al server. La carpeta se encuentra dentro de la carpeta tests

![image](https://user-images.githubusercontent.com/66889974/188324224-0679e708-9fd4-4d7a-a45b-7cd29a0bd8c7.png)

![image](https://user-images.githubusercontent.com/66889974/188324251-a0e457e8-051a-48c3-b193-154e1c3f8bc0.png)

### Ruta /info sin mostrar resultados por consola antes de enviar al cliente
1. Para los test con autocanon se realizaron con 100 conexiones durante un periodo de 20 segundos para lo cual se empleo la configuracion del archivo ubicado en la carpeta **utils** el archivo llamado **_autocannon.js_**.
2. Para correr las pruebas y evaluar los tiempos de los procesos se utilizo la herramienta de google chrome **_chrome://inspect_** y se arraco el servidor en modo inspect con el siguiente comando
```bash
node --inspect src/app.js
```
3. Luego abro la herramienta de google chrome typing in google chrome browser
```bash
chrome://inspect
```
4. Ir a **Profiler** y dar click en start para grabar
5. Una vez este grabando hago los test empleando el script y/o comando:
```bash
"test": "node src/utils/autocannon.js"
```
  5.a. En caso se quiere emplear la linea de comandos de la terminal en lugar de utilizar un archivo de configuracion para hacer los test, simplemente escribo el siguiente comando en la terminal:
``` bash
autocannon -c 100 -d 20 -l http://localhost:8080/info
```
  5.b. El resultado sera el mismo muy parecido al anteriro:

![image](https://user-images.githubusercontent.com/66889974/188328139-666f01c2-0b2d-4d03-9265-7f7700a8d889.png)

6. Una vez terminen los test paro la grabacion en el profiler y aun no cierro mi servidor ya que necesito ver primero los resultados en las rutas establecidas.
7. Obtengo los siguientes resultados:

![image](https://user-images.githubusercontent.com/66889974/188324804-81806a63-36db-441a-ab69-74ac88e2686f.png)

8. Seguido si queremos realizar la prueba de nuevo y emitir un diagrama de flama para analisar lo tiempos de los pocesos menos performantes se debe inicar el servidor con el comando 0x, en este caso iniciamos el servidor con el siguiente script:
```bash
"start:0xtest": "0x src/app.js",
```
9. Repetimos las pruebas con autocannon empleando el comando:
```bash
"test": "node src/utils/autocannon.js"
```
10. Se obtienen los siguientes resultado de autocannon:

![image](https://user-images.githubusercontent.com/66889974/188324952-d2634f96-6fb0-4ae7-80d5-26e75005d42f.png)

11. El diagrama de flama se vera dentro de la carpeta que se genere en este caso la carpeta es la **_22116.0x_**. En este caso hemos anadido un console.log antes de enviar la respuesta al server. La carpeta se encuentra dentro de la carpeta tests

![image](https://user-images.githubusercontent.com/66889974/188325048-1fe41102-22b4-4c7c-bd03-32798609e9d0.png)

![image](https://user-images.githubusercontent.com/66889974/188325080-5da8614e-8e74-4af5-8ed6-a61aa79bb8e1.png)

### CONCLUSION
Debido a que la diferencia entre los procesos de ambas rutas son los mismo con la diferencia de que uno cuenta con un console.log extra mas que el otros los resultados son muy parecido. Sin embargo el proceso que no tiene el console.log, tiene menos tiempos de procesamineto sin mebargo la diferencia es minima.