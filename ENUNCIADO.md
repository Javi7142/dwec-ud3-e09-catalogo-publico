# E09 · Catálogo de productos

**Tipo:** corrección por IA

Programa las funciones que consultan y transforman el catálogo de una tienda con operaciones agregadas y funciones de orden superior, sin modificar nunca los datos, y demuestra con tus propios tests que funcionan.

**CE:** RA4 b, c, d, e, k

## Entorno de trabajo

Este ejercicio trae su Dev Container en `.devcontainer/`. Como los ejercicios de la UD2 con dependencias de npm, **construye su imagen** con el `Dockerfile` de esa carpeta, a partir de la imagen oficial de Node.js de **Docker Hub**, `node:24-bookworm` (UD2, tema 9, apartado 9.3.2). Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/` (no una carpeta superior, como la del repositorio del curso: VS Code solo busca el Dev Container en la carpeta que abres), y ejecuta **Dev Containers: Reopen in Container**. Si VS Code te ofrece crear una configuración nueva, es que has abierto otra carpeta. La primera vez tarda algo más, porque descarga la imagen y la construye. Al crearse, el contenedor ejecuta `npm install`: cuando se abre, las dependencias ya están instaladas.

Ejecuta los programas en la terminal de VS Code, que ya es la del contenedor.

## Punto de partida

```text
├── package.json          ← scripts start, test, lint, format y format:check
├── eslint.config.js      ← configuración del curso (no se modifica)
├── .prettierrc
├── src/
│   ├── datos.js          ← los 12 productos (no se modifica)
│   ├── catalogo.js       ← ocho funciones con su JSDoc, sin programar
│   └── main.js           ← informe que usa las ocho funciones (no se modifica)
├── tests/
│   └── catalogo.test.js  ← un primer test de ejemplo
└── README.md             ← plantilla de entrega
```

## Requisitos

**Funciones** (`src/catalogo.js`): programa las ocho funciones según su JSDoc y el contrato (abajo).

1. Sin bucles `for`, `while` ni `for…of`: solo **operaciones agregadas**. Elige en cada caso la que corresponde (filtrado, transformación, reducción o recolección).
2. `filtrarPor` recibe los criterios con un parámetro **_rest_** y es una función de **orden superior**: cada criterio es una función.
3. `crearFiltroPrecio` y `crearFiltroEtiqueta` **devuelven funciones** (closures) que se pueden pasar a `filtrarPor` o a `aplicarDescuento`.
4. Ninguna función **modifica** el array ni los productos que recibe: usa los métodos que no mutan y el operador _spread_.
5. `ordenarPor` ordena los textos con `localeCompare` y los números por su valor.
6. `resumenPorCategoria` **agrupa** los productos por categoría.
7. `etiquetasUnicas` usa un `Set`.
8. `tablaPrecios` devuelve una **matriz** (array de arrays).
9. Mantén el JSDoc de cada función y añade comentarios donde el código no explique el porqué.

**Tests** (`tests/catalogo.test.js`):

10. Un `describe` por función con **al menos dos tests** cada una, incluidos **casos límite** (lista vacía, límites del rango de precios, descuento del 100 %…).
11. Al menos un test que compruebe que `aplicarDescuento` **no modifica** los productos originales y otro que compruebe que `ordenarPor` **no cambia el orden** de la lista original.
12. Al menos un test de error con `toThrow` y al menos una tabla con `it.each`.
13. Usa datos de prueba **propios y pequeños** (no `datos.js`), creados de nuevo para cada test con `beforeEach` o dentro de cada `it`.

**Entrega**:

14. `npm test`, `npm run lint` y `npm run format:check` sin errores.
15. Completa el `README.md` siguiendo los comentarios de la plantilla.
16. Haz varios commits a medida que avances, con mensajes que expliquen cada cambio.

## Salida esperada

Con tus funciones, `npm start` muestra exactamente:

```text
🔎 Con stock entre 10 y 30 €: Cien años de soledad, Vinilo Rosalía, Álbum de fotos, Cargador USB
🔎 Ofertas de más de 25 €: Vinilo Rosalía, Órgano infantil, Auriculares
💎 Los 3 más caros: Ebook, Órgano infantil, Ukelele
🔤 Los 5 primeros por nombre: Agenda, Álbum de fotos, Aprende JavaScript, Auriculares, bolígrafos (pack 10)
📦 Resumen por categoría:
   electrónica   3 productos ·  37 uds ·  1210.60 €
   libros        3 productos ·  17 uds ·   398.80 €
   música        3 productos ·  12 uds ·   464.73 €
   papelería     3 productos ·  70 uds ·   537.50 €
🏷️ Etiquetas: clásico, infantil, informática, instrumento, lectura, novela, oferta, oficina, regalo, vinilo
💸 Rebaja del 20 % en ofertas: L02 19.60 · M01 23.99 · M03 47.92 · P02 3.96 · E01 31.96
🗂️ Original intacto: L02 sigue a 24.50 € · primer producto L01
🧮 Código | Nombre | Precio
   P02 | bolígrafos (pack 10) | 4.95
   P03 | Agenda | 12.00
   P01 | Álbum de fotos | 14.50
❌ RangeError: Porcentaje no válido: 150
```

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| Ficheros | `package.json`, `src/catalogo.js`, `src/datos.js` y `src/main.js` (sin cambios), `tests/catalogo.test.js`, `README.md` |
| Exportaciones de `src/catalogo.js` | `filtrarPor(productos, ...criterios)`, `crearFiltroPrecio(minimo, maximo = Infinity)`, `crearFiltroEtiqueta(etiqueta)`, `ordenarPor(productos, campo, descendente = false)`, `resumenPorCategoria(productos)`, `etiquetasUnicas(productos)`, `aplicarDescuento(productos, porcentaje, criterio = () => true)`, `tablaPrecios(productos)` |
| `filtrarPor` | Productos que cumplen **todos** los criterios; sin criterios, una copia de la lista |
| `crearFiltroPrecio` | Criterio con mínimo y máximo **incluidos**: `crearFiltroPrecio(10, 30)({ precio: 30 })` → `true` |
| `ordenarPor` | Lista **nueva**. `'nombre'` ordena `Agenda`, `Álbum de fotos`, `Aprende JavaScript`, `Auriculares`, `bolígrafos (pack 10)`… |
| `resumenPorCategoria` | Array de `{ categoria, productos, unidades, valor }` en orden alfabético; `valor` redondeado a céntimos |
| `etiquetasUnicas` | Array de textos sin repetir, en orden alfabético |
| `aplicarDescuento` | Lista **nueva** en el mismo orden; precios rebajados redondeados a céntimos; los originales no cambian. `RangeError` si el porcentaje no está en (0, 100] |
| `tablaPrecios` | `[['Código', 'Nombre', 'Precio'], ['P02', 'bolígrafos (pack 10)', '4.95'], …]` |
| Tests | `tests/catalogo.test.js`, ejecutables con `npm test` |
| Secciones del README | `## Cómo ejecutarlo`, `## Operaciones agregadas`, `## Mutación y copias`, `## Pruebas`, `## Herramientas` |
| Integración continua | **Opcional**: `.github/workflows/ci.yml`, `package-lock.json` y la sección `## Integración continua (opcional)` del README. No se corrige |

## Criterios de evaluación

- ✅ Funciones bien definidas: _rest_, parámetros por defecto, closures y orden superior
- ✅ Ninguna función modifica los datos, y lo explicas
- ✅ Arrays bien creados y usados: copia, ordenación, matriz
- ✅ Cada función usa la operación agregada adecuada, sin bucles
- ✅ El informe produce la salida esperada
- ✅ Tests propios con casos límite, errores y no mutación
- ✅ JSDoc, README con pruebas y herramientas, ESLint y Prettier sin errores
- ✅ Historial de commits progresivo y con mensajes descriptivos

## Integración continua (opcional)

> 📝 Este apartado es **opcional** y no cuenta para la corrección. Hazlo si en clase habéis visto GitHub Actions; si no, sáltatelo.

Tu repositorio de la tarea ya está en GitHub. Escribe un *workflow* de GitHub Actions que pase **todas las comprobaciones del proyecto** cada vez que subas cambios. Es como el de la UD2, con una mejora: las dependencias se instalan con **`npm ci`** a partir de `package-lock.json`, el fichero que anota la versión exacta de cada paquete instalado. Así la integración continua usa las mismas versiones que tu contenedor, y con la caché de npm la instalación es más rápida. Escríbelo tú, en `.github/workflows/ci.yml`, con estas orientaciones:

- Se ejecuta con cada `push` y cada *pull request* a la rama `main`.
- Tiene un único trabajo (*job*) que se ejecuta en `ubuntu-latest`.
- Sus pasos, en este orden, cada uno con un nombre (`name`) en español que diga qué hace:
  1. Descargar el código, con la acción `actions/checkout@v7`.
  2. Instalar Node.js 24 con la caché de npm, con la acción `actions/setup-node@v7`, `node-version: 24` y `cache: npm`.
  3. Instalar las dependencias con `npm ci`.
  4. Revisar el código con ESLint: `npm run lint`.
  5. Comprobar el formato con Prettier: `npm run format:check`.
  6. Ejecutar los tests: `npm test`.
- Sube también `package-lock.json`: lo creó `npm install` al abrir el contenedor. Sin él, `npm ci` falla. Si añades o actualizas una dependencia, vuelve a subirlo.
- Prettier también revisa el formato de `ci.yml`: ejecuta `npm run format` antes de subirlo.

Compruébalo:

1. Sube los cambios y abre la pestaña **Actions** del repositorio: la ejecución debe salir en verde, con los seis pasos.
2. Rompe algo a propósito (por ejemplo, cambia el valor esperado de un test de `crearFiltroPrecio`), sube el cambio y comprueba que la ejecución sale en rojo en el paso que corresponde. Después, deshaz el cambio y comprueba que vuelve a verde.

Deja constancia en la sección «Integración continua (opcional)» del `README.md`: el enlace a la ejecución en verde y dos capturas en `img/`, una de la ejecución en verde con sus pasos y otra de la ejecución en rojo con el paso que falla.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**. Si no, sigue en marcha ocupando memoria, y se acumula uno por cada ejercicio (UD1, tema 5, apartado 5.4.7). Tu trabajo no se borra: está en la carpeta del ejercicio.

1. Cierra la ventana de VS Code del ejercicio.
2. En una terminal de tu equipo (en Windows, PowerShell), borra todos los contenedores de Dev Containers. La orden solo toca los que ha creado VS Code, no otros contenedores que tengas:

   ```bash
   docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
   ```

   Si no queda ninguno, Docker avisa de que le falta un argumento: puedes ignorarlo. También puedes borrarlos desde Docker Desktop, en la pestaña **Containers**.

La imagen que ha construido el `Dockerfile` tampoco se borra (se llama `vsc-` seguido del nombre de la carpeta), así que la próxima vez no hace falta construirla de nuevo. Si necesitas espacio, bórrala desde la pestaña **Images** de Docker Desktop o con `docker image rm <nombre>`.
