import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.get('/api/clases', async (req: Request, res: Response) => {
    try {
        const respuesta = await pool.query('SELECT * FROM clases');
        res.json(respuesta.rows);
    } catch (error) {
        console.error('Error en la base de datos:', error);
        res.status(500).json({ error: 'Error al conectar con la base de datos' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});