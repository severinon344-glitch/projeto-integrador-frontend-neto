/*
    Projeto Integrador: Gigantes do Brasil
    Aula 9 - JavaScript e Lógica de Programação

    Tema: Analisador de títulos mundiais dos clubes brasileiros.

    Entrada: Quantidade mínima de títulos informada pelo usuário.

    Processamento: Validar a entrada, classificar os clubes,
    somar os títulos e identificar o maior campeão.

    Saída: Relatório dos clubes e resumo dos resultados no console.

    Pseudocódigo:
    1. Criar uma lista de clubes com seus títulos e estados.
    2. Solicitar a quantidade mínima de títulos.
    3. Converter e validar o valor informado.
    4. Percorrer e classificar os clubes.
    5. Identificar o estado de cada clube.
    6. Somar os títulos e identificar o maior campeão.
    7. Exibir o relatório no console.
    8. Repetir a consulta até o usuário solicitar a saída.
*/
// Dados dos clubes brasileiros
const clubesAnalisados = [
    { nome: "Flamengo", titulos: 1, estado: "RJ" },
    { nome: "Palmeiras", titulos: 0, estado: "SP" },
    { nome: "São Paulo", titulos: 3, estado: "SP" },
    { nome: "Santos", titulos: 2, estado: "SP" },
    { nome: "Corinthians", titulos: 2, estado: "SP" }
];
// Função do analisador de títulos
function analisarTitulos() {

    // Controle de repetição
    let continuar = true;

    while (continuar) {

        // Entrada de dados
        const entrada = prompt(
            "Informe a quantidade mínima de títulos mundiais ou digite 'sair':"
        );

        if (entrada === null || entrada.trim().toLowerCase() === "sair") {
            continuar = false;
            console.log("Analisador encerrado.");
            break;
        }

        const limite = Number(entrada);

        // Validação da entrada
        if (entrada.trim() === "") {
            console.log("Nenhum valor informado.");
        } else if (!Number.isInteger(limite)) {
            console.log("Informe um número inteiro válido.");
        } else if (limite < 0 || limite > 3) {
            console.log("Informe um número entre 0 e 3.");
        } else {
            console.log(`Quantidade mínima informada: ${limite}`);

            // Percorrer e classificar os clubes
            // Variáveis de controle
            let totalTitulos = 0;
            let clubesClassificados = 0;
            let maiorCampeao = clubesAnalisados[0];
            const relatorio = [];
            for (const clube of clubesAnalisados) {
                let classificacao;

                if (clube.titulos > limite) {
                    classificacao = "Acima do limite";
                } else if (clube.titulos === limite) {
                    classificacao = "Igual ao limite";
                } else {
                    classificacao = "Abaixo do limite";
                }

                // Identificar o estado do clube
                let origem;

                switch (clube.estado) {
                    case "RJ":
                        origem = "Rio de Janeiro";
                        break;

                    case "SP":
                        origem = "São Paulo";
                        break;

                    default:
                        origem = "Estado não identificado";
                        break;
                }

                console.log(`${clube.nome} - ${origem}: ${classificacao}`);
                relatorio.push({
                    clube: clube.nome,
                    titulos: clube.titulos,
                    estado: origem,
                    classificacao: classificacao
                });

                // Acumulador de títulos
                totalTitulos += clube.titulos;

                // Contador de clubes classificados
                if (clube.titulos >= limite) {
                    clubesClassificados++;
                }

                // Identificar o maior campeão
                if (clube.titulos > maiorCampeao.titulos) {
                    maiorCampeao = clube;
                }
            }
            console.table(relatorio);
            // Resumo dos resultados
            const mediaTitulos = totalTitulos / clubesAnalisados.length;

            console.log(`Total de títulos: ${totalTitulos}`);
            console.log(`Clubes classificados: ${clubesClassificados}`);
            console.log(`Média de títulos: ${mediaTitulos.toFixed(2)}`);
            console.log(`Maior campeão: ${maiorCampeao.nome}`);
        }

    }
}
// Acionar o analisador pelo botão
document.getElementById("btnAnalisador")
    .addEventListener("click", analisarTitulos);
/*
    Teste de mesa - Limite informado: 2

    Iteração | Clube     | Títulos | Total | Classificados | Maior campeão
    1        | Flamengo  | 1       | 1     | 0             | Flamengo
    2        | Palmeiras | 0       | 1     | 0             | Flamengo
    3        | São Paulo | 3       | 4     | 1             | São Paulo

    Resultado final:
    Total de títulos: 8
    Clubes classificados: 3
    Média de títulos: 1.60
    Maior campeão: São Paulo

    Resultado final conferido com a execução no navegador.
*/

