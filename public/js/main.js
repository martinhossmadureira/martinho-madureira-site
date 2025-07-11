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

    // --- Script do Slideshow da Hero Section ---
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const backgrounds = [
            'images/hero-backgrounds/bg1.jpg', // Certifique-se de que os caminhos estão corretos
            'images/hero-backgrounds/bg2.jpg',
            'images/hero-backgrounds/bg3.jpg'
            // Adicione mais imagens aqui conforme necessário
        ];
        let currentBackgroundIndex = 0;

        // Função para mudar a imagem de fundo
        function changeBackground() {
            // Remove a imagem anterior (se existir)
            const oldBackground = heroSection.querySelector('.hero-backgrounds');
            if (oldBackground) {
                oldBackground.classList.remove('active');
            }

            // Cria uma nova div para a imagem de fundo
            const newBackground = document.createElement('div');
            newBackground.classList.add('hero-backgrounds');
            newBackground.style.backgroundImage = `url(${backgrounds[currentBackgroundIndex]})`;

            // Anexa a nova imagem e a torna visível após um pequeno atraso para a transição
            heroSection.prepend(newBackground); // Adiciona antes do conteúdo para ficar no fundo
            setTimeout(() => {
                newBackground.classList.add('active');
            }, 50); // Pequeno atraso para permitir que a transição CSS funcione

            // Remove a imagem antiga após a transição para evitar sobreposição excessiva de DOM
            if (oldBackground) {
                oldBackground.addEventListener('transitionend', () => {
                    if (oldBackground.parentNode === heroSection) { // Verifica se ainda é filho antes de remover
                        heroSection.removeChild(oldBackground);
                    }
                }, { once: true }); // Executa o listener apenas uma vez
            }

            currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
        }

        // Inicia o slideshow
        changeBackground(); // Carrega a primeira imagem imediatamente
        setInterval(changeBackground, 8000); // Muda a imagem a cada 8 segundos (8000ms). Ajuste como quiser.
    }
});