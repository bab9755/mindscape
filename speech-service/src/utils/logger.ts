import { createLogger, format, transports } from 'winston';
import path from 'path';

const enumerateErrorFormat = format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const addFileOrigin = format((info) => {
    const stack = new Error().stack?.split('\n');
    if (stack && stack.length > 3) {
        const match = stack[3].match(/\(([^)]+)\)/);
        if (match) {
            info.origin = path.basename(match[1]);
        }
    }
    return info;
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
        enumerateErrorFormat(),
        addFileOrigin(),
        format.timestamp(),
        format.printf(({ timestamp, level, message, origin }) => {
            return `${timestamp} [${level.toUpperCase()}]${origin ? ` [${origin}]` : ''}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
    ],
});

export default logger;