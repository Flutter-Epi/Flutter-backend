import fs from 'fs';

export const config = {
    port: process.env.PORT || 8080,
    mongoDbUri: process.env.MONGO_URL || 'mongodb://localhost/flutter-backend',
    privateKey: fs.readFileSync('./store/private.key'),
    publicKey: fs.readFileSync('./store/public.key'),
};