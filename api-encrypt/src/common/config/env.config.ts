export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'local',
  port: +process.env.PORT || 3000,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: +process.env.DB_PORT,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
});
