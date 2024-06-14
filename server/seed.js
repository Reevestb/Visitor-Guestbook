import { db } from "./server.js";

db.query(`CREATE TABLE IF NOT EXISTS Visitor_Sign_In (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    Location VARCHAR(255),
    Date_Visiting DATE,
    Messages TEXT
)`);

db.query(`INSERT INTO Visitor_Sign_In (Name, Location, Date_Visiting)
    VALUES ('Joe Minaj', 'Norwich','2024-06-14')`);
