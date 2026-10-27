import { describe, it, expect, beforeEach } from 'vitest';
import {
  filtrarPor,
  crearFiltroPrecio,
  crearFiltroEtiqueta,
  ordenarPor,
  resumenPorCategoria,
  etiquetasUnicas,
} from '../src/catalogo.js';

/**
 * Datos de prueba pequeños y propios. Se crean de nuevo para cada test con `beforeEach`.
 * @returns {import('../src/catalogo.js').Producto[]}
 */
function crearProductos() {
  return [
    {
      codigo: 'A1',
      nombre: 'Bolígrafo',
      categoria: 'papelería',
      precio: 5,
      stock: 10,
      etiquetas: ['oficina'],
    },
    {
      codigo: 'A2',
      nombre: 'Álbum',
      categoria: 'papelería',
      precio: 15,
      stock: 0,
      etiquetas: ['regalo', 'oferta'],
    },
    {
      codigo: 'B1',
      nombre: 'Agenda',
      categoria: 'oficina',
      precio: 30,
      stock: 4,
      etiquetas: ['oficina', 'oferta'],
    },
    { codigo: 'C1', nombre: 'Zumo', categoria: 'bebidas', precio: 2.5, stock: 20, etiquetas: [] },
  ];
}

let productos;

beforeEach(() => {
  productos = crearProductos();
});

describe('crearFiltroPrecio', () => {
  it('acepta un precio dentro del rango', () => {
    expect(crearFiltroPrecio(10, 30)({ precio: 20 })).toBe(true);
  });

  it('rechaza un precio por debajo del mínimo y otro por encima del máximo', () => {
    const criterio = crearFiltroPrecio(10, 30);
    expect(criterio({ precio: 9.99 })).toBe(false);
    expect(criterio({ precio: 30.01 })).toBe(false);
  });

  it.each([
    { precio: 10, esperado: true },
    { precio: 30, esperado: true },
    { precio: 9.99, esperado: false },
    { precio: 30.01, esperado: false },
  ])(
    'con rango 10-30, el precio $precio devuelve $esperado (límites incluidos)',
    ({ precio, esperado }) => {
      expect(crearFiltroPrecio(10, 30)({ precio })).toBe(esperado);
    },
  );

  it('sin máximo acepta cualquier precio igual o superior al mínimo', () => {
    expect(crearFiltroPrecio(25)({ precio: 1_000_000 })).toBe(true);
    expect(crearFiltroPrecio(25)({ precio: 24.99 })).toBe(false);
  });
});

describe('crearFiltroEtiqueta', () => {
  it('acepta un producto que tiene la etiqueta', () => {
    expect(crearFiltroEtiqueta('oferta')(productos[1])).toBe(true);
  });

  it('rechaza un producto que no tiene la etiqueta', () => {
    expect(crearFiltroEtiqueta('oferta')(productos[0])).toBe(false);
  });

  it('rechaza un producto sin etiquetas', () => {
    expect(crearFiltroEtiqueta('oferta')(productos[3])).toBe(false);
  });
});

describe('filtrarPor', () => {
  it('devuelve solo los productos que cumplen todos los criterios', () => {
    const resultado = filtrarPor(productos, crearFiltroEtiqueta('oferta'), crearFiltroPrecio(20));
    expect(resultado.map((p) => p.codigo)).toEqual(['B1']);
  });

  it('con un solo criterio filtra por ese criterio', () => {
    const resultado = filtrarPor(productos, (p) => p.stock > 0);
    expect(resultado.map((p) => p.codigo)).toEqual(['A1', 'B1', 'C1']);
  });

  it('sin criterios devuelve una copia de la lista, no la misma', () => {
    const resultado = filtrarPor(productos);
    expect(resultado).toEqual(productos);
    expect(resultado).not.toBe(productos);
  });

  it('devuelve una lista vacía si la lista de entrada está vacía', () => {
    expect(filtrarPor([], crearFiltroPrecio(0))).toEqual([]);
  });

  it('devuelve una lista vacía si ningún producto cumple los criterios', () => {
    expect(filtrarPor(productos, crearFiltroPrecio(1000))).toEqual([]);
  });

  it('no modifica la lista original', () => {
    const antes = structuredClone(productos);
    filtrarPor(productos, crearFiltroPrecio(10));
    expect(productos).toEqual(antes);
  });
});

describe('ordenarPor', () => {
  it('ordena los números de menor a mayor', () => {
    expect(ordenarPor(productos, 'precio').map((p) => p.codigo)).toEqual(['C1', 'A1', 'A2', 'B1']);
  });

  it('ordena de mayor a menor si se indica descendente', () => {
    expect(ordenarPor(productos, 'precio', true).map((p) => p.codigo)).toEqual([
      'B1',
      'A2',
      'A1',
      'C1',
    ]);
  });

  it('ordena los textos con las reglas del español: la Á va junto a la A, no al final', () => {
    expect(ordenarPor(productos, 'nombre').map((p) => p.nombre)).toEqual([
      'Agenda',
      'Álbum',
      'Bolígrafo',
      'Zumo',
    ]);
  });

  it('no cambia el orden de la lista original', () => {
    const codigosAntes = productos.map((p) => p.codigo);
    const ordenados = ordenarPor(productos, 'precio', true);
    expect(productos.map((p) => p.codigo)).toEqual(codigosAntes);
    expect(ordenados).not.toBe(productos);
  });

  it('devuelve una lista vacía si la lista de entrada está vacía', () => {
    expect(ordenarPor([], 'nombre')).toEqual([]);
  });

  it('mantiene el orden relativo de los productos con el mismo valor', () => {
    // A1 (papelería) y A2 (papelería) comparten categoría: conservan su orden de entrada
    const codigos = ordenarPor(productos, 'categoria').map((p) => p.codigo);
    expect(codigos.indexOf('A1')).toBeLessThan(codigos.indexOf('A2'));
  });
});

describe('resumenPorCategoria', () => {
  it('agrupa por categoría con su número de productos, unidades y valor', () => {
    expect(resumenPorCategoria(productos)).toEqual([
      { categoria: 'bebidas', productos: 1, unidades: 20, valor: 50 },
      { categoria: 'oficina', productos: 1, unidades: 4, valor: 120 },
      { categoria: 'papelería', productos: 2, unidades: 10, valor: 50 },
    ]);
  });

  it('devuelve las categorías en orden alfabético aunque lleguen desordenadas', () => {
    const categorias = resumenPorCategoria(productos).map((r) => r.categoria);
    expect(categorias).toEqual(['bebidas', 'oficina', 'papelería']);
  });

  it('devuelve una lista vacía si no hay productos', () => {
    expect(resumenPorCategoria([])).toEqual([]);
  });

  it('redondea el valor a céntimos', () => {
    // 0.1 * 3 = 0.30000000000000004 en coma flotante
    const lista = [
      { codigo: 'X', nombre: 'X', categoria: 'c', precio: 0.1, stock: 3, etiquetas: [] },
    ];
    expect(resumenPorCategoria(lista)[0].valor).toBe(0.3);
  });

  it('cuenta una categoría cuyo stock es 0 con 0 unidades y valor 0', () => {
    const lista = [
      { codigo: 'X', nombre: 'X', categoria: 'c', precio: 9, stock: 0, etiquetas: [] },
    ];
    expect(resumenPorCategoria(lista)).toEqual([
      { categoria: 'c', productos: 1, unidades: 0, valor: 0 },
    ]);
  });
});

describe('etiquetasUnicas', () => {
  it('devuelve las etiquetas sin repetir y en orden alfabético', () => {
    expect(etiquetasUnicas(productos)).toEqual(['oferta', 'oficina', 'regalo']);
  });

  it('devuelve una lista vacía si no hay productos', () => {
    expect(etiquetasUnicas([])).toEqual([]);
  });

  it('devuelve una lista vacía si ningún producto tiene etiquetas', () => {
    expect(etiquetasUnicas([productos[3]])).toEqual([]);
  });

  it('ordena con las reglas del español: «águila» va antes que «zorro»', () => {
    const lista = [
      { ...productos[0], etiquetas: ['zorro', 'águila'] },
      { ...productos[1], etiquetas: ['águila'] },
    ];
    expect(etiquetasUnicas(lista)).toEqual(['águila', 'zorro']);
  });
});
