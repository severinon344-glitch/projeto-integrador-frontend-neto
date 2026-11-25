// Atualiza o item ativo do menu de navegação
const linksMenu = document.querySelectorAll(".menu-navegacao > li > a");

linksMenu.forEach(link => {
    link.addEventListener("click", () => {
        linksMenu.forEach(item => {
            item.classList.remove("ativo");
        });

        link.classList.add("ativo");
    });
});