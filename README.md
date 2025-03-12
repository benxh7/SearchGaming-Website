# Tarea Semana 1 Programación Web

## Caso
Somos una PYME que desea promocionar la venta de su catálogo de videojuegos, 
y deseamos que su grupo de trabajo nos cree un sitio web que permita 
mostrar la información de cada uno de los juegos que tenemos disponibles

## Features
1. **Pagina de Principal:** Pagina en donde los usuarios accederan para luego proceder a buscar juegos. 🔨 **EN DESAROLLO**
2. **Pagina de Categorias:** Cada categoría deberá tener un hipervínculo asociado y una imagen de referencia de esta. ❌ **PENDING**
3. **Descripcion de Juegos:** Dentro de la sección de cada categoría se deberá desarrollar una ficha con los siguientes datos de los juegos listados dentro: imagen del juego, nombre del juego, una breve descripción y el precio o valor de venta. ❌ **PENDING**
4. **Barra de Navegación:** Cada pantalla interna deberá tener una serie de hipervínculos que permita pasar de una página a otra o volver al inicio. ✔️ **ADDED**
5. **Cantidad de Categorias:** Cada pantalla interna deberá tener una serie de hipervínculos que permita pasar de una página a otra o volver al inicio. ❌ **PENDING**
6. **Diseño de la Web** Diseño general y visual de la pagina. 🔨 **EN DESAROLLO**

## Requirements

- Java 21
- Spigot 1.21.1
- MySQL
- Vault

## Database Configuration

### database.yml
```yml
mysql:
  host: 127.0.0.1
  port: 3306
  max-life-time: 1800000
  pool-size: 5
  database: database
  username: root
  password: ''
redis:
  host: 127.0.0.1
  port: 6379
  database: 1
  password: ''
```
