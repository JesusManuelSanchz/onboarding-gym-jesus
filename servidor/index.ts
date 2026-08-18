import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT: number = 3000;

app.use(cors());

app.get('/api/clases', (req: Request, res: Response) => {
    const clases = [
        { id: 1, nombre: 'Crossfit', horario: '08:00 AM', instructor: 'Carlos' },
        { id: 2, nombre: 'Yoga', horario: '10:00 AM', instructor: 'María' },
        { id: 3, nombre: 'Boxeo', horario: '06:00 PM', instructor: 'Luis' }
    ];
    res.json(clases);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});