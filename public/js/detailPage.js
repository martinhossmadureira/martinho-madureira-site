// public/js/detailPage.js
import { fetchData, formatDate } from './contentLoader.js'; // Importa funções de contentLoader

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('tipo'); // Ex: 'estudos' ou 'artigos'
    const slug = urlParams.get('slug'); // O slug do item

    const detailContentContainer = document.getElementById('detail-content');
    const pageTitleElement = document.getElementById('page-title');

    if (!type || !slug) {
        detailContentContainer.innerHTML = '<p>Conteúdo não encontrado. Verifique o link.</p>';
        if (pageTitleElement) pageTitleElement.textContent = 'Erro | Martinho S. S. Madureira';
        console.error('Tipo ou slug ausente na URL.');
        return;
    }

    let collectionData = [];
    try {
        collectionData = await fetchData(`data/${type}.json`);
    } catch (error) {
        console.error(`Erro ao carregar dados da coleção ${type}:`, error);
        detailContentContainer.innerHTML = `<p>Erro ao carregar a coleção de ${type}.</p>`;
        if (pageTitleElement) pageTitleElement.textContent = 'Erro | Martinho S. S. Madureira';
        return;
    }

    const item = collectionData.find(d => d.slug === slug);

    if (!item) {
        detailContentContainer.innerHTML = '<p>Item não encontrado nesta coleção.</p>';
        if (pageTitleElement) pageTitleElement.textContent = 'Conteúdo Não Encontrado | Martinho S. S. Madureira';
        console.warn(`Item com slug '${slug}' não encontrado na coleção '${type}'.`);
        return;
    }

    // Converte o corpo do Markdown para HTML
    const contentHtml = marked(item.body || ''); // Usa marked.js para converter Markdown

    let detailHtml = `
        <article>
            <h2 class="detail-title">${item.title}</h2>
            <p class="detail-meta">
                <span class="detail-type">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
                ${item.date ? `| <time datetime="${item.date}">${formatDate(item.date)}</time>` : ''}
                ${item.author ? `| Por ${item.author}` : ''}
            </p>
            ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.title}" class="detail-thumbnail">` : ''}
            <div class="detail-body">
                ${contentHtml}
            </div>
        </article>
    `;

    detailContentContainer.innerHTML = detailHtml;
    if (pageTitleElement) pageTitleElement.textContent = `${item.title} | Martinho S. S. Madureira`;

    // Opcional: Adicionar estilos básicos para imagens dentro do conteúdo
    const imagesInContent = detailContentContainer.querySelectorAll('.detail-body img');
    imagesInContent.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.margin = '20px auto';
        img.style.borderRadius = '8px';
        img.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    });
});