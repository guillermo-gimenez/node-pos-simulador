# Node POS Simulador

Este proyecto simula un servicio web de un sistema de punto de venta (POS) utilizando Node.js y Express. A continuación se detallan las instrucciones para instalar y ejecutar la aplicación.

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. Clona el repositorio:

   ```
   git clone <URL_DEL_REPOSITORIO>
   cd node-pos-simulador
   ```

2. Instala las dependencias:

   ```
   npm install express body-parser
   ```

## Ejecución

Para iniciar el servidor, ejecuta el siguiente comando:

```
node app.js
```

El servidor escuchará en `http://localhost:3000`.

## Rutas

A continuación se describen las rutas disponibles en la aplicación:

- **POST /pos/eco**: Simula la funcionalidad de eco.
- **POST /pos/venta-ux**: Simula una venta a través de UX.
- **POST /pos/venta/credito**: Simula una venta con tarjeta de crédito.
- **POST /pos/venta/debito**: Simula una venta con tarjeta de débito.
- **POST /pos/descuento**: Simula la aplicación de un descuento.
- **POST /pos/venta-qr**: Simula una venta a través de QR.
- **POST /pos/venta-canje**: Simula una venta de canje.
- **POST /pos/venta-billetera**: Simula una venta a través de billetera.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.