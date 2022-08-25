
// npm
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

// router
import { HealthCheckRouter } from './router/healthcheck.router';
import { BoardRouter } from './router/board.router';

// config
import Config from '../config/config.json';

// logger
import * as log  from './utils/logger.util';
log.initialize(Config);


const app = new Koa();
const router = new Router();
const port: number = Config.serverPort;


// koa bodyParser setting
app.use(bodyParser());


// koa router setting
app.use(router.routes());
router.use('/', HealthCheckRouter.routes())
router.use('/api', BoardRouter.routes());

const server = app.listen(port, () => {
    log.logger.info(`


    ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗     ███████╗████████╗ █████╗ ██████╗ ████████╗
    ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
    ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝    ███████╗   ██║   ███████║██████╔╝   ██║   
    ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗    ╚════██║   ██║   ██╔══██║██╔══██╗   ██║   
    ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║    ███████║   ██║   ██║  ██║██║  ██║   ██║   
    ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
                                                                                                    

    `)
    log.logger.info(`listening on port ${port}`);
})






