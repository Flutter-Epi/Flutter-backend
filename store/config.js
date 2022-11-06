//import fs from 'fs';
const fs = require('fs');

const config = {
    port: process.env.PORT || 8080,
    mongoDbUri: process.env.MONGO_URL || 'mongodb://localhost/flutter-backend',
    privateKey: fs.readFileSync('./store/private.key'),
    publicKey: fs.readFileSync('./store/public.key'),
};
module.exports = { config };