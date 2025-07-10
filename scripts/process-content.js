// scripts/process-content.js
const fs = require('fs-extra');
const fm = require('front-matter');
const path = require('path');

const contentDir = 'content'; // Pasta onde seus arquivos Markdown estão
const outputDir = 'public/data'; // Pasta onde os JSONs serão salvos

// Garante que a pasta de saída exista
fs.ensureDirSync(outputDir);

// Limpa a pasta de saída para evitar arquivos antigos
fs.emptyDirSync(outputDir);

console.log('Iniciando processamento de conteúdo...');

async function processCollection(collectionName) {
    const collectionPath = path.join(contentDir, collectionName);
    const outputPath = path.join(outputDir, `${collectionName}.json`);
    const items = [];

    if (!fs.existsSync(collectionPath)) {
        console.warn(`Pasta da coleção não encontrada: ${collectionPath}. Pulando.`);
        return;
    }

    const files = fs.readdirSync(collectionPath).filter(file => file.endsWith('.md'));

    for (const file of files) {
        const filePath = path.join(collectionPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { attributes, body } = fm(content);

        // Gera um slug amigável para URLs
        const slug = path.basename(file, '.md'); // O nome do arquivo sem extensão
        
        // Adiciona um campo 'url' para facilitar a navegação no frontend
        let url = `detalhe.html?tipo=${collectionName}&slug=${slug}`;
        if (collectionName === 'videos') {
            url = `videos.html#${slug}`; // Para vídeos, pode ser um #hash na página de vídeos
        }

        items.push({
            slug,
            url,
            ...attributes,
            body // O conteúdo Markdown completo
        });
    }

    // Opcional: Ordenar itens por data (mais recente primeiro)
    items.sort((a, b) => new Date(b.date || b.datetime) - new Date(a.date || a.datetime));

    await fs.writeJson(outputPath, items, { spaces: 2 });
    console.log(`Coleção '${collectionName}' processada e salva em ${outputPath}`);
}

async function processFixedPage(pagePath, outputFileName) {
    const fullPath = path.join(contentDir, pagePath);
    const outputPath = path.join(outputDir, `${outputFileName}.json`);

    if (!fs.existsSync(fullPath)) {
        console.warn(`Página fixa não encontrada: ${fullPath}. Pulando.`);
        return;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const { attributes, body } = fm(content);

    await fs.writeJson(outputPath, { ...attributes, body }, { spaces: 2 });
    console.log(`Página fixa '${outputFileName}' processada e salva em ${outputPath}`);
}

async function main() {
    await processCollection('estudos');
    await processCollection('artigos');
    await processCollection('videos');
    await processCollection('eventos');

    await processFixedPage('pages/sobre-mim.md', 'sobre-mim');
    await processFixedPage('pages/doacoes.md', 'doacoes');

    console.log('Processamento de conteúdo concluído.');
}

main().catch(console.error);