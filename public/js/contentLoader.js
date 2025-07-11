// public/js/contentLoader.js

// Função para buscar dados de um arquivo JSON
export async function fetchData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} at ${filePath}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return []; // Retorna um array vazio em caso de erro para evitar quebrar o restante do código
    }
}

// Função para formatar a data
export function formatDate(dateString) {
    if (!dateString) return ''; // Retorna vazio se a data não for fornecida
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Função para renderizar os destaques na página inicial
async function renderFeaturedHighlights() {
    const featuredHighlightsContainer = document.getElementById('featured-highlights');
    if (!featuredHighlightsContainer) {
        // console.warn("Elemento #featured-highlights não encontrado. Verifique o HTML da página inicial.");
        return; // Não faz nada se o container não existe
    }

    featuredHighlightsContainer.innerHTML = '<h2>Carregando destaques...</h2>'; // Mensagem de carregamento

    const collections = [
        { type: 'estudos', title: 'Estudos Bíblicos' },
        { type: 'artigos', title: 'Artigos' },
        { type: 'videos', title: 'Vídeos' },
        { type: 'eventos', title: 'Eventos' } // Adicione esta linha para eventos
    ];

    let allFeaturedItems = [];

    // Busca dados de todas as coleções
    for (const collection of collections) {
        try {
            const data = await fetchData(`data/${collection.type}.json`);
           // Filtra por 'featured: true'. Se 'published' não existe ou é true, ele passa.
            const featured = data.filter(item => item.featured); // Simplificado para focar apenas em 'featured'
            // Adiciona o tipo de coleção a cada item para saber de onde ele veio
            const itemsWithType = featured.map(item => ({ ...item, collectionType: collection.type }));
            allFeaturedItems = allFeaturedItems.concat(itemsWithType);
        } catch (error) {
            console.error(`Falha ao carregar destaques de ${collection.title}:`, error);
        }
    }

    // Ordena os itens destacados pela data mais recente (se a data existir)
    allFeaturedItems.sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0); // Usa epoch se data for nula
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
    });

    // Pega apenas os 3 primeiros ou quantos você deseja exibir
    const itemsToDisplay = allFeaturedItems.slice(0, 3); // Exibe os 3 mais recentes

    if (itemsToDisplay.length === 0) {
        featuredHighlightsContainer.innerHTML = '<p class="no-content-message">Nenhum destaque encontrado no momento. Volte em breve para novidades!</p>';
        return;
    }

    let highlightsHtml = '<h2 class="section-title">Destaques Recentes</h2><div class="highlights-grid">';

    itemsToDisplay.forEach(item => {
        // Gera o URL para a página de detalhes, passando o tipo da coleção e o slug
        const detailUrl = `detalhe.html?tipo=${item.collectionType}&slug=${item.slug}`;

        highlightsHtml += `
            <div class="highlight-item">
                <a href="${detailUrl}" class="highlight-link">
                    ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.title}" class="highlight-thumbnail">` : ''}
                    <div class="highlight-content">
                        <h3 class="highlight-title">${item.title}</h3>
                        <p class="highlight-date">${item.date ? formatDate(item.date) : 'Data não disponível'}</p>
                        <p class="highlight-description">${item.description || 'Clique para ler mais...'}</p>
                        <span class="read-more">Leia Mais &rarr;</span>
                    </div>
                </a>
            </div>
        `;
    });

    highlightsHtml += '</div>'; // Fecha highlights-grid
    featuredHighlightsContainer.innerHTML = highlightsHtml;
}

// CHAME A FUNÇÃO DE RENDERIZAÇÃO QUANDO O DOM ESTIVER PRONTO
// Esta linha é para a página inicial onde os destaques são renderizados.
document.addEventListener('DOMContentLoaded', renderFeaturedHighlights);