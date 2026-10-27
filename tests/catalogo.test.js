import { describe, it, expect, beforeEach } from 'vitest';
import { filtrarPor, crearFiltroPrecio, crearFiltroEtiqueta } from '../src/catalogo.js';

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
