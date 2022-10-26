import express from "express";
const router = express.Router();

const info = {
    process: process.env.NODE_ENV,
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
}

router.get('/', (req, res) => {
    res.render('info', { title: "Info", info });
});

export default router;