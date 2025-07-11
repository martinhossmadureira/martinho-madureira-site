// public/js/contentLoader.js

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

export function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

async function renderFeaturedHighlights() {
    const featuredHighlightsContainer = document.getElementById('featured-highlights');
    if (!featuredHighlightsContainer) {
        return;
    }

    featuredHighlightsContainer.innerHTML = '<h2>Carregando destaques...</h2>';

    const collections = [
        { type: 'estudos', title: 'Estudos Bíblicos' },
        { type: 'artigos', title: 'Artigos' },
        { type: 'videos', title: 'Vídeos' },
        { type: 'eventos', title: 'Eventos' } // Adicionei eventos aqui
    ];

    let allFeaturedItems = [];

    for (const collection of collections) {
        try {
            const data = await fetchData(`data/${collection.type}.json`);
            const featured = data.filter(item => item.featured); // Filtra por 'featured: true'
            const itemsWithType = featured.map(item => ({ ...item, collectionType: collection.type }));
            allFeaturedItems = allFeaturedItems.concat(itemsWithType);
        } catch (error) {
            console.error(`Falha ao carregar destaques de ${collection.title}:`, error);
        }
    }

    allFeaturedItems.sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
    });

    const itemsToDisplay = allFeaturedItems.slice(0, 6); // Exibe 6 destaques. Ajuste este número conforme desejar.

    if (itemsToDisplay.length === 0) {
        featuredHighlightsContainer.innerHTML = '<p class="no-content-message">Nenhum destaque encontrado no momento. Volte em breve para novidades!</p>';
        return;
    }

    let highlightsHtml = '<h2 class="section-title">Destaques Recentes</h2><div class="highlights-grid">';

    itemsToDisplay.forEach(item => {
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

    highlightsHtml += '</div>';
    featuredHighlightsContainer.innerHTML = highlightsHtml;
}

document.addEventListener('DOMContentLoaded', renderFeaturedHighlights);