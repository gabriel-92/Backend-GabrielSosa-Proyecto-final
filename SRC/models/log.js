import pino from 'pino';

const streams = [
    { level: 'debug', stream: (pino.destination('./SRC/logs/debug.log')) },
    { level: 'error', stream: (pino.destination('./SRC/logs/error.log')) },
    { level: 'info', stream: (pino.destination('./SRC/logs/info.log')) },
    { level: 'trace', stream: (pino.destination('./SRC/logs/trace.log')) },
    { level: 'warn', stream: (pino.destination('./SRC/logs/warn.log')) }
]
const log = pino({
    level: 'info',
    base: null,
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    messageKey: 'message',
    formatters: {
        level: (label, number) => {
            return { level: label }
        }
    },
    customLevels: {
        debug: 10,
        error: 50,
        info: 30,
        trace: 0,
        warn: 40
    }
}, pino.multistream(streams))


export default log;