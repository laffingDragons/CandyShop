let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    // uri: "mongodb://127.0.0.1:27017/candyShopApi"
    uri:"mongodb://<dbuser>:<dbpassword>@ds125472.mlab.com:25472/candy-shop"
}
appConfig.apiVersion = "/api/v1";

module.exports = {

    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    enviornment: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion,
    
}