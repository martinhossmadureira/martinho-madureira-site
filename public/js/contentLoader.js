// public/js/contentLoader.js

// Função genérica para buscar dados JSON
export async function fetchData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} at ${filePath}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}

// Função para formatar data (opcional, para exibir de forma mais legível)
export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Renderiza os destaques na página inicial
async function renderFeaturedHighlights() {
    const highlightsContainer = document.getElementById('featured-highlights');
    if (!highlightsContainer) return;

    highlightsContainer.innerHTML = '<p>Carregando destaques...</p>'; // Mensagem de carregamento

    let allHighlights = [];

    // Busca dados de todas as coleções que podem ter destaque
    const estudos = await fetchData('data/estudos.json');
    const artigos = await fetchData('data/artigos.json');
    const videos = await fetchData('data/videos.json');
    const eventos = await fetchData('data/eventos.json');

    // Filtra e prepara os itens para destaque
    estudos.filter(item => item.featured).forEach(item => {
        allHighlights.push({
            type: 'Estudo Bíblico',
            title: item.title,
            date: item.date,
            thumbnail: item.thumbnail,
            url: item.url,
            description: item.body ? item.body.substring(0, 150) + '...' : '' // Pega um pedaço do corpo
        });
    });

    artigos.filter(item => item.featured).forEach(item => {
        allHighlights.push({
            type: 'Artigo',
            title: item.title,
            date: item.date,
            thumbnail: item.thumbnail,
            url: item.url,
            description: item.body ? item.body.substring(0, 150) + '...' : ''
        });
    });

    videos.filter(item => item.featured).forEach(item => {
        allHighlights.push({
            type: 'Vídeo',
            title: item.title,
            date: item.date,
            thumbnail: item.custom_thumbnail || `https://img.youtube.com/vi/${item.youtube_id}/mqdefault.jpg`, // Tenta thumbnail personalizada ou do YouTube
            url: item.url,
            description: item.description ? item.description.substring(0, 150) + '...' : ''
        });
    });

    eventos.filter(item => item.featured).forEach(item => {
        allHighlights.push({
            type: 'Evento',
            title: item.title,
            date: item.datetime, // Eventos usam 'datetime'
            thumbnail: item.image,
            url: item.url,
            description: item.body ? item.body.substring(0, 150) + '...' : ''
        });
    });

    // Ordena os destaques por data (mais recente primeiro)
    allHighlights.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Exibe apenas os 6 destaques mais recentes (ou quantos você quiser)
    const displayHighlights = allHighlights.slice(0, 6);

    if (displayHighlights.length === 0) {
        highlightsContainer.innerHTML = '<p>Nenhum destaque disponível no momento.</p>';
        return;
    }

    highlightsContainer.innerHTML = ''; // Limpa a mensagem de carregamento

    displayHighlights.forEach(highlight => {
        const itemHtml = `
            <div class="highlight-item">
                <img src="${highlight.thumbnail || 'https://via.placeholder.com/400x200?text=Sem+Imagem'}" alt="${highlight.title}">
                <div class="highlight-item-content">
                    <h4>${highlight.title}</h4>
                    <p class="item-meta">${highlight.type} | ${formatDate(highlight.date)}</p>
                    <p>${highlight.description}</p>
                    <a href="${highlight.url}" class="btn">Ver Mais</a>
                </div>
            </div>
        `;
        highlightsContainer.insertAdjacentHTML('beforeend', itemHtml);
    });
}

// Chama a função de renderização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', renderFeaturedHighlights);

// Exporta as funções caso queira usá-las em outras páginas (ex: para renderizar listas completas)
// public/js/contentLoader.js
document.addEventListener('DOMContentLoaded', renderFeaturedHighlights);
// **Adicione 'export' aqui:**
export async function fetchData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} at ${filePath}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}

// **Adicione 'export' aqui:**
export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// ... (o resto do seu código existing para renderFeaturedHighlights) ...

// **Remova o comentário e/ou restaure esta linha:**
// document.addEventListener('DOMContentLoaded', renderFeaturedHighlights);
// Se você está usando import/export, o script precisa ser do tipo 'module'
// e renderFeaturedHighlights deve ser chamada de outra forma ou exportada.
// Para manter simples, vamos chamar no DOMContentLoaded se não for um módulo exportado
// OU se você não estiver importando ele em outro lugar.
// Se ele for importado, a chamada deve ser feita por quem o importa.

// Para a sua página inicial, vamos manter a chamada direta
document.addEventListener('DOMContentLoaded', renderFeaturedHighlights);

// Opcional: Se você *realmente* quiser exportar renderFeaturedHighlights, adicione 'export' aqui também
// export { fetchData, formatDate, renderFeaturedHighlights };
// Mas para o seu caso atual, apenas fetchData e formatDate são importadas.