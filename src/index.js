const app = require('./app');
const config = require('./config');
//const poolDB = require('./database');
//starting the serve
async function main(){
    await app.listen(config.port, () => {
        console.log('server on port ',app.get('port'));
    })
};

main();

