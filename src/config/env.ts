import "dotenv/config";

if (!process.env.DB_URI) {
  throw new Error("Missing required environment variable: DB_URI");
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
  PORT: Number(process.env.PORT ?? 3000),
  DB_URI: process.env.DB_URI,
};
