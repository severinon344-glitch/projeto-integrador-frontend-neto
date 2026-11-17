
const canvas = document.getElementById("graficoTitulos");
const ctx = canvas.getContext("2d");

// Clubes e quantidade de títulos mundiais

const clubes = [
    { nome: "São Paulo", titulos: 3, cor: "#E53935" },
    { nome: "Santos", titulos: 2, cor: "#999999" },
    { nome: "Corinthians", titulos: 2, cor: "#222222" },
    { nome: "Flamengo", titulos: 1, cor: "#C8102E" },
    { nome: "Grêmio", titulos: 1, cor: "#0088CC" },
    { nome: "Internacional", titulos: 1, cor: "#D50032" }
];


// Desenha uma barra para cada clube
clubes.forEach((clube, indice) => {
    const x = 30 + indice * 95;
    const altura = clube.titulos * 70;
    const y = 260 - altura;

    ctx.fillStyle = clube.cor;
    ctx.fillRect(x, y, 55, altura);

    // Exibe a quantidade de títulos acima da barra
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(clube.titulos, x + 27, y - 10);

    // Exibe o nome do clube abaixo da barra
    ctx.font = "11px Arial";
    ctx.fillText(clube.nome, x + 27, 285);

});
