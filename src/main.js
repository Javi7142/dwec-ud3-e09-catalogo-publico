// E09 · Informe del catálogo. No modifiques este fichero.
import { productos } from './datos.js';
import {
  filtrarPor,
  crearFiltroPrecio,
  crearFiltroEtiqueta,
  ordenarPor,
  resumenPorCategoria,
  etiquetasUnicas,
  aplicarDescuento,
  tablaPrecios,
} from './catalogo.js';

const nombres = (lista) => lista.map((p) => p.nombre).join(', ');
const hayStock = (p) => p.stock > 0;

console.log(
  `🔎 Con stock entre 10 y 30 €: ${nombres(filtrarPor(productos, crearFiltroPrecio(10, 30), hayStock))}`,
);
console.log(
  `🔎 Ofertas de más de 25 €: ${nombres(filtrarPor(productos, crearFiltroEtiqueta('oferta'), crearFiltroPrecio(25)))}`,
);
console.log(`💎 Los 3 más caros: ${nombres(ordenarPor(productos, 'precio', true).slice(0, 3))}`);
console.log(
  `🔤 Los 5 primeros por nombre: ${nombres(ordenarPor(productos, 'nombre').slice(0, 5))}`,
);

console.log('📦 Resumen por categoría:');
resumenPorCategoria(productos).forEach(({ categoria, productos: n, unidades, valor }) => {
  console.log(
    `   ${categoria.padEnd(12)} ${String(n).padStart(2)} productos · ${String(unidades).padStart(3)} uds · ${valor.toFixed(2).padStart(8)} €`,
  );
});

console.log(`🏷️ Etiquetas: ${etiquetasUnicas(productos).join(', ')}`);

const rebajados = aplicarDescuento(productos, 20, crearFiltroEtiqueta('oferta'));
const cambiados = rebajados.filter((p, i) => p.precio !== productos[i].precio);
console.log(
  `💸 Rebaja del 20 % en ofertas: ${cambiados.map((p) => `${p.codigo} ${p.precio.toFixed(2)}`).join(' · ')}`,
);
console.log(
  `🗂️ Original intacto: L02 sigue a ${productos[1].precio.toFixed(2)} € · primer producto ${productos[0].codigo}`,
);

const [cabecera, ...filas] = tablaPrecios(ordenarPor(productos, 'precio').slice(0, 3));
console.log(`🧮 ${cabecera.join(' | ')}`);
filas.forEach((fila) => console.log(`   ${fila.join(' | ')}`));

try {
  aplicarDescuento(productos, 150);
} catch (error) {
  console.log(`❌ ${error.name}: ${error.message}`);
}
