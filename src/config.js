const env = "development";

const Config = {
  env,
  appName: "Onisep Data",
  androidPackageName: "onisepdata.google",
  baseUrl: "https://api.nc-elki.v6.army/api/v1",
};

switch (env) {
  case "preview":
    Config.appName = "Onisep Data Preview";
    break;
  case "development":
    Config.baseUrl = "http://10.0.2.2:5005/api/v1";
    break;
  default:
    break;
}

export { Config };
