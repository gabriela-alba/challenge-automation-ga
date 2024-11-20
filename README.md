# Bienvenidos al proyecto de automatización de APIs y WEB!

Hola! Mi nombre es Gabriela Alba.

Espero recibir sus sugerencias y comentarios.
Muchas gracias.

## Descripción del proyecto 📋

Este proyecto contiene pruebas automatizadas tanto de API como de Web utilizando Playwright, TypeScript y Cucumber.

Con Cucumber, se estructuran las pruebas en formato BDD (Behavior-Driven Development) utilizando Gherkin, lo que permite escribir escenarios de prueba claros y comprensibles.
El proyecto incluye la ejecución de pruebas por separado según los tags configurados, generación de reportes detallados, y validación de especificaciones específicas para cada prueba.

## Requisitos del sistema 🔧

- Node.js: Versión 16 o superior
- npm: Versión 8 o superior
- Git: Para clonar el repositorio

## Configuración del Proyecto 🚀

1. Clonar el repositorio
    ```
    $ git clone https://github.com/gabriela-alba/challenge-automation-ga.git
    ```
2. Instalar dependencias
    ```
    $ npm install
    ```

## Ejecución de Pruebas 📂

**Ejecutar las pruebas por separados según los @tag**

_Ejecución de prueba API parte 1_
    ```
    $ npm run test:pokemon_get
    ```

_Abrir reporte de prueba API parte 1_
    ```
    $ npm run open:report:pokemon_get
    ```

_Ejecución de prueba API parte 2_
    ```
    $ npm run test:jsonplaceholder_post
    ```

_Abrir reporte de prueba API parte 2_
    ```
    $ npm run open:report:jsonplaceholder_post
    ```

_Ejecución de prueba WEB_
    ```
    $ npm run test:wiki_pokemon
    ```

_Abrir reporte de prueba WEB_
    ```
    $ npm run open:report:wiki_pokemon
    ```

## Limpieza de Reportes 🧹 
_Limpiar reportes_
    ```
    $ npm run clean:reports
    ```

## Seguridad 🔒

Se utilizó una clave secreta que nunca es visible en el código. Se encripta usando **SHA256** y se loguea en consola antes de ejecutar cada prueba. Para esto se ustiliza fixtures en Playwright.

## Dependencias Principales 📘

- Plawright
- Cucumber
- TypeScript
- XLSX (para leer datos desde el archivo Excel)
- SHA256 (para encriptar la clave secreta)

## Contribuciones ✍️

Si deseas contribuir al proyecto, por favor, abre un pull request o crea un issue para reportar problemas.


## Author 👩🏻‍💻

**Gabriela Alba** - *Sr QA Automation Engineer*
