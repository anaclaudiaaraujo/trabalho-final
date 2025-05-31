import assert from 'node:assert';

import {
  geradorDeTagsDeIdentificacao,
  verificarSePodeSerAdotado,
  calcularConsumoDeRacao,
  decidirTipoDeAtividadePorPorte,
} from '../trabalho.js';

/**
 * Como uma das regras para a entrega da atividade era não alterar o arquivo de testes disponibilizado, por curiosidade e para praticar, criei esses cenários só para validar as tratativas implementadas 😅
 */

describe('Testes de exceptions - geradorDeTagsDeIdentificacao', () => {
  it('QUANDO informar uma string vazia para geradorDeTagsDeIdentificacao, DEVE retornar mensagem de valor inválido', () => {
    const resultado = geradorDeTagsDeIdentificacao("");
    assert.ok(resultado.includes('"" é inválido. Erro ao gerar a Tag: Oops! Algo de errado não está certo: o nome do pet deve ser um texto e não deve ser vazio.'), `Esperado erro de valor inválido, mas recebeu: ${resultado}`);
  });

  it('QUANDO informar null para geradorDeTagsDeIdentificacao, DEVE retornar mensagem de valor inválido', () => {
    const resultado = geradorDeTagsDeIdentificacao(null);
    assert.ok(resultado.includes('"null" é inválido. Erro ao gerar a Tag: Oops! Algo de errado não está certo: o nome do pet deve ser um texto e não deve ser vazio.'), `Esperado erro de valor inválido, mas recebeu: ${resultado}`);
  });

  it('QUANDO informar um número para geradorDeTagsDeIdentificacao, DEVE retornar mensagem de valor inválido', () => {
    const resultado = geradorDeTagsDeIdentificacao(4);
    assert.ok(resultado.includes('"4" é inválido. Erro ao gerar a Tag: Oops! Algo de errado não está certo: o nome do pet deve ser um texto e não deve ser vazio.'), `Esperado erro de valor inválido, mas recebeu: ${resultado}`);
  });

  it('QUANDO informar um valor booleano para geradorDeTagsDeIdentificacao, DEVE retornar mensagem de valor inválido', () => {
    const resultado = geradorDeTagsDeIdentificacao(true);
    assert.ok(resultado.includes('"true" é inválido. Erro ao gerar a Tag: Oops! Algo de errado não está certo: o nome do pet deve ser um texto e não deve ser vazio.'), `Esperado erro de valor inválido, mas recebeu: ${resultado}`);
  });

});

describe('Testes de exceptions - calcularConsumoDeRacao', () => {
  it('QUANDO informar peso 0 para calcularConsumoDeRacao, DEVE retornar mensagem de erro específica', () => {
    const resultado = calcularConsumoDeRacao('Tatu Halford', '2', 0);
    assert.strictEqual(resultado, 'Error: Você deve informar um número positivo e maior que zero. "0" não é válido.');
  });

  it('QUANDO informar peso null para calcularConsumoDeRacao, DEVE retornar mensagem de erro específica', () => {
    const resultado = calcularConsumoDeRacao('Tatu', '2', null);
    assert.strictEqual(resultado, 'Error: Você deve informar um número positivo e maior que zero. "null" não é válido.');
  });
});

describe('Testes de exceptions - decidirTipoDeAtividadePorPorte', () => {
  it('QUANDO informar um porte não mapeado para decidirTipoDeAtividadePorPorte, DEVE retornar mensagem padrão', () => {
    const resultado = decidirTipoDeAtividadePorPorte('BITEEELO');
    assert.strictEqual(resultado, 'você deve informar se o pet tem porte pequeno, médio ou grande.');
  });

  it('QUANDO informar null para decidirTipoDeAtividadePorPorte, DEVE retornar mensagem de erro', () => {
    const resultado = decidirTipoDeAtividadePorPorte(null);
    assert.strictEqual(resultado, 'Error: Porte inválido: null');
  });
});

describe('Testes de exceptions - verificarSePodeSerAdotado', () => {
  it('QUANDO informar idade negativa para verificarSePodeSerAdotado, DEVE retornar mensagem de erro', () => {
    const resultado = verificarSePodeSerAdotado(-1, 'pequeno');
    assert.strictEqual(resultado, 'Não foi possível identificar se o pet pode ser adotado. "-1" não é uma idade válida.');
  });

  it('QUANDO informar porte vazio para verificarSePodeSerAdotado, DEVE retornar mensagem de erro', () => {
    const resultado = verificarSePodeSerAdotado(1, '');
    assert.strictEqual(resultado, 'Não foi possível identificar se o pet pode ser adotado. "" não é um porte válido.');
  });
});