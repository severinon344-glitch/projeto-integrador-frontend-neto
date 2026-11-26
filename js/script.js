/*
    Projeto Integrador: Gigantes do Brasil
    Aulas 11 e 12 - Funções e DOM Básico

    Tema: Análise visual dos títulos mundiais.
    Objetivo: Processar, classificar e apresentar
    os resultados diretamente na página.
*/

// Dados para análise visual
const clubesDom = [
    {
        nome: "Flamengo",
        estado: "RJ",
        mundial: 1,
        libertadores: 4,
        brasileirao: 9,
        copaDoBrasil: 5
    },
    {
        nome: "Palmeiras",
        estado: "SP",
        mundial: 0,
        libertadores: 3,
        brasileirao: 12,
        copaDoBrasil: 4
    },
    {
        nome: "São Paulo",
        estado: "SP",
        mundial: 3,
        libertadores: 3,
        brasileirao: 6,
        copaDoBrasil: 1
    },
    {
        nome: "Santos",
        estado: "SP",
        mundial: 2,
        libertadores: 3,
        brasileirao: 8,
        copaDoBrasil: 1
    },
    {
        nome: "Corinthians",
        estado: "SP",
        mundial: 2,
        libertadores: 1,
        brasileirao: 7,
        copaDoBrasil: 4
    }
];
// Função para calcular o total de títulos de cada clube
function calcularTotalTitulos(clube, peso = 1) {
    return (
        clube.mundial +
        clube.libertadores +
        clube.brasileirao +
        clube.copaDoBrasil
    ) * peso;
}

// Classificação interna por quantidade de títulos
function classificarClube(totalTitulos) {
    if (totalTitulos >= 20) {
        return "faixa-a";
    } else if (totalTitulos >= 15) {
        return "faixa-b";
    } else if (totalTitulos >= 10) {
        return "faixa-c";
    } else {
        return "faixa-d";
    }
}
// Cria uma nova lista com os resultados da análise
const clubesProcessados = clubesDom.map(clube => {
    const totalTitulos = calcularTotalTitulos(clube);

    return {
        ...clube,
        totalTitulos: totalTitulos,
        classificacao: classificarClube(totalTitulos)
    };
});

console.table(clubesProcessados);

// Filtra os clubes com 15 ou mais títulos
const clubesDestaque = clubesProcessados.filter(
    clube => clube.totalTitulos >= 15
);

// Calcula a soma dos títulos de todos os clubes
const somaTitulos = clubesProcessados.reduce(
    (total, clube) => total + clube.totalTitulos, 0
);

// Calcula a média de títulos por clube
const mediaTitulos = somaTitulos / clubesProcessados.length;

// Exibe os resultados no console
console.table(clubesDestaque);
console.log("Total de títulos:", somaTitulos);
console.log("Média de títulos:", mediaTitulos.toFixed(2));
// Seleciona a área de resumo no HTML
const resumoTitulos = document.querySelector("#resumoTitulos");

// Verifica se o elemento existe
if (resumoTitulos !== null) {
    const indicadores = [
        {
            nome: "Clubes analisados",
            valor: clubesProcessados.length
        },
        {
            nome: "Títulos conquistados",
            valor: somaTitulos
        },
        {
            nome: "Média por clube",
            valor: mediaTitulos.toFixed(2).replace(".", ",")
        }
    ];

    indicadores.forEach(indicador => {
        const item = document.createElement("div");
        item.classList.add("card-resumo");

        const valor = document.createElement("strong");
        valor.textContent = indicador.valor;

        const nome = document.createElement("span");
        nome.textContent = indicador.nome;

        item.append(valor, nome);
        resumoTitulos.append(item);
    });
}


    

// Função para criar o card de cada clube
function criarCardClube(clube) {
    const card = document.createElement("article");
    card.classList.add("card-ranking");

    const nome = document.createElement("h3");
    nome.textContent = clube.nome;

    const total = document.createElement("p");
    total.textContent = `Total: ${clube.totalTitulos} títulos`;

    const conquistas = document.createElement("div");
conquistas.classList.add("grade-conquistas");

const competicoes = [
    { nome: "Mundial", quantidade: clube.mundial },
    { nome: "Libertadores", quantidade: clube.libertadores },
    { nome: "Brasileirão", quantidade: clube.brasileirao },
    { nome: "Copa do Brasil", quantidade: clube.copaDoBrasil }
];

competicoes.forEach(competicao => {
    const item = document.createElement("div");
    item.classList.add("item-conquista");

    const quantidade = document.createElement("strong");
    quantidade.textContent = competicao.quantidade;

    const nomeCompeticao = document.createElement("span");
    nomeCompeticao.textContent = competicao.nome;

    item.append(quantidade, nomeCompeticao);
    conquistas.append(item);
});



    card.classList.add(clube.classificacao);

    card.append(nome, total, conquistas);

    return card;
}

// Seleciona a área de resultados
const resultadoRanking = document.querySelector("#resultado");

// Verifica se a área existe
if (resultadoRanking !== null) {

    // Ordena os clubes do maior para o menor total
    const clubesOrdenados = [...clubesProcessados].sort(
        (a, b) => b.totalTitulos - a.totalTitulos
    );

    // Adiciona os cards à página
    clubesOrdenados.forEach(clube => {
        const card = criarCardClube(clube);
        resultadoRanking.append(card);
    });
}