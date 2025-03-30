import { readFileSync, writeFileSync } from 'fs';
import { faker } from '@faker-js/faker';

let log = readFileSync('./logs/localStringDate.log', 'utf-8');

const randomLog = `${faker.date.past()} - ${faker.lorem.sentence()}\n`;

log += randomLog;

writeFileSync('./logs/localStringDate.log', log);

console.log('Log updated successfully!');
