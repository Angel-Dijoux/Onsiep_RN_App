export const ONISEP_ID = "";
export const ONSIEP_APP_ID = "62b45c76357466d0668b4567";
export const ONISEP_PS = "";

const env = process.config.APP_ENV;

const Config = {
  env,
  onisepAppId: ONSIEP_APP_ID,
  onisepId: ONISEP_ID,
  onisepPs: ONISEP_PS,
  baseUrl: "https://api.nc-elki.v6.army/api/v1",
};

switch (env) {
  case "development":
    Config.baseUrl = "http://10.0.2.2:5005/api/v1";
    break;
  default:
    break;
}

export { Config };
