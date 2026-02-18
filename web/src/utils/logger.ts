type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
    private static instance: Logger;
    private isDev: boolean;

    private constructor() {
        this.isDev = process.env.NODE_ENV === 'development';
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    private formatMessage(level: LogLevel, message: string, data?: any): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    }

    public info(message: string, data?: any) {
        if (this.isDev) {
            console.info(this.formatMessage('info', message), data || '');
        }
        // TODO: Send to analytics/monitoring service
    }

    public warn(message: string, data?: any) {
        console.warn(this.formatMessage('warn', message), data || '');
        // TODO: Send to analytics/monitoring service
    }

    public error(message: string, error?: any) {
        console.error(this.formatMessage('error', message), error || '');
        // TODO: Send to Sentry or similar
    }

    public debug(message: string, data?: any) {
        if (this.isDev) {
            console.debug(this.formatMessage('debug', message), data || '');
        }
    }
}

export const logger = Logger.getInstance();
