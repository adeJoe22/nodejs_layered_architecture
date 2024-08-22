import pino from "pino";
import PinoHttp from "pino-http";

export const logger = pino({
  level: "info",
  base: {
    serviceName: "users",
  },
  serializers: pino.stdSerializers,
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  transport: {
    target: "pino-pretty",
    level: "error",
  },
});

export const httpLogger = PinoHttp({
  level: "error",
  logger,
});
