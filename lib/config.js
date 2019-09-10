const appPortRaw = process.env.PORT;
const appPortParsed = parseInt(appPortRaw, 10);
// eslint-disable-next-line eqeqeq
const appPort = (appPortRaw == appPortParsed) ? appPortParsed : 3000;

const baseUrl = process.env.BASE_URL || `http://localhost:${appPort}`;
const apiUrl = process.env.API_URL || `https://api.hiddenpreprints.org`;

const useFakeData = (process.env.FAKE_DATA === 'true');

const config = {
  baseUrl,
  apiUrl,
  appPort,
  useFakeData,
};

module.exports = config;
