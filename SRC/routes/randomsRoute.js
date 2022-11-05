import express from 'express';
const router = express.Router();
import { fork } from 'child_process';

const child = fork('./SRC/models/randoms.js');

router.get('/', async (req, res) => {
    const rounds = req.query.cant || 100000000
    child.send(rounds)
    child.on('message', (msg) => {
        res.end(msg)
    })
})

module.exports = router;