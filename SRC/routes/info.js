import express from "express";
const router = express.Router();
import compression from "compression";
router.use(compression());
import log from "../models/log";

const info = {
    port: process.env.PORT,
    argumentosDeEntrada: process.argv.slice(2),
    directorioActual: process.cwd(),
    versionNode: process.version,
    plataforma: process.platform,
    memoria: process.memoryUsage(),
    carpetaDeEjecucion: process.cwd(),
    PID: process.pid,
    memoriaTotal: process.memoryUsage().heapTotal,
    pathEjecucion: process.execPath,
    numberProcesadores: require("os").cpus().length,
}

router.get('/', (req, res) => {
    log.info(`${req.method}${req.url} Se ha solicitado la información del servidor`);
    res.render('info', { title: "Info", info });
});

router.get('/gzip', compression(), (req, res) => {
    log.info(`${req.method}${req.url} Se ha solicitado la información del servidor`);
    res.render('info', { title: "Info", info });
});

export default router;