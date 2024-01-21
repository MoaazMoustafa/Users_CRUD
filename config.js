const definedEnvs = Object.keys(process.env);
const getEnv = (envName, required = true) => {
  if (required && !definedEnvs.includes(envName)) throw new Error(`${envName} missing`);
  return process.env[envName];
};

const appConfig = {
  API_KEY: getEnv('API_KEY'),
  JWT_SECRET_KEY: getEnv('JWT_SECRET_KEY'),
  newsBaseURL: 'https://newsapi.org/v2'
}

module.exports = appConfig;