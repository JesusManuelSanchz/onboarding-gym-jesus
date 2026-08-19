import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT: number = 3000;


const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});


app.use(cors());


app.use(express.json());




app.get('/api/clases', async (req: Request, res: Response) => {
    try {
        const resultado = await pool.query('SELECT * FROM clases ORDER BY id ASC');
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener clases:', error);
        res.status(500).json({ error: 'Error del servidor al leer la base de datos' });
    }
});


app.post('/api/clases', async (req: Request, res: Response) => {
    try {
        const { nombre, horario, cupo } = req.body;
        const resultado = await pool.query(
            'INSERT INTO clases (nombre, horario, cupo) VALUES ($1, $2, $3) RETURNING *',
            [nombre, horario, cupo]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al insertar clase:', error);
        res.status(500).json({ error: 'Error del servidor al insertar en la base de datos' });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});