// public/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Script para atualizar o ano atual no rodapé
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    } else {
        console.warn("Elemento com ID 'current-year' não encontrado.");
    }

    // Script para o menu hambúrguer
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    } else {
        console.warn("Elementos .menu-toggle ou .main-nav não encontrados. Menu mobile pode não funcionar.");
    }
});