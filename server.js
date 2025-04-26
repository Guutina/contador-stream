const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let endTime = Date.now() + (4 * 60 * 60 * 1000); // 4 horas por defecto

// Evento de Follow (5 minutos)
app.post('/follow', (req, res) => {
  const additionalTime = 5 * 60 * 1000; // 5 minutos
  endTime += additionalTime;
  console.log(`Follow recibido. Se han añadido 5 minutos. Fin estimado: ${new Date(endTime)}`);
  res.send({ success: true, newEndTime: endTime });
});

// Evento de Sub (40 minutos)
app.post('/sub', (req, res) => {
  const additionalTime = 40 * 60 * 1000; // 40 minutos
  endTime += additionalTime;
  console.log(`Sub recibido. Se han añadido 40 minutos. Fin estimado: ${new Date(endTime)}`);
  res.send({ success: true, newEndTime: endTime });
});

// Evento de Raid (15 minutos)
app.post('/raid', (req, res) => {
  const additionalTime = 15 * 60 * 1000; // 15 minutos
  endTime += additionalTime;
  console.log(`Raid recibido. Se han añadido 15 minutos. Fin estimado: ${new Date(endTime)}`);
  res.send({ success: true, newEndTime: endTime });
});

// Evento de Donación (100 bits = 20 minutos)
app.post('/donation', (req, res) => {
  const additionalTime = 20 * 60 * 1000; // 20 minutos
  endTime += additionalTime;
  console.log(`Donación recibida. Se han añadido 20 minutos. Fin estimado: ${new Date(endTime)}`);
  res.send({ success: true, newEndTime: endTime });
});

// Obtener tiempo restante
app.get('/get', (req, res) => {
  res.json({ endTime: endTime });
});

app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port}`);
});
