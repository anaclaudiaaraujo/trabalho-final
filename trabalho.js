/**
 * @param nomePet
 * @returns {string} Nome do pet em caixa alta
 * 
 * Ao invés de simplesmente retornar o nome do pet que foi passado como parâmetro em caixa alta, minha ideia aqui foi utilizar o bloco try/catch para tratar casos em que um valor diferente do esperado fosse informado, por exemplo.
 * Utilizei o typeof para verificar se o valor recibido como parâmetro é uma string;
 * Utilizei o trim() para eliminar possíveis espaços desnecessários no início e fim do valor recebido e, após isso, verifico se não se trata de uma string vazia;
 * Caso o valor informado não seja uma string ou seja vazio, um erro tratado será lançado.
 * Sendo um valor do tipo string E não vazio, a função retorna o nome em caixa alta.
 */
export function geradorDeTagsDeIdentificacao(nomePet) {
    try {
        //Validação do tipo e conteúdo do parâmetro
        if (typeof nomePet != 'string' || nomePet.trim() === '') {
            //Lança exceção específica relacionada ao tipo do parâmetro recebido.
            throw new TypeError('Oops! Algo de errado não está certo: o nome do pet deve ser um texto e não deve ser vazio.')
        }
        return nomePet.toUpperCase();
    } catch (erro) {
        //retorna mensagem de erro tratada
        return `"${nomePet}" é inválido. Erro ao gerar a Tag: ${erro.message}`;
    }
}

/**
 * Para o teste dessa função, após pesquisar um pouco mais sobre assincronismo, vi que uma forma de atingir o objetivo seria:
 * criar uma promessa explicitamente, para controlar quando ela seria resolvida ou rejeitada e para simular operações que levariam tempo para serem executadas; Para essa simulação de "atraso", podemos utilizar o setTimeout, definindo o tempo de espera em milissegundos;
 * tratar a "resolução" quando a promessa for "cumprida" com sucesso, retornando os dados resultantes das operações executadas;
 * tratar a "rejeição" para lidar com falhas em decorrência do não cumprimento da promessa, devolvendo (nesse caso) uma mensagem de erro tratada.
 */
export async function buscarDadoAsync() {
    //Retorna nova Promise para simular operação assíncrona
    return new Promise((resolve, reject) => {
        //Simulação de tempo de uma execução real (requisição para API, por exemplo)
        setTimeout(() => {
            const doguineo = {
                nome: "pIpocA",
                porte: "Médio",
                idade: 2,
                raca: "SRD"
            }

            //Verifica o dado
            if (doguineo && doguineo.nome) {
                let nomeFormatado = `${doguineo.nome.charAt(0).toUpperCase()}${doguineo.nome.substring(1).toLowerCase()}`;
                resolve(nomeFormatado);
            } else {
                reject(new Error("Doguinho não encontrado."));
            }
        }, 100); //Simula um atraso de 100ms
    });
}

/**
 * Utilização do operador ternário para verificar o peso do animal para realização do cálculo;
 * Como não utilizei os parâmetros nomePet e idade, adicionei o underscore somente por questões de convenção;
 * 
 */
export function calcularConsumoDeRacao(_nomePet, _idade, peso) {
    try {
        //validação inicial para garantir entrada válida do peso do pet
        if (typeof peso !== 'number' || peso <= 0.00) {
            throw new Error('Você deve informar um número positivo e maior que zero.');
        } else {
            //usando o operador ternário na validação condicional
            const baseDeCalculo = peso > 10 ? 300 : 100;
            let consumoDiario = peso * baseDeCalculo;

            return consumoDiario;
        }
    } catch (erro) {
        //Retornando mensagem tratada em caso de erros
        return `${erro} "${peso}" não é válido.`;
    }
}

/**
 * Utilizei o replace para remover os acentos, para evitar que o porte informado não fosse identificado como um porte válido apenas por conter acento, como é o caso do porte médio;
 * Ao invés de utilizar o if/else ou switch/case, optei por utilizar criar um objeto e tentar encontrar o porte e sua respectiva atividade dentro desse objeto.
 * Se o porte não for encontrado, a função retorna uma mensagem tratada.
 */
export function decidirTipoDeAtividadePorPorte(portePet) {
    try {
        //Verificando se o porte é uma string válida
        if (typeof portePet !== 'string' || portePet == null || portePet.trim() === '') {
            throw new Error("Porte inválido");
        } else {
            //Normalização da string recebida para tornar a entrada de dados mais flexível e padronizada
            const porte = portePet.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

            //Objeto para associação de portes e atividades permitidas
            const atividadePorPortePet = {
                'pequeno': 'brincar dentro de casa',
                'medio': 'passear no parque',
                'grande': 'correr ao ar livre. Weeee!'
            };

            //retornando a atividade correspondente ao porte ou mensagem tratada
            return atividadePorPortePet[porte] || 'você deve informar se o pet tem porte pequeno, médio ou grande.';
        }
    } catch (erro) {
        return `${erro}: ${portePet}`;
    }
}

/**
 * Para essa função, me baseei nos requisitos que vimos durante os exercícios das aulas e com algumas adaptações.
 * Pets de porte pequeno sempre poderão ser adotados, independente da idade;
 * Pets de porte médio precisam ter 1 ano ou mais para serem adotados;
 * Pets de grande porte precisam ter 2 anos ou mais para serem adotados.
 * 
 * Também utilizei o try/catch, porém fiz um "geralzão" e não fiz tratativa de erro para cada possibilidade de erro que imaginei, além de compreender que o ideal não seria sobrecarregar o método com esse tanto de complexidade, mas foi o que eu consegui desembolar pooor enquanto.
 */
export function verificarSePodeSerAdotado(idade, porte) {
    try {
        //Validando o tipo e valor de idade
        if (typeof idade !== 'number' || idade < 0) {
            throw new Error(`"${idade}" não é uma idade válida.`);
        } else {
            //Validando o tipo e conteúdo do valor do parâmetro porte
            if (typeof porte !== 'string' || porte.trim() === '') {
                throw new Error(`"${porte}" não é um porte válido.`);
            } else {
                //Normalização do valor para garantir a consistência e padronização dos dados
                let porteFormatado = porte.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();

                //Estrutura condicional para aplicar as regras de adoção
                if (porteFormatado === 'P' || porteFormatado === 'PEQUENO') {
                    return true;
                } else if (porteFormatado === 'M' || porteFormatado === 'MEDIO') {
                    return idade >= 1;
                } else if (porteFormatado === 'G' || porteFormatado === 'GRANDE') {
                    return idade >= 2;
                } else {
                    //Alerta para porte não identificado
                    console.warn("Porte inválido: ", porte);
                    return false;
                }
            }
        }
    } catch (erro) {
        //Tratamento genérico de erro
        return `Não foi possível identificar se o pet pode ser adotado. ${erro.message}`;
    }
}