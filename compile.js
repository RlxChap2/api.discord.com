import { existsSync, readFileSync } from 'fs';
import axios from 'axios';
import { stringify } from 'querystring';

const args = process.argv.slice(2);
const fileFlagIndex = args.indexOf('-file');

if (fileFlagIndex === -1 || !args[fileFlagIndex + 1]) {
    console.error('❌ Usage: node compile.js -file path/to/file.js');
    process.exit(1);
}

const filePath = args[fileFlagIndex + 1];

if (!existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
}

const code = readFileSync(filePath, 'utf8');

const postData = stringify({
    input: code,
});

axios.post('https://www.toptal.com/developers/javascript-minifier/api/raw', postData, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
    },
    responseType: 'text',
})
.then((response) => {
    console.log(response.data);
})
.catch((error) => {
    if (error.response) {
        console.error(`❌ Error: Status ${error.response.status}`);
        console.error(error.response.data);
    } else {
        console.error('❌ Request failed:', error.message);
    }
});
