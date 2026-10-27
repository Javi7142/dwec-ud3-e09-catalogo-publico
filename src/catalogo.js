/**
 * Funciones para consultar y transformar el catálogo de una tienda.
 * Todas son puras: no modifican los productos que reciben ni muestran nada.
 */

/**
 * Producto del catálogo.
 * @typedef {object} Producto
 * @property {string} codigo Código único, por ejemplo `'L01'`.
 * @property {string} nombre
 * @property {string} categoria
 * @property {number} precio Precio en euros.
 * @property {number} stock Unidades disponibles.
 * @property {string[]} etiquetas
 */

/**
 * Condición que un producto cumple o no.
 * @callback Criterio
 * @param {Producto} producto
 * @returns {boolean}
 */

/**
 * Resumen de una categoría.
 * @typedef {object} ResumenCategoria
 * @property {string} categoria
 * @property {number} productos Número de productos distintos.
 * @property {number} unidades Suma del stock.
 * @property {number} valor Suma de precio × stock, redondeada a céntimos.
 */

/**
 * Productos que cumplen **todos** los criterios. Sin criterios, devuelve una copia de la lista.
 *
 * @param {Producto[]} productos
 * @param {...Criterio} criterios Condiciones que deben cumplir.
 * @returns {Producto[]} Lista nueva con los productos que cumplen todo.
 * @example
 * filtrarPor(productos, crearFiltroPrecio(10, 30), (p) => p.stock > 0);
 */
export function filtrarPor(productos, ...criterios) {
  // TODO
  return [];
}

/**
 * Crea un criterio que acepta los productos con precio entre un mínimo y un máximo, ambos incluidos.
 *
 * @param {number} minimo
 * @param {number} [maximo=Infinity]
 * @returns {Criterio}
 * @example
 * crearFiltroPrecio(25)({ precio: 30 }); // true
 */
export function crearFiltroPrecio(minimo, maximo = Infinity) {
  // TODO
  return () => false;
}

/**
 * Crea un criterio que acepta los productos que tienen una etiqueta.
 *
 * @param {string} etiqueta
 * @returns {Criterio}
 */
export function crearFiltroEtiqueta(etiqueta) {
  // TODO
  return () => false;
}

/**
 * Ordena los productos por un campo, sin modificar la lista original.
 * Los textos se ordenan con las reglas del español; los números, de menor a mayor.
 *
 * @param {Producto[]} productos
 * @param {'codigo'|'nombre'|'categoria'|'precio'|'stock'} campo
 * @param {boolean} [descendente=false] Si es `true`, de mayor a menor.
 * @returns {Producto[]} Lista nueva ordenada.
 */
export function ordenarPor(productos, campo, descendente = false) {
  // TODO
  return [];
}

/**
 * Resumen de cada categoría, en orden alfabético.
 *
 * @param {Producto[]} productos
 * @returns {ResumenCategoria[]}
 */
export function resumenPorCategoria(productos) {
  // TODO
  return [];
}

/**
 * Todas las etiquetas del catálogo, sin repetir y en orden alfabético.
 *
 * @param {Producto[]} productos
 * @returns {string[]}
 */
export function etiquetasUnicas(productos) {
  // TODO
  return [];
}

/**
 * Aplica un descuento a los productos que cumplen un criterio. Devuelve una lista nueva:
 * los productos rebajados son objetos nuevos y los originales no cambian.
 *
 * @param {Producto[]} productos
 * @param {number} porcentaje Descuento, mayor que 0 y como mucho 100.
 * @param {Criterio} [criterio] Productos a los que se aplica; por defecto, a todos.
 * @returns {Producto[]} Lista nueva, en el mismo orden, con los precios redondeados a céntimos.
 * @throws {RangeError} Si el porcentaje no está en (0, 100].
 */
export function aplicarDescuento(productos, porcentaje, criterio = () => true) {
  // TODO
  return [];
}

/**
 * Tabla de precios: una fila de cabecera y una fila por producto con su código, nombre y precio
 * con dos decimales.
 *
 * @param {Producto[]} productos
 * @returns {string[][]} Matriz de textos.
 * @example
 * tablaPrecios([{ codigo: 'P02', nombre: 'Bolis', precio: 4.95 }]);
 * // [['Código', 'Nombre', 'Precio'], ['P02', 'Bolis', '4.95']]
 */
export function tablaPrecios(productos) {
  // TODO
  return [];
}
