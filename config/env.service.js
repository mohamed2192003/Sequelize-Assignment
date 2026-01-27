import dotenv from 'dotenv';
dotenv.config({path: './config/.env'});
let databaseName = process.env.DATABASE_NAME;
let databaseUser = process.env.DATABASE_USER;
let databasePassword = process.env.DATABASE_PASSWORD;
export { databaseName, databaseUser, databasePassword };