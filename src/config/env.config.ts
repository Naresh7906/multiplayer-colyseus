export const envConfig = {
  ENV: process.env.ENV || "development",
  DATABASE_CONNECTION_STRING: process.env.DATABASE_CONNECTION_STRING,
  CALLBACK_URL: process.env.CALLBACK_URL,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  AUTH_URL: process.env.AUTH_URL,
  AUTH_TOKEN_URL: process.env.AUTH_TOKEN_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
};
