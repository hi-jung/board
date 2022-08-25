// npm
import Router from 'koa-router';


const HealthCheckRouter = new Router();

/**
 * health check하기 위함
 */
HealthCheckRouter.get('/', (ctx) => {
    ctx.status = 200;
    ctx.body = "I'm Alive"
    return;
});

export { HealthCheckRouter };