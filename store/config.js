import fs from 'fs';

export const config = {
    port: 8080,
    mongoDbUri: 'mongodb://localhost/flutter-backend',
    mongoHostName: 'localhost',
    privateKey: fs.readFileSync('./store/private.key'),
    publicKey: fs.readFileSync('./store/public.key'),
};