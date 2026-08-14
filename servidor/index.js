"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.get('/api/clases', (req, res) => {
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
