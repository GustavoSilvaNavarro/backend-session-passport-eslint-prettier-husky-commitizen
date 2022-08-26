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

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)