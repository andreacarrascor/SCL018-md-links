import { absOrRel, fileOrDir, readFile, getLinks } from '../index.js'


//test para función que resuelve la ruta a absoluta
describe('absOrRel', () => {
  it('deberia ser una funcion', () => {
    expect(typeof (absOrRel)).toBe('function');
  })
  it('deberia retornar la ruta absoluta', () => {
    expect(absOrRel('D:\\Laboratoria\\Proyecto-4-mdLinks\\SCL018-md-links\\README.md')).toBeTruthy();
  })
  it('deberia resolver la ruta a absoluta', () => {
    expect(absOrRel('README.md')).toBe('D:\\Laboratoria\\Proyecto-4-mdLinks\\SCL018-md-links\\README.md');
  })
});

//test función que retorna directorio o archivo
describe('fileOrDir', () => {
  it('deberia ser una funcion', () => {
    expect(typeof (fileOrDir)).toBe('function');
  })
  it('deberia retornar directory', () => {
    expect(fileOrDir('D:\\Laboratoria\\Proyecto-4-mdLinks\\SCL018-md-links')).toBeTruthy();
  })
  it('deberia retornar file', () => {
    expect(fileOrDir('README.md')).toBe('file');
  })
});

//test función que determina validez del formato de la extensión
describe('readFile', () => {
  it('deberia ser una funcion', () => {
    expect(typeof (readFile)).toBe('function');
  })
  it('deberia leer el archivo .md', () => {
    expect(readFile('prueba.md')).toBeTruthy();
  })
  it('deberia retornar formato inválido si la extensión del archivo no es .md', () => {
    expect(readFile('readme.txt')).toBe('\nInvalid format');
  })
});

describe('getLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof (getLinks)).toBe('function');
  })

  it('deberia retornar un arreglo de objetos', () => {
    const path = 'D:\\Laboratoria\\Proyecto-4-mdLinks\\SCL018-md-links\\prueba.md';
    const result = [
      {
        text: 'URL test1',
        href: 'https://github.com/andreacarrascor/SCL018-md-links',
        file: 'prueba.md'
      },
      {
        text: 'URL test2',
        href: 'https://github.com/andre/SCL018-md-links',
        file: 'prueba.md'
      }];
    expect(getLinks(path)).toEqual(result);
  })

  // global.fetch = jest.fn(() =>
    
  // )
  // it('debería retornar un objeto con las propiedades del link', () =>{

  // })
});

