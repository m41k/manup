const express = require('express');
const db = require('./db');
const { exec } = require('child_process');
const router = express.Router();

// Endpoint para listar atualizações pendentes
router.get('/updates', (req, res) => {
    db.all("SELECT * FROM updates WHERE status = 'pending'", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Endpoint para instalar atualizações
router.post('/updates/install', (req, res) => {
    const updates = req.body.updates;
    const updateList = updates.join(' ');
    exec(`sudo apt install -y ${updateList}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr });
        }
        res.json({ message: 'Atualizações instaladas com sucesso', details: stdout });
    });
});

// Endpoint para agendar ações
router.post('/schedule', (req, res) => {
    const { time, action } = req.body;
    db.run("INSERT INTO schedules (time, action) VALUES (?, ?)", [time, action], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Agendamento criado com sucesso', id: this.lastID });
    });
});

module.exports = router;
