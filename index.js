import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import _ from 'lodash';

// Ensure ./apps directory exists
if (!existsSync('./apps')) {
    mkdirSync('./apps');
}

const req = await fetch('https://discord.com/api/v10/applications/detectable');

let current;
try {
    current = JSON.parse(readFileSync('./current.json', 'utf-8'));
} catch (e) {
    if (e.code !== 'ENOENT') throw e;
    current = [];
}

const json = await req.json();
const newApps = json.filter((app) => !current.some((c) => c.id === app.id));

for (const app of newApps) {
    console.log(`Found new app: ${app.name} (${app.id})`);
    writeFileSync(`./apps/${app.id}.json`, JSON.stringify(app, null, 4));
    current.push(app);
}

let changes = 0;
// Check for deleted apps
const deletedApps = current.filter((app) => !json.some((c) => c.id === app.id));
for (const app of deletedApps) {
    console.log(`Deleted app: ${app.name} (${app.id})`);
}

// Check for changes in existing apps
for (let app of current) {
    const newApp = json.find((c) => c.id === app.id);
    if (!_.isEqual(app, newApp)) {
        console.log(`Updated app: ${app.name} (${app.id})`);
        writeFileSync(`./apps/${app.id}.json`, JSON.stringify(newApp, null, 4));
        app = newApp;
        changes++;
    }
}

writeFileSync('./current.json', JSON.stringify(json, null, 4));
console.log(`Done! (${newApps.length} new apps, ${changes} changed apps, ${deletedApps.length} deleted apps)`);
