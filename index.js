import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import _ from 'lodash';

// Ensure ./apps directory exists
if (!existsSync('./apps')) {
    mkdirSync('./apps');
}

const req = await fetch('https://discord.com/api/v10/applications/detectable');

let current = [];

// Attempt to read the current applications from current.json
try {
    current = JSON.parse(readFileSync('./current.json', 'utf-8'));
} catch (e) {
    if (e.code !== 'ENOENT') throw e;
    // If current.json doesn't exist, initialize as an empty array
    current = [];
}

try {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        console.log('File deleted successfully.');
    }
} catch (error) {
    // Handle file deletion errors (if needed)
}

const json = await req.json();

// 1. Detect new applications
const newApps = json.filter((app) => !current.some((c) => c.id === app.id));

for (const app of newApps) {
    console.log(`Found new app: ${app.name} (${app.id})`);
    writeFileSync(`./apps/${app.id}.json`, JSON.stringify(app, null, 4));
    current.push(app); // Add new app to current list
}

// 2. Detect deleted applications (apps in current but not in json)
const deletedApps = current.filter((app) => !json.some((c) => c.id === app.id));
for (const app of deletedApps) {
    console.log(`Deleted app: ${app.name} (${app.id})`);
    // Remove deleted app from current list
    _.remove(current, (c) => c.id === app.id);
}

// 3. Check for updated applications (changes to existing apps)
let changes = 0;
for (let app of current) {
    const newApp = json.find((c) => c.id === app.id);
    if (newApp && !_.isEqual(app, newApp)) {
        console.log(`Updated app: ${app.name} (${app.id})`);
        writeFileSync(`./apps/${app.id}.json`, JSON.stringify(newApp, null, 4));
        // Update the current app object
        _.assign(app, newApp); // This ensures the app object is updated correctly
        changes++;
    }
}

// 4. Write the updated list of current apps to current.json
writeFileSync('./current.json', JSON.stringify(current, null, 4));

console.log(`Done! (${newApps.length} new apps, ${changes} changed apps, ${deletedApps.length} deleted apps)`);
