document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav ul'); // Seleciona o UL dentro da nav

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active'); // Adiciona/remove a classe 'active'
        });

        // Fechar o menu ao clicar em um link (apenas para mobile)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) { // Verifica se está em tela mobile
                    mainNav.classList.remove('active');
                }
            });
        });
    }

    // Opcional: Fechar o menu se a tela for redimensionada para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
        }
    });

    // Atualizar o ano no rodapé (já estava no HTML, mas podemos garantir aqui também)
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
// public/js/main.js

// Garante que o DOM está carregado antes de manipular elementos
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Para animar o ícone X
        });

        // Opcional: Fecha o menu se um link for clicado (útil em SPAs ou para rolagem suave)
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