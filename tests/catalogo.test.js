import { describe, it, expect } from 'vitest';
import { crearFiltroPrecio } from '../src/catalogo.js';

describe('crearFiltroPrecio', () => {
  it('acepta un precio dentro del rango', () => {
    expect(crearFiltroPrecio(10, 30)({ precio: 20 })).toBe(true);
  });

  // TODO: añade el resto de tests de esta función y un describe por cada función del catálogo
});
