const definedEnvs = Object.keys(process.env);
const getEnv = (envName, required = true) => {
  if (required && !definedEnvs.includes(envName)) throw new Error(`${envName} missing`);
  return process.env[envName];
};

const appConfig = {
  JWT_SECRET_KEY: getEnv('JWT_SECRET_KEY', false),
  MONGOURL: getEnv('MONGOURL', false),
  PORT: getEnv('PORT', false) || 3000,
};

module.exports = appConfig;
