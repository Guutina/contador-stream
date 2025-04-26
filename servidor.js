const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const FILE_PATH = 'timer.json';
const BASE_HOURS = 4;

function loadTimer() {
    if (fs.existsSync(FILE_PATH)) {
        const data = fs.readFileSync(FILE_PATH);
        return JSON.parse(data);
    } else {
        const now = Date.now();
        const baseEndTime = now + BASE_HOURS * 60 * 60 * 1000;
        const timer = { endTime: baseEndTime };
        fs.writeFileSync(FILE_PATH, JSON.stringify(timer));
        return timer;
    }
}

function saveTimer(timer) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(timer));
}

app.get('/get', (req, res) => {
    const timer = loadTimer();
    res.json(timer);
});

app.post('/add', (req, res) => {
    const { type, amount } = req.body;
    const timer = loadTimer();
    let minutesToAdd = 0;

    if (type === 'bits') {
        minutesToAdd = (amount / 100) * 20; // 100 bits = 20 minutos
    } else if (type === 'sub') {
        minutesToAdd = 40;
    } else if (type === 'raid') {
        minutesToAdd = 15;
    } else if (type === 'follow') {
        minutesToAdd = 5;
    }

    timer.endTime += minutesToAdd * 60 * 1000;
    saveTimer(timer);

    res.json({ success: true, newEndTime: timer.endTime });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
