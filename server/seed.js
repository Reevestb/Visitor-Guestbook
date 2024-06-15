import { db } from "./server.js";

db.query(`CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255),
    date VARCHAR(10),
    message TEXT
)`);
db.query(`INSERT INTO visitors (name, location, date, message)
    VALUES ('Joe', 'Minaj', '01-02-2024', 'Best thing ive been to')
    `);
