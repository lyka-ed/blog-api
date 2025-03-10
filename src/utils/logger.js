import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    // label({ label: 'HTTP' }),
    errors({ stack: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    json(),
    logFormat
  ),
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/errors.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      level: "info",
    }),
  ],
});
