const env = "development";

const Config = {
  env,
  appName: "Onisep Explorer",
  baseUrl: "https://api.nc-elki.v6.army/api/v1",
};

switch (env) {
  case "preview":
    Config.appName = "Onisep Explorer Preview";
    break;
  case "development":
    Config.baseUrl = "https://api.nc-elki.v6.army/api/v1";
    break;
  default:
    break;
}

export { Config };
