module.exports = {
    mongo: {
        //development environment connection string
        dev: {
            conn: process.env.DEV_CONN_STRING//'mongodb://localhost/express_dev'
        },
        //production environment connection string
        prod: {
            conn: process.env.PROD_CONN_STRING//'mongodb://localhost/express_prod'
        },
        options:{
            server: {
                socketOptions: { keepAlive: 1 }
            }
        }
    }
};