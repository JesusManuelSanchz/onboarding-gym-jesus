import express, { Request, Response } from 'express';

const app = express();
const PORT: number = 3000;


app.get('/', (req: Request, res: Response) => {
    res.send('Hola desde gimnasio');
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});