"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/clases', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield pool.query('SELECT * FROM clases ORDER BY id ASC');
        res.json(resultado.rows);
    }
    catch (error) {
        console.error('Error al obtener clases:', error);
        res.status(500).json({ error: 'Error del servidor al leer la base de datos' });
    }
}));
app.post('/api/clases', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, horario, cupo } = req.body;
        const resultado = yield pool.query('INSERT INTO clases (nombre, horario, cupo) VALUES ($1, $2, $3) RETURNING *', [nombre, horario, cupo]);
        res.status(201).json(resultado.rows[0]);
    }
    catch (error) {
        console.error('Error al insertar clase:', error);
        res.status(500).json({ error: 'Error del servidor al insertar en la base de datos' });
    }
}));
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
