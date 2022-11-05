import express from "express";
const router = express.Router();

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
console.log(info)

router.get('/', (req, res) => {
    res.render('info', { title: "Info", info });
});

export default router;