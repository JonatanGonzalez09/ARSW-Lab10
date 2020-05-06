# ARSW-Lab10 #
### Escuela Colombiana de Ingeniería
### Arquitecturas de Software - ARSW

## Laboratorio REDIS
## Autores
- David Caycedo
- Jonatan Gonzalez

_El lab fue realizado en el sistema Operativo Windows; algunos comandos diferentes del sistema operativo Linux usados para redis fueron:_

 - ```flushall```: **Elimina todos los registros de las keys generadas.** 
 - **Para ejecutar el _redis-server no fue necesario hacerlo desde consola, solo fue necesario descargar el ZIP y al descomprimirlo estabam los ejecutables tanto del _server-clie_ como el de _redis-server_**
 
## Compontes Usados ##
- **Azure Functions:** _Son servicios sin servidor alojados en la nube de Microsoft Azure. Están diseñadas para acelerar y simplificar el desarrollo de aplicaciones._
- **Azure Cache for Redis:** _Este producto proporciona un almacén de datos en memoria basado en Redis. Esto mejora el rendimiento y la escalabilidad de los sistemas que dependen en gran medida de los almacenes de datos de back-end._ 

## Pruebas ##
Se realizaron las pruebas iniciando con el caché vacio, es decir la base de datos sin nungun valor.

### Localhost (_**http://localhost:7071/api/Fibonacci**_) ###

**Se realizo la prueba con el _fibonacci(_1000_)_, y el resultado fue de _1668ms_**
![](https://github.com/JonatanGonzalez09/ARSW-Lab10/blob/master/images/localHost1000.png)

**Se realizo la prueba con el _fibonacci(_10000_)_, y el resultado fue de _16.40s_**
![](https://github.com/JonatanGonzalez09/ARSW-Lab10/blob/master/images/localHost10000.png)

**Se realizo la prueba con el _fibonacci(_5000_)_, y el resultado fue de _121ms_**

**En este último caso se puede ver que el tiempo se reduce significativamente debido a que ya tiene el valor de _fibonacci(5000)_ y solo se reduce a que tiene que ir a consultar esa posición.** 
![](https://github.com/JonatanGonzalez09/ARSW-Lab10/blob/master/images/localHost5000.png)

**En esta imagen podemos observar que ya en Redis se almacenan los valores que ha calculado hasta el momento, y así puede reducir los tiempos en calcular los datos que se soliciten, siempre y cuando estén almacenados.**
![](https://github.com/JonatanGonzalez09/ARSW-Lab10/blob/master/images/consoleLocalHost.png)

### Azure (**_https://redis-lab10.azurewebsites.net/api/Fibonacci_**) ###
**Ya montada la funcion con su cache en Azure se hicieron las siguientes pruebas:**

**Se realizo la prueba con el _fibonacci(_1000_)_, y el resultado fue de _14.89s_**
![](https://github.com/JonatanGonzalez09/ARSW-Lab10/blob/master/images/Azure1000.png)

**Se realizo la prueba con el _fibonacci(_10000_)_, y el resultado fue de _27.36s_**
![](https://github.com/JonatanGonzalez09/ARSW-Lab10/blob/master/images/Azure10000.png)

**Se realizo la prueba con el _fibonacci(_5000_)_, y el resultado fue de _216ms_**

**En este último caso se puede ver que el tiempo se reduce significativamente debido a que ya tiene el valor de _fibonacci(5000)_ y solo se reduce a que tiene que ir a consultar esa posición.** 
![](https://github.com/JonatanGonzalez09/ARSW-Lab10/blob/master/images/Azure5000.png)

**En esta imagen podemos observar que ya en Redis se almacenan los valores que ha calculado hasta el momento, y así puede reducir los tiempos en calcular los datos que se soliciten, siempre y cuando estén almacenados.**
![](https://github.com/JonatanGonzalez09/ARSW-Lab10/blob/master/images/AzureConsole1.png)

**En esta imagen podemos ver que ya tiene los datos almacenados de los numeros anteriormente conslultados, es por eso que al consultar _fibonacci(5000)_, el tiempo de respuesta es rapido debido ha que ya lo tiene almacendo.**
![](https://github.com/JonatanGonzalez09/ARSW-Lab10/blob/master/images/AzureConsole2.png)

**Aca podremos ver el monitoreo para Azure Cache for Redis. Estos monitoreos permiten ver métricas, anclar gráficos de métricas en el Panel de inicio, personalizar el rango de fecha y hora de los gráficos de monitoreo, agregar y eliminar métricas de los gráficos y establecer alertas cuando se cumplan ciertas condiciones**

**Para este caso solo mostraremos la grafica de la memoria usada por el caché**
![](https://github.com/JonatanGonzalez09/ARSW-Lab10/blob/master/images/Memory%20Usage%20Azure.png)

**Para este caso solo mostraremos el porcentaje de datos que ha cargado la instancia de el caché creado en Azure**
![](https://github.com/JonatanGonzalez09/ARSW-Lab10/blob/master/images/Redis%20Server%20Load.png)

### Conclusiones ###
El funcionamiento es un poco mejor desde el localhost, debido que al desplegar la Función en Azure y consultar algun valor de fibonnaci el tiene que consultar primero a Azure y azure despues consulta en el Caché de redis que fue creado, mientras que localmente consulta directamente en el servidor redis, pero finalmente lo que determina una verdadera diferencia de tiempo es la memorización que nos permite tener los valores casi al instante.
