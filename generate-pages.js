import fs from 'fs';
import path from 'path';

const snippetsDir = path.resolve('docs/snippets');
const examplesDir = path.resolve('docs/examples');

if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir, { recursive: true });
}

if (fs.existsSync(snippetsDir)) {
    const files = fs.readdirSync(snippetsDir).filter((file) => file.endsWith('.js'));

    files.forEach((file) => {
        const name = file.replace('.js', '');

        const title = name.charAt(0).toUpperCase() + name.slice(1);

        const mdFilePath = path.join(examplesDir, `${name}.md`);

        const mdContent = `# ${title} Code Snippet

This is a **${name}** code snippet.

<<< ../snippets/${file}
`;

        fs.writeFileSync(mdFilePath, mdContent, 'utf8');
        console.log(`✅ Auto-generated: docs/examples/${name}.md`);
    });
} else {
    console.log('⚠️ Directory docs/snippets/ not found!');
}
