export const configVar = () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT) || 3000,
  NODE_NAME: process.env.NODE_NAME,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  REDIS_CONNECTION_STRING: process.env.REDIS_CONNECTION_STRING,
  GITHUB_APP_URL: process.env.GITHUB_APP_URL,
  GITHUB_APP_ID: process.env.GITHUB_APP_ID,
});
